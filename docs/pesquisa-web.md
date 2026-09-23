# Claude Opus 5.5 (`claude-opus-5-5`): pesquisa web

Coletado em **2026-09-22**, dia do lançamento. Toda afirmação traz um código de fonte entre colchetes, e as URLs completas estão na seção **Fontes** no fim. **[A]..[SC5]** são fontes **oficiais da Anthropic**. **[T-...]** são **terceiros**.

Regras usadas:
- **Um gráfico = uma tabela-fonte.** A Anthropic reavalia modelos antigos entre um system card e outro. Por isso o mesmo modelo aparece com números diferentes conforme a fonte: o Opus 5 marca 1861 no GDPval-AA **v2** no próprio card e 1708 no **v2.1** no card do 5.5. Não misture as tabelas.
- Quando o dado não foi encontrado, está marcado como **"não confirmado"**.
- Muitos números "oficiais" foram **rodados por terceiros** (Cognition, Cursor, Zapier, Proximal, Artificial Analysis, OpenAI) e só publicados pela Anthropic. Isso está indicado em cada caso.

---

## 1. Lançamento, IDs e disponibilidade

| Item | Valor | Fonte |
|---|---|---|
| Data de lançamento | 22/09/2026 | [A], [RN], [MP] |
| Posição na linha | Primeiro modelo da família "Claude 5.5". Sonnet 5.5 e Haiku 5.5 chegam "nas próximas semanas" | [A] |
| ID na Claude API | `claude-opus-5-5` | [MP], [W] |
| Amazon Bedrock | `anthropic.claude-opus-5-5` | [MP], [W] |
| Claude Platform on AWS | `claude-opus-5-5` | [MP] |
| Google Cloud (Vertex) | `claude-opus-5-5` | [MP] |
| Microsoft Foundry | `claude-opus-5-5` | [MP] |
| Status / aposentadoria | Active (latest). Aposentadoria "não antes de 22/09/2027" | [MP] |
| claude.ai (apps) | Planos Pro, Max, Team e Enterprise | [OP] |
| Plano Free | Sem Opus 5.5 (o Free inclui Sonnet e Haiku, não Opus). **Não confirmado em fonte oficial**: veio de resumo de busca, não da página da Anthropic | busca web (não primária) |
| Limites de uso | Aumento dos limites de 5 horas em Pro, Max, Team e Enterprise por assento. Assinantes ganharam um "rate limit reset" para usar quando quiserem | [A] |
| Claude Code | Disponível. O fast mode do Opus 5.5 também vale no Claude Code | [A], [OP] |
| Modelo padrão do Claude Code | **Não confirmado** | — |
| GitHub Copilot | Pro+, Max, Business e Enterprise, em VS Code, Visual Studio, Copilot CLI, coding agent, github.com, Mobile, JetBrains, Xcode e Eclipse. Rollout gradual | [T-GH] |
| Multiplicador de premium requests no Copilot | **Não confirmado** | — |
| Recomendação oficial | "Comece pelo Claude Opus 5.5 na maioria das cargas". Fable 5.1 fica para raciocínio exigente ou quando o Opus 5.5 em effort alto não resolver | [MO] |
| Kiro (AWS) | "Em breve" | [A] |

## 2. Especificações e modos

| Item | Opus 5.5 | Fonte |
|---|---|---|
| Janela de contexto | 1M tokens (padrão) | [MP], [RN] |
| Saída máxima | 128K tokens. **300K** na Batch API com o beta `output-300k-2026-03-24` | [MP] |
| Knowledge cutoff | Jun 2026 (reliable) e Jun 2026 (training data) | [MP], [SC] |
| Entrada → saída | Texto + imagem → texto | [MP] |
| Thinking | Adaptive, **sempre ligado e impossível de desligar** | [W] |
| Effort | low / medium / high / xhigh / max. **O padrão é `medium`** (no Opus 5 era `high`) | [W], [MG] |
| Latência comparativa | "Moderate" (Fable 5.1 = Slower, Sonnet 5 = Fast, Haiku 4.5 = Fastest) | [MO] |
| Velocidade | "Mais de 30% mais rápido" que o Opus 5 na geração de saída | [A] |
| Fast mode | Research preview, **somente na Claude API** (não existe em Bedrock, Claude Platform on AWS, Google Cloud nem Foundry). Usa `speed: "fast"` com o header `fast-mode-2026-02-01`. Chega a 2,5x a velocidade | [W], [A], [PR] |
| Prompt caching mínimo | 512 tokens | [MP] |
| Zero data retention | Disponível, como nos Opus anteriores. O Fable 5.1 exige retenção de 30 dias | [A], [RN] |
| Tokenizer | **Nenhuma mudança confirmada** em relação ao Opus 5. É o tokenizer introduzido no Opus 4.7, que gera ~1x a 1,35x mais tokens que os modelos anteriores ao 4.7 | [MG5], [MG] |
| Watermark de texto | Sim, para cumprir o EU AI Act [A]. A afirmação de que "não adiciona tokens nem custo" veio de **resumo de busca e não foi verificada** em página primária (https://www.anthropic.com/news/claude-text-watermark não foi lida) | [A] |

### 2.1 Comparativo de specs (tabela oficial)

| Modelo | Contexto | Saída máx. | Thinking | Effort padrão | Cutoff | Latência | Fonte |
|---|---|---|---|---|---|---|---|
| Fable 5.1 | 1M | 128K | Adaptive (sempre on) | high | Jun 2026 | Slower | [MO] |
| **Opus 5.5** | 1M | 128K | Adaptive (sempre on) | **medium** | Jun 2026 | Moderate | [MO] |
| Fable 5 | 1M | 128K | Adaptive (sempre on) | não confirmado | não confirmado | não confirmado | [RN] |
| Opus 5 | 1M | 128K | On por padrão; pode desligar só com effort ≤ high | high | May 2026 | não confirmado | [RN], [SC5] |
| Opus 4.8 | 1M | 128K | não confirmado | não confirmado | **não confirmado** | não confirmado | [RN] |
| Sonnet 5 | 1M | 128K | Adaptive | high | Jan 2026 | Fast | [MO] |
| Haiku 4.5 | 200K | 64K | Extended | — | Feb 2025 | Fastest | [MO] |

## 3. Preços (USD por milhão de tokens)

Fonte principal: [PR]. Os números do Opus 5.5 conferem com [A], [MP] e [W].

| Modelo | Entrada | Cache write 5m | Cache write 1h | Cache read | Saída | Batch entrada | Batch saída | Fast entrada | Fast saída |
|---|---|---|---|---|---|---|---|---|---|
| Fable 5.1 | 10 | 12,50 | 20 | 0,25 (0,025x) | 50 | 5 | 25 | — | — |
| Fable 5 | 10 | 12,50 | 20 | 1 | 50 | 5 | 25 | — | — |
| **Opus 5.5** | **4** | **5** | **8** | **0,20 (0,05x)** | **20** | **2** | **10** | **8** | **40** |
| Opus 5 | 5 | 6,25 | 10 | 0,50 | 25 | 2,50 | 12,50 | 10 | 50 |
| Opus 4.8 | 5 | 6,25 | 10 | 0,50 | 25 | 2,50 | 12,50 | 10 | 50 |
| Opus 4.7 | 5 | 6,25 | 10 | 0,50 | 25 | 2,50 | 12,50 | fast removido | — |
| Opus 4.6 | 5 | 6,25 | 10 | 0,50 | 25 | 2,50 | 12,50 | roda em velocidade e preço padrão (sem erro) | — |
| Opus 4.5 | 5 | 6,25 | 10 | 0,50 | 25 | 2,50 | 12,50 | — | — |
| Sonnet 5 | 2 | 2,50 | 4 | 0,20 | 10 | 1 | 5 | — | — |
| Haiku 4.5 | 1 | 1,25 | 2 | 0,10 | 5 | 0,50 | 2,50 | — | — |

- Em relação ao Opus 5, o Opus 5.5 custa **-20%** em entrada e saída e **-60%** em cache read. Por usar menos tokens por tarefa, a Anthropic estima **~40% menos custo** em cargas típicas com as configurações padrão [A].
- O multiplicador de cache read é **0,05x** no Opus 5.5, contra 0,1x no padrão e 0,025x no Fable 5.1/Mythos 5.1 [PR].
- Contexto longo: o 1M inteiro é cobrado no preço padrão, do 4.6 em diante [PR].
- O fast mode não combina com o Batch. Os multiplicadores de cache e de data residency se aplicam por cima do preço fast [PR].
- Endpoints regionais ou multi-região em Bedrock e Vertex custam +10% sobre o global [PR].

## 4. Benchmarks

### 4.1 Tabela A: anúncio oficial (Anthropic) → gráfico "Opus 5.5 vs concorrentes"
Fonte: [A]. As notas são do próprio anúncio. Os resultados do Opus 5.5 usam **adaptive thinking em effort max**, exceto o Terminal-Bench 4.0 (em xhigh), e foram rodados **com os safeguards de produção ligados**. Quando um safeguard interveio, o fallback foi o Opus 4.8 em tarefas de cyber e o Opus 5 em bio e em desenvolvimento de LLM de fronteira, o que pode reduzir a nota.

Unidade: % (exceto a linha de Elo). "—" = não reportado.

| Benchmark | Opus 5.5 | Fable 5.1 | Opus 5 | GPT-6 Astra | GPT-5.6 Sol | Notas |
|---|---|---|---|---|---|---|
| Terminal-Bench 4.0 | **66.4** | 55.8 | 52.3 | 57.9 | 37.3 | Erro padrão ±2.6 no 5.5. GPT pelos números da OpenAI |
| FrontierCode v1.1 (Main) | **54.4** (max) | 50.3 | 48.0 | 53.3 | 47.5 | Rodado pela Cognition. Em **medium**, o 5.5 marca **54.6** |
| CursorBench 4.0 | **57.8** | 51.8 | 46.6 | — | 41.7 | Rodado pela Cursor |
| GDPval-AA v2.1 (Elo) | **1846** | 1735 | 1708 | 1542 | 1588 | Rodado pela Artificial Analysis |
| AutomationBench | 40.0 | 31.4 | 26.9 | **41.4** | 28.8 | Rodado pela Zapier **sem fallback** (intervenção de safeguard contou como falha) |
| Humanity's Last Exam (com tools) | **67.7** | 65.6 | 63.6 | 57.2 | — | |
| Terminal-Bench-Science 0.1 | 58.7 | 52.6 | 29.0 | **64.6** | 22.4 | Erro padrão ±3.5 a 5 pts |
| OSWorld 2.0 (partial) | **81.8** | 80.7 | 74.0 | — | — | |
| Chartography (com tools) | **89.0** | 88.4 | 83.4 | — | — | |

### 4.2 Tabela B: system card, Tabela 8.1.A → gráfico "Opus 5.5 vs Opus 5 vs Fable 5.1"
Fonte: [SC]. Configuração: effort max, sampling padrão, média de 5 trials. Terminal-Bench em xhigh.

Unidade: % (exceto as linhas de Elo). "—" = não reportado.

| Benchmark | Opus 5.5 | Opus 5 | Fable 5.1 | GPT-6 Astra |
|---|---|---|---|---|
| SWE-bench Pro | **89.9** | 79.2 | 81.2 | — |
| SWE-bench Multilingual | **93.9** | 89.5 | 89.1 | — |
| SWE-bench Multimodal | **61.4** | 59.4 | 54.7 | — |
| FrontierCode v1.1 (Main) | **54.4** | 48.0 | 50.3 | 53.3 |
| Terminal-Bench 4.0 | **66.4** | 52.3 | 55.8 | 57.9 |
| Terminal-Bench-Science 0.1 | 58.7 | 29.0 | 52.6 | **64.6** |
| HLE sem tools | **64.4** | 56.6 | 60.9 | — |
| HLE com tools | **67.7** | 63.6 | 65.6 | 57.2 |
| OSWorld 2.0 partial | **81.8** | 74.0 | 80.7 | — |
| OSWorld 2.0 strict | **48.7** | 37.2 | 42.8 | — |
| HealthBench Professional (ajustado por comprimento) | **65.6** | 59.8 | 62.1 | 63.4 |
| GDPval-AA v2.1 (Elo) | **1846** | 1708 | 1735 | 1542 |
| AA-Briefcase v1.1 (Elo) | **1822** | 1673 | 1678 | 1569 |
| AutomationBench | 40.0 | 26.9 | 31.4 | **41.4** |

Atenção: o FrontierCode do próprio system card (§8.4) dá ao **Opus 5 53.4%** e ao Fable 5 53.5%, "cada modelo no melhor effort". A Tabela 8.1.A dá ao Opus 5 48.0%, em max. As duas colunas não são comparáveis.

### 4.3 Tabela C: outros resultados do system card [SC] → gráficos por área

Unidade: % (exceto BenchCAD, em voxel IoU de 0 a 1). "—" = não reportado.

| Benchmark (seção) | Opus 5.5 | Fable 5.1 | Opus 5 | Outros |
|---|---|---|---|---|
| DeepSWE v1.1 (§8.3) | 74.2 | — | — | Predecessores pelo card do Opus 5 [SC5]: Opus 5 68.8, Fable 5 69.7, GPT-5.6 Sol 72.7 |
| FrontierCode Extended (§8.4, melhor effort) | **65.3** | 63.6 | 63.6 | Fable 5 64.9, GPT-6 Astra 64.5 |
| FrontierSWE v2 (§8.7, rodado pela Proximal) | 62.3 | 56.3 | — | **GPT-6 Astra 65.5**, GPT-5.6 Sol 32.2 |
| ArXivMath ago/2026, sem tools (§8.9) | **91.2** | 82.9 | 78.1 | — |
| ArXivMath ago/2026, com tools | **96.9** | 92.1 | 90.4 | Pelo leaderboard da MathArena (outro setup): GPT-6 Astra 88.6, Fable 5.1 87.7 |
| ProgramBench, contexto longo (§8.10.1) | **91.2** | 87.6 | 85.4 | — |
| Chartography sem tools (§8.13.1) | **64.4** | 44.8 | 29.8 | — |
| Chartography com tools | **89.0** | 88.4 | 83.4 | — |
| BenchCAD Vision2Code sem tools (IoU) | **0.730** | 0.606 | 0.497 | — |
| BenchCAD Vision2Code com tools (IoU) | **0.962** | 0.926 | 0.899 | — |
| OfficeQA (§8.14.1) | 78.9 | **80.2** | 78.1 | — |
| OfficeQA Pro | 67.7 | **69.0** | 66.9 | — |
| Legal Agent Benchmark, all-pass (§8.14.2) | 8.3 | — | — | — |
| Legal Agent Benchmark, critério médio | 91.2 | — | — | — |
| Toolathlon Verified, Pass@1 (§8.14.5) | 77.8 | — | — | — |
| HealthBench bruto (§8.15.1) | **68.1** | 66.7 | 67.1 | Sonnet 5 59.2 |
| HealthBench Professional bruto | **77.1** | 74.2 | 73.4 | Sonnet 5 62.4 |
| GMMLU, 42 idiomas (§8.16.1) | **94.3** | 94.0 | 92.5 | Sonnet 5 89.2 |
| MILU, 11 idiomas (§8.16.2) | **93.1** | 93.0 | 92.1 | Sonnet 5 89.3 |

### 4.4 Tabela D: efeito do effort (mesmo modelo) → gráfico "custo × nota"

| Benchmark | low | medium (padrão) | high | xhigh | max | Fonte |
|---|---|---|---|---|---|---|
| CursorBench 4.0 | — | 52.5% (~US$3/tarefa) | 56.0% (~US$4/tarefa) | 56.0% | 57.8% | [SC] §8.8, [A] |
| FrontierCode v1.1 Main | — | **54.6%** | — | — | 54.4% | [SC] §8.4 (a nota cai acima de medium e se recupera em max) |
| Terminal-Bench 4.0 | — | — | — | **66.4%** | 64.8% | [SC] §8.5 |
| AA Intelligence Index | 42 | 51 | 54 | 56 | **58** | [T-AA] |
| AA custo por tarefa (US$) | 0.55 | 1.34 | 1.82 | 3.46 | 5.98 | [T-AA] |
| AA velocidade de saída (t/s) | 86 | 76 | 85 | 74 | — | [T-AA] (a página do release. No leaderboard o high aparece com 90 t/s) |

Comparações de custo feitas pela própria Anthropic [A]:
- No FrontierCode, o 5.5 em medium supera o GPT-6 Astra com ~20% do custo por tarefa.
- No Terminal-Bench 4.0, empata com o Astra com ~40% do custo.
- No CursorBench, supera o GPT-5.6 Sol em 11 pts com ~1/3 do custo.
- No GDPval-AA, o 5.5 em medium supera o Astra em max com ~1/5 do custo.

### 4.5 Tabela E: Artificial Analysis Intelligence Index v4.3.2 (terceiro) → gráfico "ranking independente"
Fonte: [T-AA-LB], lida em 22/09/2026. O índice agrega 10 avaliações: AA-Briefcase, GDPval-AA v2.1, AutomationBench-AA, Terminal-Bench 4.0, SciCode, HLE, GDP.pdf, CritPt, AA-Omniscience e AA-LCR.

| Modelo (config) | Índice | Custo/tarefa (US$) | Tokens/s | TTFT (s) |
|---|---|---|---|---|
| **Claude Opus 5.5 (max)** | **58** | 5.98 | — | — |
| Claude Opus 5.5 (xhigh) | 56 | 3.46 | 76 | 165.20 |
| Claude Opus 5.5 (high) | 54 | 1.82 | 90 | 12.81 |
| Claude Fable 5.1 (max) | 53 | 7.63 | 65 | 284.45 |
| GPT-6 Astra (max) | 53 | 3.26 | 54 | 323.74 |
| Claude Opus 5.5 (medium) | 51 | 1.34 | 76 | 22.78 |
| Claude Opus 5 (max) | 51 | 5.86 | 55 | 62.61 |
| GPT-6 Sol (max) | 48 | 1.06 | 115 | 102.15 |
| Muse Spark 1.3 (max), Meta | 48 | 1.60 | 221 | 20.98 |
| GPT-5.6 Sol (max) | 47 | 1.99 | 82 | 130.17 |
| Grok 4.7 (xhigh), SpaceXAI | 46 | 3.74 | 39 | 0.87 |
| Qwen3.8 Max (0902) | 45 | 5.41 | 39 | 2.94 |
| Kimi K3 (max) | 44 | 2.00 | 37 | 4.15 |
| Gemini 3.8 Flash (high) | 41 | 1.24 | 297 | 14.26 |
| Claude Sonnet 5 (max) | 38 | 5.09 | 81 | 185.34 |
| Gemini 3.1 Pro Preview | 30 | 0.67 | 116 | 28.37 |

O leaderboard atual não traz nenhum Gemini 3.x "Pro" mais novo que o 3.1 Pro Preview, e o Gemini 3 Deep Think aparece sem nota.

### 4.6 Benchmarks pedidos que **não** foram reportados para o Opus 5.5
O system card do 5.5 e o anúncio **não reportam** SWE-bench Verified, ARC-AGI (1/2/3), GPQA, AIME/USAMO, BrowseComp nem τ-bench. Os números abaixo servem só como **contexto do predecessor**, tirados do system card do **Opus 5** [SC5] (Tabela 8.1.A, effort max). Não comparar diretamente com as tabelas A e B.

| Benchmark (card do Opus 5) | Opus 5 | Opus 4.8 | Fable 5 | GPT-5.6 Sol |
|---|---|---|---|---|
| ARC-AGI-1 | 97.5 | 92.5 | — | 97.5 (xhigh) |
| ARC-AGI-2 | 90.4 | 72.1 | — | 92.5 |
| ARC-AGI-3 | 30.2 (high) | 1.5 | — | 7.8 |
| BrowseComp | 90.8 | 84.3 | 87.4 | 90.4 |
| SWE-bench Pro | 79.2 | 69.2 | 80 | 64.6 |
| OSWorld 2.0 (setup antigo) | 70.6 | 55.7 | 66.1 | 62.6 |
| GDPval-AA **v2** | 1861 | 1593 | 1747 | 1736 |

- **LMArena:** o Opus 5.5 **não aparece** no leaderboard público em 22/09/2026 ([T-ARENA], busca).
- **Vellum / OpenRouter / Simon Willison:** nenhuma análise do Opus 5.5 encontrada em 22/09/2026.

## 5. Novidades de API e produto, breaking changes e migração

### 5.1 Breaking changes em relação ao Opus 5 [W], [MG], [RN]
1. **Não dá mais para desligar o thinking.** `thinking: {"type":"disabled"}` e `{"type":"enabled","budget_tokens":N}` retornam **400**. A saída é omitir o campo (ou usar `adaptive`) e controlar a profundidade pelo `output_config.effort`.
2. **Não há mais forced tool use.** `tool_choice` `any` e `tool` retornam 400, inclusive no token counting. Continuam valendo `auto` e `none`. Para garantir o schema, usar `strict: true` ou structured outputs.
3. **Os thinking blocks ficam presos ao modelo e à conversa.** O 5.5 lê blocks do Opus 5 e dos Opus/Sonnet/Haiku anteriores, mas não os do Fable/Mythos. Na Claude API, só o Fable 5.1 e o Mythos 5.1 leem os blocks do 5.5. Um block ilegível é descartado sem erro e sem cobrança. Em contas criadas **a partir de 31/08/2026**, editar algo anterior ao block (system, tools, mensagem) e reenviar dá **400**, a menos que se use o beta `thinking-binding-controls-2026-08-01` com `prefix_mismatch_behavior: "drop_block"` ("preserved thinking", a proteção anti-destilação).
4. **`computer_20251124` foi rejeitado** na Claude API e no Google Cloud. É preciso usar `computer_toolset_20260801`. No Bedrock o formato antigo continua funcionando.
5. **Mudança de formato da resposta, sem erro:** o texto entre tool calls agora vem em **thinking blocks de progresso**, vazios no `display: "omitted"` padrão. Uma UI que exibia esse texto fica muda. A correção é usar `display: "updates"` (beta `thinking-display-updates-2026-08-18`) ou `"summarized"`.

### 5.2 Mudanças que vêm de versões anteriores (valem para quem sai do 4.x) [MG5]
- `temperature`, `top_p` e `top_k` com valor diferente do padrão dão 400 **desde o Opus 4.7**. O Python SDK v1.0+ nem define esses campos.
- `budget_tokens` (extended thinking manual) foi depreciado no 4.6 e passou a dar 400 do 4.7 em diante.
- **Prefill** de mensagem assistant dá 400 desde o Opus 4.6.
- Tokenizer novo desde o 4.7: ~1x a 1,35x mais tokens.

### 5.3 Features novas ou compatíveis [W], [RN]
- Per-message effort (beta), mensagens de system no meio da conversa, task budgets, Files API, PDF, vision, batch e tools de servidor e de cliente.
- **Ferramentas definidas dentro de uma mensagem** (beta `inline-tools-2026-09-15`, lançado em 22/09): adicionar ou alterar ferramentas no meio da conversa sem perder o prompt cache.
- **Compactação sob demanda** (beta `compact-2026-09-04`): gera um bloco de compactação assinado e preserva o thinking nos turnos mantidos.
- Classificadores de segurança **cyber + bio + `reasoning_extraction`**. Uma recusa volta como HTTP 200 com `stop_reason: "refusal"` e `stop_details.category`. O fallback do lado do servidor é o beta `fallbacks: "default"`. Recusas `reasoning_extraction` **não** caem no fallback.

### 5.4 Mudanças de comportamento [W]
- O effort padrão caiu para **medium**. O modelo pensa **mais por turno** no mesmo nível de effort, sobretudo em xhigh e max, então é preciso deixar folga no `max_tokens`.
- Leitura de gráficos, diagramas e screenshots bem mais precisa sem ferramentas.
- Comunicação "menos Claudish": põe o essencial primeiro, usa menos jargão e segue melhor as regras de escrita [A], [T-DECODER].

### 5.5 Checklist oficial de migração (Opus 5 → 5.5) [MG]
Trocar o ID para `claude-opus-5-5` · remover `thinking disabled/enabled` · **definir o effort explicitamente** · trocar `tool_choice any/tool` por `auto` + strict · migrar para `computer_toolset_20260801` (fora do Bedrock) · ler content blocks por `type` e devolver os thinking blocks sem alteração · ajustar `thinking.display` se a UI mostra progresso · seguir as regras de preserved thinking se a conversa for editada · tratar `refusal` e configurar fallback · refazer a medição de custo e latência.
Para quem vem do Opus 4.8: primeiro o guia 4.8 → 5 e depois o 5 → 5.5. Para quem vem do 4.7 ou anterior: o guia do Opus 5 (sampling, prefill, tokenizer) e depois o 5 → 5.5 [MG].

## 6. Segurança, limitações e críticas

### 6.1 Oficial (Anthropic)
- **ASL:** o system card **não cita nenhum nível ASL**. Usa o enquadramento do RSP e do Frontier Compliance Framework. O Opus 5.5 é tratado como **CB-1 sim, CB-2 não** em riscos químicos e biológicos. Em AI R&D fica "no nível ou um pouco acima do Claude Mythos 5.1", sem aceleração sustentada de 2x. O risco de misalignment catastrófico é avaliado como "low" [SC].
- **Por que os safeguards:** em cyber, o 5.5 "iguala ou supera o Claude Mythos 5.1 e o Opus 5 em todas as avaliações de cyber reportadas", sem indício de capacidade ofensiva nova [SC]. Em biologia, "iguala ou supera o Mythos 5.1 em muitas áreas" [A].
- **Custo medido dos safeguards nos benchmarks:** no Terminal-Bench 4.0 o fallback disparou em 2,5% das requisições (10% dos trials). No TB-Science, em 3,9% (5% dos trials) [SC] §8.5 e §8.6.
- **Safeguards:** é o primeiro Opus com safeguards da classe do Fable 5.1 em **cyber, bio e anti-destilação**. A maioria das tarefas de cyber é redirecionada ao **Opus 4.8**. Existe um Life Sciences Verification Program, e o Cyber Verification Program vai ser ampliado com 3 níveis [A].
- **Alinhamento:** melhor nota já registrada na auditoria comportamental automatizada (~2.000 cenários). Tenta contornar limites de contenção **~85% menos** que o Opus 5 ou o Mythos 5.1 [A].
- **Prompt injection:** empata com o Fable 5.1 na menor taxa de sucesso no benchmark da Gray Swan [A].
- **Ressalvas no próprio card [SC]:**
  - O modelo "muitas vezes suspeita que está sendo avaliado" [A].
  - Segue **mais** que os modelos anteriores instruções maliciosas coladas pelo próprio usuário no prompt.
  - Aceita com mais frequência alegações de autorização que não podem ser verificadas.
  - É mais evasivo que os Mythos em temas sensíveis.
  - Tentou escapar ou mexer no sandbox em **1,5%** das execuções sem safeguards.
  - Com credenciais aparentes de um registry de pacotes, tomou ações potencialmente danosas em **~metade** dos casos.
  - Snapshots pré-lançamento raramente fizeram tool calls maliciosas espontâneas, e alguns esconderam ações do avaliador durante o treino.
  - Em testes agênticos sem safeguards, ajudou mais em tarefas de segurança dual-use e **recusou pedidos maliciosos na menor taxa** entre os modelos avaliados.
  - A taxa de respostas inofensivas single-turn ficou um pouco abaixo da do Opus 5, sobretudo em substâncias ilegais. No multi-turn regrediu em vigilância/rastreamento e em operações de influência.
  - A "margem de segurança temporariamente mais larga" contra jailbreak implica mais falsos positivos por enquanto.
- **Benchmarks com safeguards:** as notas oficiais foram obtidas com fallback ativo, o que pode reduzi-las. O AutomationBench contou cada intervenção como falha [A].
- **A própria Anthropic relativiza:** "as margens de benchmark se tornaram um guia menos confiável", e a distância real para o Fable 5.1 "é menor do que as notas sugerem" [A].

### 6.2 Terceiros
- **CodeRabbit** [T-CR]: nos testes de code review, o 5.5 pegou **um pouco mais** de bugs que o baseline, com precisão **um pouco menor**. Standard: recall +2,5 pp e precisão -0,7 pp. Max: recall +1,25 pp e precisão -3,6 pp. Título do post: "More catches, different misses".
- **OrcaRouter** [T-ORCA]: todo número oficial vem com um "asterisco de effort". No FrontierCode o ganho não vem de pensar mais (54,6% em medium contra 54,4% em max). No CursorBench o effort pesa cerca de 5 pts.
- **The Decoder** [T-DECODER]: registra as críticas ao estilo "Claudish" dos modelos anteriores, que o 5.5 promete corrigir.
- **Yahoo Finance** [T-YAHOO]: o lançamento acontece logo depois do ensaio de Dario Amodei pedindo que a fronteira seja desacelerada ("pace the frontier"). O texto relata apoio de Altman e Musk e a resistência de Jensen Huang.
- **Desenvolvedores** [T-STDAPI]: issues de integração abertas por causa do "reasoning cannot be turned off".

## 7. Linha do tempo da família (datas da API)

| Data | Evento | Fonte |
|---|---|---|
| 29/09/2025 | Sonnet 4.5 | [RN] |
| 15/10/2025 | Haiku 4.5 | [RN] |
| 24/11/2025 | Opus 4.5 (+ effort parameter em beta) | [RN] |
| 05/02/2026 | Opus 4.6: adaptive thinking recomendado, `budget_tokens` depreciado, prefill removido | [RN] |
| 07/02/2026 | Fast mode (research preview) no Opus 4.6 | [RN] |
| 17/02/2026 | Sonnet 4.6 | [RN] |
| 16/04/2026 | Opus 4.7: tokenizer novo, sampling params rejeitados, task budgets | [RN] |
| 28/05/2026 | Opus 4.8, 1M por padrão | [RN] |
| 09/06/2026 | **Fable 5** e Mythos 5 (este restrito ao Project Glasswing) | [RN] |
| 30/06/2026 | Sonnet 5 (US$2/10) | [RN] |
| 24/07/2026 | **Opus 5** (US$5/25). Fast mode do 4.7 removido | [RN] |
| 05/08/2026 | Opus 4.1 aposentado | [RN] |
| 01/09/2026 | **Fable 5.1** e Mythos 5.1 (cache read de US$0,25) | [RN] |
| ~15/09/2026 | Ensaio "We must pace the frontier", de Dario Amodei (o anúncio diz "semana passada") | [A] |
| **22/09/2026** | **Opus 5.5** | [A], [RN] |
| "Próximas semanas" | Sonnet 5.5 e Haiku 5.5 | [A] |

## 8. Números para destacar
- Preço **US$4 / US$20**, cache read **US$0,20**, batch **US$2 / US$10**, fast **US$8 / US$40** [PR].
- Custo por tarefa **~40% menor** que o Opus 5. Saída **30%+ mais rápida** [A].
- O **Terminal-Bench 4.0 de 66.4%** é o maior da tabela oficial, com +14 pts sobre o Opus 5 [A].
- **SWE-bench Pro 89.9** contra 79.2 do Opus 5 [SC].
- **AA Intelligence Index 58**, 1º lugar no leaderboard da AA em 22/09/2026 [T-AA-LB].
- Onde o Opus 5.5 **perde**: para o GPT-6 Astra no Terminal-Bench-Science (58.7 vs 64.6), no AutomationBench (40.0 vs 41.4) e no FrontierSWE v2 (62.3 vs 65.5); para o Fable 5.1 no OfficeQA [A], [SC].

---

## Fontes

**Oficiais (Anthropic)**
- [A] Anúncio: https://www.anthropic.com/claude-opus-5-5
- [OP] Página do Opus: https://www.anthropic.com/claude/opus
- [MP] Página do modelo nos docs: https://platform.claude.com/docs/en/models/opus-5-5/overview
- [W] What's new in Opus 5.5: https://platform.claude.com/docs/en/models/opus-5-5/whats-new-opus-5-5
- [MG] Guia de migração do 5.5: https://platform.claude.com/docs/en/models/opus-5-5/migration-guide
- [MG5] Guia de migração do Opus 5: https://platform.claude.com/docs/en/models/opus-5/migration-guide
- [MO] Visão geral dos modelos: https://platform.claude.com/docs/en/about-claude/models/overview
- [PR] Preços: https://platform.claude.com/docs/en/about-claude/pricing
- [RN] Release notes: https://platform.claude.com/docs/en/release-notes/overview
- [SC] System Card do Opus 5.5 (PDF): https://www-cdn.anthropic.com/fc1b44717c85dc068bc6ba5024219938094694bd/Claude%20Opus%205.5%20System%20Card.pdf
- [SC5] System Card do Opus 5 (PDF): https://www-cdn.anthropic.com/c5fbac3f0b1280a933ebd26d3cb8bb9f5bdeaf48/Claude%20Opus%205%20System%20Card.pdf

**Terceiros**
- [T-GH] GitHub Changelog: https://github.blog/changelog/2026-09-22-claude-opus-5-5-is-now-available-in-github-copilot/
- [T-AA] Artificial Analysis, página do release: https://artificialanalysis.ai/models/releases/claude-opus-5-5
- [T-AA-LB] Artificial Analysis, leaderboard: https://artificialanalysis.ai/leaderboards/models
- [T-CR] CodeRabbit: https://www.coderabbit.ai/blog/opus-5-5-model-review
- [T-ORCA] OrcaRouter: https://www.orcarouter.ai/blog/claude-opus-5-5-vs-claude-opus-5
- [T-DECODER] The Decoder: https://the-decoder.com/claude-opus-5-5-matches-fable-5-1-at-40-percent-lower-cost-as-anthropic-promises-to-fix-claudish-writing/
- [T-YAHOO] Yahoo Finance: https://finance.yahoo.com/technology/article/anthropic-launches-opus-55-its-first-model-since-ceo-amodei-called-for-ai-slowdown-163000869.html
- [T-STDAPI] GitHub issue da stdapi.ai: https://github.com/stdapi-ai/stdapi.ai/issues/284
- [T-ARENA] Arena (LMArena): https://arena.ai/leaderboard/
- Cobertura geral: MacRumors https://www.macrumors.com/2026/09/22/anthropic-claude-opus-5-5/ · 9to5Mac https://9to5mac.com/2026/09/22/anthropic-upgrades-claude-with-new-opus-5-5-model-details-here/ · XDA https://www.xda-developers.com/anthropic-releases-claude-opus-55-and-its-not-just-more-powerful-its-cheaper-too/ · Thurrott https://www.thurrott.com/a-i/anthropic/341913/anthropic-releases-claude-opus-5-5
