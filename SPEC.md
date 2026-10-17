# Folio Studio — especificação

Novo projeto independente do portfólio publicado de Felipe Westarb. Editor visual local de um modelo editorial inspirado na composição já criada: grafite #1d2321, texto #e5e1d3, verde #b2c79b; Cormorant Garamond nos títulos e Manrope nas interfaces. Conteúdo de exemplo genérico, sem contatos ou informações pessoais de Felipe no site exportado.

Fluxo: editar conteúdo/projetos/aparência; conferir prévia isolada em três larguras; baixar ZIP estático independente. Nome provisório Folio Studio. Sem autenticação, servidor de dados, conta ou pagamento. Projeto local preparado para publicação posterior no GitHub conforme o fluxo já usado neste chat.

Personalizações: nome, área, título em até quatro linhas, introdução, Sobre, serviços, contato, seis trabalhos com imagens/legendas/enquadramento/links, ordem e remoção. Cores livres e quatro paletas; fontes dos títulos/textos; layout assimétrico ou central; raio e movimento de rolagem.

Rascunho em IndexedDB; status de salvamento e recuperação de falhas. Desfazer/refazer. Projeto editável JSON versionado com imagens incluídas e importação validada. ZIP inclui HTML/CSS/JS, imagens, fontes/OFL, instruções, licença MIT do modelo e JSON editável. Sem dependências remotas em execução do site baixado.

Prévia em iframe sandbox allow-scripts, sem allow-same-origin; conteúdo escapado, URLs restritas a http/https e e-mail validado. Sem HTML personalizado. Upload PNG/JPEG/WebP com limite de tamanho e resolução, re-encode local otimizado. Importação JSON limitada a 16 MB e normalizada. Fontes de prévia incorporadas para preservar isolamento sem depender de CORS. Imagens ilustrativas feitas em SVG por código, claramente exemplos.

QA: editar nome/título/cor/fonte; prévia em 3 larguras; upload e ordem/remoção; salvamento após reload; JSON ida e volta; arquivo inválido; contraste; tentar HTML/script em textos e URL; menu da prévia; ZIP real extraído e aberto separadamente, sem editor ou rede. Verificar layout do editor em 390/768/1440, teclado e diálogo de reinício. Não alterar o portfólio anterior.
