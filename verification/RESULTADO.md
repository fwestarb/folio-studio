# Verificação — Folio Studio

Projeto novo em C:\Projetos\folio-studio, sem alterações no portfólio anterior.

## Requisitos entregues

Editor com prévia ao vivo isolada, textos e imagens editáveis, até seis projetos com ordem/remoção, quatro paletas e três cores livres, duas famílias locais de fonte mais Georgia do sistema, composição assimétrica/central, enquadramento de imagens, raio e movimento. Sobre e serviços opcionais; contato por e-mail e link profissional.

Rascunho IndexedDB, desfazer/refazer, importação e download de JSON editável com imagens. ZIP contém site estático independente, recursos locais, fontes/OFL, imagens, instruções e JSON. Sem conta, assinatura, backend ou envio de conteúdo editado a serviços.

## Testes automatizados

Sete testes aprovados (11,2 s) em Microsoft Edge:

1. Edição, prévia, desfazer/refazer e recuperação do rascunho após reload.
2. Paleta, fonte, composição e dimensões da prévia.
3. Upload PNG convertido em WebP, reordenação, adição/remoção e desfazer.
4. JSON exportado/importado e rejeição de arquivo incompatível sem perder conteúdo.
5. ZIP real com imagem enviada e JSON com imagem; arquivos extraídos; index.html aberto em novo contexto offline via file://; fontes locais e imagem carregam, e-mail e menu funcionam, sem erro JS.
6. Texto com HTML exibido como texto, javascript: omitido e contraste baixo sinalizado.
7. Editor/prévia em 390px sem overflow e diálogo de reinício com Escape e restauração de foco.

## Revisão visual e correções

Desktop 1440×1000 e celular emulado 390×844; abas de conteúdo/projetos/aparência, paleta Papel, imagem de exemplo e prévia móvel. Fontes reais confirmadas por document.fonts no iframe. Corrigida restrição CORS de fontes usando incorporação na prévia, mantendo sandbox sem allow-same-origin. Corrigida restauração de foco no diálogo. Upload aplica atualização funcional para preservar outras edições feitas durante a conversão. Celular inicia com prévia de 390px; campos de edição usam 16px para evitar zoom automático em navegadores móveis.

Build Vite aprovado. Evidências editor-projects.png, editor-style.png, mobile-preview.png. Publicação não realizada nesta etapa. Mobile emulado; não houve teste em aparelho físico. Salvamento depende do armazenamento do navegador; exportar o JSON é a cópia portátil. Não há teste real de publicação em hospedagem externa nesta etapa.

Após o acabamento de acessibilidade do menu e dos campos móveis, os testes de ZIP offline e reinício móvel foram repetidos: dois aprovados. Build final aprovado. Projeto editável limitado a 16 MB para acomodar os dados máximos de seis imagens numa ida e volta. Também foi gerado exemplo-portfolio.zip por um download real do editor.


## Verificação para publicação — 17/10/2026

Sete testes completos aprovados (13,1 s). fflate atualizado para 0.8.3 e build de produção aprovado.
Publicação autorizada pelo autor no GitHub Pages. Pasta docs gerada por npm run pages:build. Verificação pública registrada em DEPLOY.md após a conclusão.

A importação também rejeita projetos do Marca Studio sem substituir o rascunho. Projetos antigos do Folio sem o campo kind continuam compatíveis. Novos arquivos recebem kind=folio-studio.
