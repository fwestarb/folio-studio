# Folio Studio

Editor visual de um portfólio editorial inspirado no portfólio de Felipe Westarb. Personalize conteúdo, imagens, cores, fontes e composição; baixe um site estático independente.

## Usar

1. Edite nome, abertura, apresentação, Sobre, serviços e contato em **Conteúdo**.
2. Em **Projetos**, adicione até seis trabalhos, envie imagens JPG/PNG/WebP, ajuste o enquadramento, altere a ordem e inclua links.
3. Escolha paletas, cores livres, fontes, cantos e composição em **Aparência**.
4. Confira as prévias de computador, tablet e celular.
5. **Baixar site** gera um ZIP com HTML, CSS, JavaScript, imagens, fontes locais e instruções. Extraia tudo e abra index.html.
6. **Salvar projeto** guarda um JSON editável com imagens. Importe esse arquivo para continuar em outro navegador.

O rascunho é salvo no IndexedDB deste navegador. Limpar dados do navegador apaga o rascunho. Não há conta, assinatura, armazenamento remoto ou envio de imagens/textos para servidores. Os recursos do modelo são servidos pelo próprio site. A hospedagem do editor pode registrar acessos normais, mas o aplicativo não envia o conteúdo editado.

## Executar

```sh
npm ci
npm run dev -- --port 8820
npm test
npm run build
```

Node.js compatível com Vite 8; desenvolvimento verificado em Windows, Node 24 e Microsoft Edge. Os testes usam Edge no Windows; em outros ambientes use Chromium do Playwright ou PLAYWRIGHT_EXECUTABLE_PATH.

Build do editor: dist. Base relativa permite hospedagem estática em subdiretório. Este projeto é independente do portfólio anterior e não o modifica. A publicação pode ser feita em GitHub Pages com o conteúdo de dist.

## Estrutura

- src/App.jsx: editor e prévia em iframe isolado.
- src/model.js: valores padrão, limites e normalização de projetos importados.
- src/storage.js: rascunho em IndexedDB e otimização local de imagens.
- src/template.js, template.css, template-runtime.js: gerador e site exportado, sem framework em execução.
- src/export.js: ZIP com recursos locais e JSON editável.
- public/examples: ilustrações SVG de exemplo, criadas para o modelo.
- public/fonts: Cormorant Garamond e Manrope, com licenças OFL.

## Exportação

O ZIP inclui index.html, styles.css, script.js, imagens, fontes e licenças, projeto.folio.json e LEIA-ME.txt. Não requer Node.js, editor, API ou rede para visualizar. Links externos e e-mail naturalmente exigem seus respectivos aplicativos/serviços. Não há formulário ou servidor no site exportado.

Projetos importados têm versão, tamanho e campos validados. Textos viram conteúdo, não HTML executável; URLs javascript: são omitidas. Uploads aceitam JPG, PNG e WebP e são re-encodificados localmente, com limite de resolução. A prévia usa sandbox sem acesso à origem do editor. Links externos da prévia são bloqueados para não interromper a edição e funcionam no site exportado.

Limites: até seis projetos, imagens de entrada até 12 MB, saída até 1600 px e limite de dados por imagem; importação até 16 MB. Sem colaboração entre usuários, tradução automática, domínio próprio ou backend. Conteúdo padrão é ilustrativo; não representa clientes reais. O editor se chama Folio Studio.

## Licenças

Aplicativo e modelo: MIT. React/Vite: MIT. fflate: MIT. Cormorant Garamond e Manrope: SIL OFL. Fontes e respectivas licenças seguem no download. Fotografias que a pessoa enviar permanecem sob sua responsabilidade e seus direitos.

## English

A browser-based editorial portfolio builder. Edit content and projects, upload images, customize colors/type/layout, preview device widths and download an independent static website ZIP. Local IndexedDB drafts and portable JSON projects include images. No accounts or remote content storage. Exported HTML/CSS/JS works offline with bundled fonts and images. Up to six projects. Generated websites need no framework or build tool.

O site exportado respeita a preferência de movimento reduzido do sistema; o conteúdo permanece visível. As ilustrações SVG foram criadas especificamente para este modelo.


## GitHub Pages

- Editor: https://fwestarb.github.io/folio-studio/
- Repositório: https://github.com/fwestarb/folio-studio

Para atualizar a publicação: execute `npm ci`, `npm test` e `npm run pages:build`. O último comando gera `dist/` e atualiza somente a pasta `docs/` deste projeto. Revise, faça commit e envie a branch `main`. GitHub Pages usa `main /docs`. Não edite os arquivos compilados manualmente; altere `src/` e gere a publicação novamente.


## Download organizado para VS Code

O ZIP contém uma única pasta com o nome do site, incluindo HTML, CSS, JavaScript, imagens, fontes e o projeto editável. Extraia o ZIP e use **Arquivo > Abrir Pasta** no VS Code para abrir essa pasta, ou abra `abrir-no-vscode.code-workspace` dentro dela. Para visualizar, abra `index.html` no navegador. O catálogo do Marca Studio fica em `produtos.html`. Para publicar, envie o conteúdo da pasta interna.
