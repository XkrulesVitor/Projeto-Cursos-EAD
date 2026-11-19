# Design System - Cursos EAD

## Design Read
Loja de cursos tecnicos (e-commerce) para desenvolvedores e estudantes, com linguagem Tech e Vibe Coding energetica, superficies neutras puras em modo claro e escuro e acento laranja-sinal de alta legibilidade.

## Design Dials
- `DESIGN_VARIANCE`: 7 (asimetria equilibrada no hero e destaques, grade de catalogo limpa e escaneavel)
- `MOTION_INTENSITY`: 6 (transicoes spring em drawer/modal, revelacoes suaves de lista e feedback tatil nos CTAs, 100% respeitando reduced-motion)
- `VISUAL_DENSITY`: 4 (respiro editorial nas secoes de marca e densidade pratica no catalogo de 26 trilhas)

## Mood & Color Strategy
- **Mood:** Oficina de engenharia de software a meia-noite e prancheta tecnica calibrada de dia: grafite puro, branco tecnico nitido e sinalizacao laranja-cobre de precisao.
- **Strategy:** Restrained-to-Committed. Toda a energia de cor vive nos tokens de marca (`--primary` e `--accent`), nunca em fundos bege/creme ou gradientes roxos.
- **Seed Anchor:** `oklch(0.495 0.134 36.0)` (hue 36°).

### OKLCH Tokens

#### Modo Claro (`:root`)
- `--bg`: `oklch(0.988 0.000 0)`
- `--surface`: `oklch(0.958 0.000 0)`
- `--surface-elevated`: `oklch(1.000 0.000 0)`
- `--border`: `oklch(0.875 0.000 0)`
- `--border-strong`: `oklch(0.760 0.000 0)`
- `--ink`: `oklch(0.155 0.000 0)`
- `--muted`: `oklch(0.435 0.000 0)`
- `--primary`: `oklch(0.555 0.185 36.0)` (texto sobre fill: `oklch(0.992 0 0)`)
- `--primary-hover`: `oklch(0.495 0.185 36.0)`
- `--primary-soft`: `oklch(0.945 0.040 36.0)`
- `--accent`: `oklch(0.490 0.145 155.0)` (ofertas/economia/status concluido; texto sobre fill: `oklch(0.992 0 0)`)
- `--accent-soft`: `oklch(0.945 0.038 155.0)`
- `--danger`: `oklch(0.545 0.195 25.0)`

#### Modo Escuro (`.dark`)
- `--bg`: `oklch(0.115 0.000 0)`
- `--surface`: `oklch(0.158 0.000 0)`
- `--surface-elevated`: `oklch(0.195 0.000 0)`
- `--border`: `oklch(0.265 0.000 0)`
- `--border-strong`: `oklch(0.365 0.000 0)`
- `--ink`: `oklch(0.965 0.000 0)`
- `--muted`: `oklch(0.710 0.000 0)`
- `--primary`: `oklch(0.640 0.195 36.0)` (texto sobre fill: `oklch(0.992 0 0)`)
- `--primary-hover`: `oklch(0.685 0.195 36.0)`
- `--primary-soft`: `oklch(0.245 0.065 36.0)`
- `--accent`: `oklch(0.650 0.155 155.0)` (texto sobre fill: `oklch(0.992 0 0)` ou dark em badge suave)
- `--accent-soft`: `oklch(0.230 0.055 155.0)`
- `--danger`: `oklch(0.640 0.195 25.0)`

## Typography (`next/font/google`)
- **Display:** `Bricolage Grotesque` (600, 700, 800), `text-wrap: balance`, letter-spacing floor `>= -0.03em`.
- **Body / UI:** `Figtree` (400, 500, 600, 700), corpo `16px`, `leading-relaxed`, `max-w-[65ch]`.
- **Mono:** `JetBrains Mono` (500, 600) exclusivamente para precos tabulares (`tabular-nums`), cargas horarias, codigos de cupom e metricas tecnicas.

## Shape Consistency Lock
- Cards e paineis: `rounded-xl` (`12px`)
- Botoes e inputs: `rounded-lg` (`8px`)
- Badges de categoria/oferta e avatares: `rounded-full`

## Icons & Visual Discipline
- Familia unica: `@phosphor-icons/react` (peso `regular` ou `bold` consistente; zero emojis na interface; zero SVG desenhado a mao para icones).
- **Hard Bans aplicados:**
  - Zero em-dashes (`—`) ou en-dashes (`–`) na interface.
  - Zero animacao em `<img>` no hover (nenhum `scale`, `rotate` ou `translate` em imagens).
  - Zero `border-left` / `border-right` decorativo colorido.
  - Zero texto com gradiente (`bg-clip-text`).
  - Zero fake UI de `<div>` no hero (uso de imagens reais geradas + foto real do instrutor).
  - Contencao de eyebrows (no maximo 1 eyebrow a cada 3 secoes).
  - Z-index semantico documentado (`--z-sticky: 20`, `--z-backdrop: 40`, `--z-drawer: 50`, `--z-modal: 60`, `--z-toast: 70`).
