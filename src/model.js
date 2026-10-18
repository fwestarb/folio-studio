export const examples=['still','orbit','type'];
export const fonts={editorial:'Cormorant',modern:'Manrope',classic:'Georgia'};
export const defaults={version:1,kind:'folio-studio',name:'Seu Nome',role:'Design, código e criação',hero:'IDEIAS\nEM FORMA\nprojetos e experiências',intro:'Um espaço para apresentar o que você faz. Conte sua história, selecione seus projetos e deixe sua personalidade aparecer.',aboutTitle:'Sobre mim',about:'Escreva uma apresentação sobre você, sua formação e o tipo de trabalho que desenvolve. Use exemplos reais e conte o que gosta de criar.',contactTitle:'Vamos criar\nalgo juntos?',email:'',social:'',services:'Sites e interfaces\nIdentidade visual\nProjetos criativos',showAbout:true,showServices:true,theme:{background:'#1d2321',text:'#e5e1d3',accent:'#b2c79b'},font:'editorial',body:'sans',layout:'asymmetric',radius:18,motion:true,projects:[{id:'p1',title:'Projeto editorial',category:'Identidade / Direção de arte',description:'Apresente o objetivo deste projeto e como você contribuiu para o resultado.',url:'',codeUrl:'',image:'',example:'still',alt:'Composição de exemplo com formas geométricas',fit:'cover'},{id:'p2',title:'Forma e movimento',category:'Interface / Desenvolvimento',description:'Conte a ideia por trás do projeto, as ferramentas utilizadas e o que foi criado.',url:'',codeUrl:'',image:'',example:'orbit',alt:'Composição de exemplo com formas orbitais',fit:'cover'},{id:'p3',title:'Estudo de tipos',category:'Design / Experimentação',description:'Compartilhe uma experiência pessoal ou um estudo que represente o seu trabalho.',url:'',codeUrl:'',image:'',example:'type',alt:'Composição de exemplo com tipografia',fit:'cover'}]};
export function safeUrl(value){try{const u=new URL(String(value));return ['https:','http:'].includes(u.protocol)?u.href:'';}catch{return '';}}
export function safeEmail(value){return /^[^\s@<>"']+@[^\s@<>"']+\.[^\s@<>"']+$/.test(value)?value:'';}
const text=(value,fallback='',max=2500)=>typeof value==='string'?value.slice(0,max):fallback;
const color=(value,fallback)=>/^#[\da-f]{6}$/i.test(value)?value:fallback;
export function normalize(input){
 if(!input||typeof input!=='object'||Array.isArray(input)||input.version!==1||(input.kind!==undefined&&input.kind!=='folio-studio'))throw new Error('Este arquivo não é um projeto Folio Studio compatível.');
 const d=defaults,c={...d};
 for(const key of ['name','role','hero','intro','aboutTitle','about','contactTitle','email','social','services'])c[key]=text(input[key],d[key]);
 c.name=c.name.slice(0,70);c.hero=c.hero.split('\n').slice(0,4).map(s=>s.slice(0,80)).join('\n');
 c.theme=Object.fromEntries(Object.keys(d.theme).map(k=>[k,color(input.theme?.[k],d.theme[k])]));
 c.font=Object.hasOwn(fonts,input.font)?input.font:d.font;c.body=input.body==='serif'?'serif':'sans';
 c.layout=input.layout==='centered'?'centered':'asymmetric';c.radius=Math.min(40,Math.max(0,Number(input.radius)||0));
 for(const k of ['motion','showAbout','showServices'])c[k]=typeof input[k]==='boolean'?input[k]:d[k];
 const items=Array.isArray(input.projects)?input.projects:d.projects;
 if(items.length>6)throw new Error('Um projeto pode ter até seis trabalhos.');
 c.projects=items.map((p,i)=>{if(!p||typeof p!=='object')throw new Error('Um dos trabalhos está inválido.');
  const image=typeof p.image==='string'&&/^data:image\/(png|jpeg|webp);base64,[A-Za-z0-9+/=]+$/.test(p.image)&&p.image.length<2200000?p.image:'';
  if(p.image&&!image)throw new Error('Uma imagem está inválida ou excede o limite do projeto.');
  return {id:`p${i+1}`,title:text(p.title,'Novo projeto',120),category:text(p.category,'',150),description:text(p.description,'',1500),url:text(p.url,'',500),codeUrl:text(p.codeUrl,'',500),image,example:examples.includes(p.example)?p.example:examples[i%3],alt:text(p.alt,'Imagem do projeto',300),fit:p.fit==='contain'?'contain':'cover'};
 });return c;
}
export function contrast(a,b){const luminance=h=>{const v=h.slice(1).match(/../g).map(s=>parseInt(s,16)/255).map(v=>v<=.04045?v/12.92:((v+.055)/1.055)**2.4);return v[0]*.2126+v[1]*.7152+v[2]*.0722;};const [x,y]=[luminance(a),luminance(b)].sort((x,y)=>y-x);return (x+.05)/(y+.05);}
