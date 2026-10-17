import {test,expect} from '@playwright/test';
import fs from 'node:fs/promises';
import path from 'node:path';
import {pathToFileURL} from 'node:url';
import {unzipSync,strFromU8} from 'fflate';
const frame=p=>p.frameLocator('iframe');
const png=Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+jRZkAAAAASUVORK5CYII=','base64');

test('text editing, undo, redo, and local draft survive reload',async({page})=>{
 await page.goto('/');await expect(frame(page).locator('h1')).toContainText('IDEIAS');
 await page.getByLabel('Seu nome ou marca').fill('Ana Silva');await expect(frame(page).locator('.signature')).toHaveText('AnaSilva');
 await expect(page.locator('.save-indicator')).toHaveText('Salvo neste navegador');await page.reload();await expect(page.getByLabel('Seu nome ou marca')).toHaveValue('Ana Silva');
 await page.getByLabel('Sua área de atuação').fill('Design de produto');await page.getByRole('button',{name:'Desfazer',exact:false}).click();await expect(page.getByLabel('Sua área de atuação')).toHaveValue('Design, código e criação');await page.getByRole('button',{name:'Refazer',exact:false}).click();await expect(page.getByLabel('Sua área de atuação')).toHaveValue('Design de produto');
});

test('palette, typography, composition and viewport controls update the real preview',async({page})=>{
 await page.goto('/');await page.getByRole('button',{name:'Aparência',exact:false}).click();await page.getByRole('button',{name:'Paleta Papel'}).click();await page.getByLabel('Fonte dos títulos').selectOption('modern');
 await expect(frame(page).locator('body')).toHaveCSS('background-color','rgb(238, 235, 226)');await expect(frame(page).locator('h1')).toHaveCSS('font-family',/Manrope/);
 await page.getByRole('button',{name:'Centralizada',exact:true}).click();await expect(frame(page).locator('.projects')).toHaveClass(/layout-centered/);
 await page.getByRole('button',{name:'Celular',exact:true}).click();await expect(page.locator('iframe')).toHaveCSS('width','390px');await page.getByRole('button',{name:'Tablet',exact:true}).click();await expect(page.locator('iframe')).toHaveCSS('width','768px');
});

test('image upload, order, add and removal can be undone',async({page})=>{
 await page.goto('/');await page.getByRole('button',{name:'Projetos',exact:false}).first().click();await page.getByLabel('Imagem do projeto',{exact:true}).setInputFiles({name:'imagem.png',mimeType:'image/png',buffer:png});await expect(page.locator('.upload-area>img')).toHaveAttribute('src',/^data:image\/webp/);
 await page.getByLabel('Nome do projeto',{exact:true}).fill('Meu trabalho');await page.getByRole('button',{name:'Mover projeto para baixo'}).click();await expect(page.locator('.project-picker button').nth(1)).toContainText('Meu trabalho');
 await page.getByRole('button',{name:'Adicionar projeto',exact:false}).click();await expect(page.locator('.project-picker button')).toHaveCount(4);await page.getByRole('button',{name:'Remover projeto',exact:true}).click();await expect(page.locator('.project-picker button')).toHaveCount(3);await page.getByRole('button',{name:'Desfazer',exact:false}).click();await expect(page.locator('.project-picker button')).toHaveCount(4);
});

test('JSON project roundtrip includes images and rejects incompatible files',async({page},info)=>{
 await page.goto('/');await page.getByLabel('Seu nome ou marca').fill('Projeto salvo');const downloaded=page.waitForEvent('download');await page.getByRole('button',{name:'Salvar projeto',exact:true}).click();const file=await downloaded;const jsonPath=info.outputPath('projeto.json');await file.saveAs(jsonPath);
 await page.getByLabel('Seu nome ou marca').fill('Outro nome');await page.getByLabel('Arquivo de projeto').setInputFiles(jsonPath);await expect(page.getByLabel('Seu nome ou marca')).toHaveValue('Projeto salvo');
 await page.getByLabel('Arquivo de projeto').setInputFiles({name:'invalido.json',mimeType:'application/json',buffer:Buffer.from('{"version":999}')});await expect(page.getByRole('status').last()).toContainText('não é um projeto');await expect(page.getByLabel('Seu nome ou marca')).toHaveValue('Projeto salvo');
});

test('ZIP exports a standalone offline site with local fonts and working menu',async({page,browser},info)=>{
 await page.goto('/');await page.getByLabel('Seu nome ou marca').fill('Ana Silva');await page.getByLabel('E-mail público').fill('ana@example.com');await page.getByRole('button',{name:'Projetos',exact:false}).first().click();await page.getByLabel('Imagem do projeto',{exact:true}).setInputFiles({name:'foto.png',mimeType:'image/png',buffer:png});await expect(page.locator('.upload-area>img')).toHaveAttribute('src',/^data:image\/webp/);
 const event=page.waitForEvent('download');await page.getByRole('button',{name:'Baixar site',exact:false}).first().click();const file=await event,zipPath=info.outputPath('site.zip');await file.saveAs(zipPath);const files=unzipSync(new Uint8Array(await fs.readFile(zipPath)));
 expect(Object.keys(files)).toContain('images/projeto-1.webp');expect(JSON.parse(strFromU8(files['projeto.folio.json'])).projects[0].image).toMatch(/^data:image\/webp/);expect(Object.keys(files)).toContain('index.html');expect(Object.keys(files)).toContain('styles.css');expect(Object.keys(files)).toContain('script.js');expect(Object.keys(files).some(s=>s.endsWith('.woff2'))).toBe(true);expect(strFromU8(files['index.html'])).not.toContain('localhost');expect(strFromU8(files['projeto.folio.json'])).toContain('Ana Silva');
 const directory=info.outputPath('site');for(const [name,data] of Object.entries(files)){const target=path.join(directory,name);await fs.mkdir(path.dirname(target),{recursive:true});await fs.writeFile(target,data);}
 const context=await browser.newContext({offline:true,viewport:{width:1200,height:900}}),site=await context.newPage();const errors=[];site.on('pageerror',e=>errors.push(e.message));await site.goto(pathToFileURL(path.join(directory,'index.html')).href);await expect(site.locator('.signature')).toHaveText('AnaSilva');await expect(site.locator('.email')).toHaveAttribute('href','mailto:ana@example.com');await site.evaluate(()=>document.fonts.ready);expect(await site.evaluate(()=>document.fonts.check('24px Cormorant'))).toBe(true);
 await site.locator('.project-image').first().scrollIntoViewIfNeeded();await expect.poll(()=>site.locator('.project-image img').first().evaluate(i=>i.complete&&i.naturalWidth>0)).toBe(true);await site.getByRole('button',{name:'Abrir menu'}).click();await expect(site.locator('.menu')).toBeVisible();await site.locator('.menu').press('Escape');await expect(site.locator('.menu')).toBeHidden();expect(errors).toEqual([]);await context.close();
});

test('HTML is escaped, unsafe links are omitted and low contrast is flagged',async({page})=>{
 await page.goto('/');await page.getByLabel('Título de abertura').fill('<img src=x onerror=alert(1)>');await expect(frame(page).locator('h1')).toContainText('<img src=x onerror=alert(1)>');await expect(frame(page).locator('h1 img')).toHaveCount(0);
 await page.getByLabel('GitHub ou rede profissional').fill('javascript:alert(1)');await expect(page.locator('.field-error')).toContainText('https://');await expect(frame(page).locator('.social')).toHaveCount(0);
 await page.getByRole('button',{name:'Aparência',exact:false}).click();await page.getByLabel('Cor dos textos',{exact:true}).fill('#1d2321');await expect(page.locator('.field-error')).toContainText('Contraste baixo');
});

test('mobile editor/preview fit the screen and reset dialog supports Escape',async({page})=>{
 await page.setViewportSize({width:390,height:844});await page.goto('/');await expect(page.locator('.editor')).toBeVisible();await page.getByRole('button',{name:'Ver prévia',exact:true}).click();await expect(page.locator('iframe')).toBeVisible();expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);await page.getByRole('button',{name:'Editar',exact:true}).click();await page.getByRole('button',{name:'Exportar',exact:false}).first().click();await page.getByRole('button',{name:'Recomeçar com o modelo'}).click();await expect(page.getByRole('dialog')).toBeVisible();await page.getByRole('dialog').press('Escape');await expect(page.getByRole('dialog')).toHaveCount(0);await expect(page.getByRole('button',{name:'Recomeçar com o modelo'})).toBeFocused();
});
