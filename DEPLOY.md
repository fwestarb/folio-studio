# Publicação — 17/10/2026

- Site: https://fwestarb.github.io/folio-studio/
- Código: https://github.com/fwestarb/folio-studio
- GitHub Pages: branch main, pasta /docs.
- Sete testes automatizados aprovados após a atualização de fflate e a proteção contra importação do Marca Studio.
- Conferência pública em Edge: HTTP 200, edição refletida na prévia, projeto editável com kind=folio-studio, importação de Marca Studio rejeitada sem trocar o nome do rascunho, download real de ZIP com 15 arquivos e fontes locais. Nenhum erro JavaScript nem resposta HTTP de erro nesse percurso.
- Editor e prévia em 390 × 844 sem transbordamento horizontal.
- ZIP independente testado offline na suíte de testes.
- Evidências: verification/live-result.json, live-desktop.png e live-mobile.png.

O editor mantém rascunhos neste navegador. O JSON portátil é a cópia para continuar em outro computador. Não há conta ou armazenamento remoto de conteúdo.


## Atualização do formato do download

O ZIP agora inclui uma pasta superior com o nome do site. Todos os recursos e o arquivo abrir-no-vscode.code-workspace ficam dentro dela. Extraia e abra essa pasta no VS Code, ou abra o arquivo de workspace. O download contém um arquivo adicional de workspace em relação à verificação inicial acima. As duas suítes, com sete testes cada, foram executadas novamente e aprovadas, incluindo extração da nova pasta e visualização offline.
