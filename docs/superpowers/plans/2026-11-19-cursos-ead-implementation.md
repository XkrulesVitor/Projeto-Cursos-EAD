# Cursos EAD - Plano de Implementacao

> **Objetivo:** Construir a loja completa **Cursos EAD** em Next.js (exportacao estatica para GitHub Pages) com modo claro/escuro em OKLCH, as 26 trilhas do Nucleo de Projetos (90 cursos, 553h), FAQ, ofertas, carrinho com cupons, aba Sobre Mim com a foto enviada e camada pronta para Supabase.

**Arquitetura:** Next.js App Router (`output: 'export'`) + Tailwind CSS v4 + Motion (`motion/react`) + `@phosphor-icons/react` + `@supabase/supabase-js`. Estado de tema, carrinho, cupons e matriculas encapsulado em Context Providers client-side com abstracao de servicos que alterna automaticamente entre modo estatico local e Supabase real.

**Restricoes Globais:**
- Modo claro e escuro com contraste WCAG AA minimo (4.5:1) em tokens OKLCH.
- Zero em-dashes (`—`) ou en-dashes (`–`) em qualquer texto visivel.
- Zero animacoes `transform` em elementos `<img>` no hover.
- Exatamente 26 trilhas, 90 cursos e 553 horas coerentes com os prints do NP (Corporative).
- Precos de R$ 50,00 a R$ 250,00, com ofertas em R$ 49,99 e R$ 249,99.
- Sem Stripe; camada de backend preparada exclusivamente para Supabase.
- Deploy automatico configurado para `https://github.com/XkrulesVitor/Projeto-Cursos-EAD`.

---

### Tarefa 1: Scaffold Next.js + Configuracao GitHub Pages + Assets
- Criar `package.json`, `tsconfig.json`, `next.config.ts`, `postcss.config.mjs`, `.gitignore`, `.env.example`, `public/.nojekyll`.
- Copiar `vitor-noronha.jpg` e as 7 imagens geradas pelo `image-generator` para `public/images/`.
- Instalar dependencias via `npm.cmd install`.

### Tarefa 2: Dominio, Catalogo das 26 Trilhas e Verificacao Matematica
- Criar `src/types/course.ts`, `src/lib/assets.ts`, `src/lib/format.ts`, `src/data/courses.ts`, `src/data/faq.ts`, `src/data/testimonials.ts`, `src/data/about.ts`.
- Criar script de validacao `scripts/validate-catalog.mjs` garantindo: 26 trilhas, 90 cursos, 553 horas totais, soma exata das horas dos modulos por trilha, precos na faixa pedida e zero caracteres proibidos (`—`/`–`).

### Tarefa 3: Camada Pronta para Supabase (Sem Stripe)
- Criar `src/lib/supabase.ts`, `src/services/courseService.ts`, `src/services/enrollmentService.ts`, `src/services/authService.ts`.
- Criar `supabase/schema.sql` e `supabase/seed.sql` prontos para executar no SQL Editor do Supabase.

### Tarefa 4: Design System OKLCH, Providers e Componentes de Layout
- Configurar `src/app/layout.tsx` (fontes `Bricolage_Grotesque`, `Figtree`, `JetBrains_Mono`, script anti-flash de tema) e `src/app/globals.css`.
- Implementar `ThemeProvider`, `StoreProvider` (carrinho, cupons, matriculas, progresso, auth demo/Supabase, toasts).
- Implementar `Navbar`, `Footer`, `ThemeToggle`, `ToastStack`.

### Tarefa 5: Vitrine de Loja, Catalogo, Modal de Ementa, Carrinho, FAQ e Paginas
- Implementar `HeroSection`, `TrustBar`, `PromoShowcase`, `CatalogSection`, `CourseCard`, `CourseDetailModal`, `CartDrawer`, `CheckoutModal`, `TestimonialsSection`, `FaqSection`.
- Implementar paginas `/sobre/` (`src/app/sobre/page.tsx`) e `/matriculas/` (`src/app/matriculas/page.tsx`).

### Tarefa 6: GitHub Actions, README, Build e Auditoria Visual
- Criar `.github/workflows/deploy.yml` e `README.md` completo em portugues.
- Inicializar repositorio Git com `origin` apontado para `https://github.com/XkrulesVitor/Projeto-Cursos-EAD.git`.
- Rodar `scripts/validate-catalog.mjs` e `npm.cmd run build`.
- Servir o build estatico e auditar no navegador em desktop e mobile nos modos claro e escuro.
