# Claude Opus 5.5 — Pesquisa e Plano de Atualização

[![Claude Opus 5.5](guia/assets/banner.jpg)](https://inematds.github.io/claude-opus55/guia/)

Pesquisa sobre o **Claude Opus 5.5** (Anthropic, lançado em 22/09/2026): preços, benchmarks em gráficos, as mudanças de API e o plano de atualização dos sistemas INEMA.

## 📖 Guia de uso

Guia completo (landing + passo a passo): **https://inematds.github.io/claude-opus55/guia/**

- 🇧🇷 Português: https://inematds.github.io/claude-opus55/guia/
- 🇺🇸 English: https://inematds.github.io/claude-opus55/guia/en/
- 🇪🇸 Español: https://inematds.github.io/claude-opus55/guia/es/

## Resumo

| | |
|---|---|
| **API ID** | `claude-opus-5-5` (Bedrock: `anthropic.claude-opus-5-5`) |
| **Contexto / saída** | 1M / 128K tokens |
| **Preço** | US$ 4 entrada · US$ 20 saída · cache read US$ 0,20 (por milhão) |
| **Effort padrão** | `medium` (no Opus 5 era `high`) |
| **Breaking changes** | thinking não desliga · sem `tool_choice` forçado · preserved thinking · computer use só via `computer_toolset_20260801` |

## Como o guia é gerado

Os três idiomas saem de uma fonte única. Não edite o HTML gerado.

```text
src/guia.template.html   estrutura da página (textos como {{t:chave}})
src/template.css         CSS do padrão projetos-landing-guia (intacto)
src/extra.css            gráficos, tabelas, seletor de idioma
src/charts.js            gráficos (textos vêm de i18n/<idioma>.json → "charts")
i18n/pt.json             textos-fonte em português
i18n/en.json, es.json    traduções
scripts/build.py         gera guia/index.html, guia/en/ e guia/es/
```

```bash
python3 scripts/build.py
```

O build para com erro se um idioma tiver chave faltando ou sobrando, se as tags HTML ou os trechos `<code>` de uma tradução diferirem do português, ou se sobrar algum `{{placeholder}}`.

## Fontes

Documentação oficial da Anthropic (anúncio, docs, preços, guia de migração, system card), cobertura de terceiros e inventário local somente leitura, em 22/09/2026. Notas de pesquisa em [`docs/`](docs/). Benchmarks oficiais são auto-reportados; as fontes completas estão no fim do guia.
