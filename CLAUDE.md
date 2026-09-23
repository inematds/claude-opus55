# CLAUDE.md — claude-opus55

Pesquisa + plano de atualização do Claude Opus 5.5, publicada como guia trilíngue (PT/EN/ES) no GitHub Pages: https://inematds.github.io/claude-opus55/guia/

- Conta/autor: `inematds <inematds@gmail.com>`. Deploy via GitHub Actions (`.github/workflows/pages.yml`); push por SSH (o token `gh` da inematds não tem escopo `workflow`).
- **Nunca editar `guia/index.html`, `guia/en/` ou `guia/es/` à mão.** Editar `src/` ou `i18n/*.json` e rodar `python3 scripts/build.py`. O PT (`i18n/pt.json`) é a fonte; EN/ES precisam ter as mesmas chaves, tags e trechos `<code>`.
- Números: cada gráfico usa uma única tabela-fonte (ver `docs/pesquisa-web.md`). Não misturar números de system cards diferentes.
- Portal: card em `communityProjects` apontando para `/guia/`; versões EN/ES em `portal/src/data/translated-courses.ts`.

## Self-learning

When I correct you, or you catch yourself making a mistake: before continuing, add the lesson as a one-line rule under ## Lessons, so it never happens again.

## Lessons

- Filhos de grid com tabela/`pre` precisam de `min-width:0`, senão estouram a largura no celular mesmo com `overflow-x:auto` no contêiner. (23/09/2026)
- Nav do padrão INEMA: INEMA.CLUB, PRO, tema e GitHub são obrigatórios; no celular, quebrar o nav em duas linhas em vez de esconder itens. (23/09/2026)
