# Especificacao de Design - Cursos EAD

**Data:** 2026-11-19  
**Repositorio alvo:** `https://github.com/XkrulesVitor/Projeto-Cursos-EAD`  
**Deploy alvo:** GitHub Pages via GitHub Actions (`https://xkrulesvitor.github.io/Projeto-Cursos-EAD/`)

## 1. Visao Geral
E-commerce completo de cursos de tecnologia chamado **Cursos EAD**, construido com **Next.js (App Router, exportacao estatica `output: 'export'`)**, TypeScript, Tailwind CSS v4, Motion e `@phosphor-icons/react`. O catalogo reune as **26 trilhas oficiais do Nucleo de Projetos (NP)** somando **94 cursos** e **573 horas** de conteudo estruturado, com ementa detalhada modulo por modulo e precos entre **R$ 50,00 e R$ 250,00** (incluindo promocoes em **R$ 49,99** e **R$ 249,99**).

## 2. Arquitetura de Paginas e Fluxos
Como a aplicacao e exportada estaticamente para o GitHub Pages, o App Router utiliza rotas estaticas limpas e interacoes instantaneas:
- **`/` (Vitrine da Loja):**
  - Header fixo em 1 linha (`<= 72px`) com logo `Cursos EAD`, navegacao (`Catalogo`, `Ofertas`, `FAQ`, `Sobre Mim`, `Minhas Matriculas`), alternador `Claro/Escuro`, botao de Conta/Auth e botao do Carrinho com contador vivo.
  - **Hero de Vitrine Assimetrico:** Proposta de valor clara, CTAs objetivos (`Explorar catalogo` e `Ver ofertas`), visual autoral gerado e cartao interativo de trilha em destaque.
  - **Faixa de Confianca da Loja:** 4 garantias objetivas (Acesso imediato e continuo, Certificado digital com carga horaria real, Ementa pratica do Nucleo de Projetos, Garantia incondicional de 7 dias).
  - **Vitrine de Ofertas Relampago / Promocoes:** Destaque curado das trilhas em oferta (**R$ 49,99**, **R$ 249,99** e descontos reais) com economia exibida em reais e percentual.
  - **Catalogo Completo (26 Trilhas):** Busca por texto (titulo, categoria, tecnologia, modulo), filtro por 6 categorias, filtro rapido `Somente promocoes`, filtro por faixa de carga horaria e ordenacao (`Destaque`, `Menor preco`, `Maior preco`, `Maior carga horaria`).
  - **Avaliacoes de Alunos:** Depoimentos curtos (ate 3 linhas) de estudantes e desenvolvedores.
  - **FAQ Interativo (Accordion):** Perguntas frequentes sobre acesso, certificados, carga horaria, atualizacoes, cupons e integracao futura.
  - **Footer Completo de Loja:** Links por categoria, links institucionais, barra de cupons ativos, status de modo (`Estatico local` ou `Supabase conectado`) e creditos.
- **`/sobre/` (Aba Sobre Mim):**
  - Retrato oficial do autor (`public/images/vitor-noronha.jpg`) diante do logo AWS.
  - Biografia fiel ao GitHub `XkrulesVitor` (Vitor Hugo Felipe Noronha): graduacao em Engenharia de Software no Inatel, Coordenador de P&D no Nucleo de Projetos da CP2eJr e lideranca do *CP2eJR - Corporative*, Co-Fundador da Made By You, pesquisa em Modelagem Computacional e Manufatura Aditiva 3D, Tecnico em Eletronica (ETE FMC) e premiacao *Melhor Visual* na Game Jam Cubio.
  - Stack tecnica, selecao de projetos publicos do GitHub com links reais e botoes diretos para GitHub, LinkedIn e e-mail.
- **`/matriculas/` (Minhas Matriculas & Conta):**
  - Exibe todas as trilhas adquiridas pelo usuario (salvas no `localStorage` em modo estatico ou na tabela `enrollments` quando o Supabase estiver configurado), permitindo abrir a ementa e marcar modulos como concluidos com barra de progresso real.
  - Painel de autenticacao preparado para Supabase Auth (login/cadastro por e-mail e senha) com aviso transparente quando operando em modo demonstracao local.
- **Modal de Ementa e Detalhes do Curso:**
  - Acessivel a partir de qualquer card da loja ou oferta.
  - Exibe capa, categoria, preco atual/anterior, badge de desconto, numero exato de cursos e carga horaria total, lista de objetivos ("O que voce vai dominar"), pre-requisitos e **grade curricular completa** listando cada curso/modulo com sua carga horaria individual somando exatamente o total da trilha.
- **Drawer Lateral do Carrinho + Checkout de Matricula:**
  - Adicao/remocao de trilhas, calculo de subtotal, desconto promocional automatico, campo de **cupom de desconto** funcional (`CP2EJR10`, `VIBE15`, `INATEL20`), resumo e formulario de confirmacao de matricula (sem gateway de pagamento, gravando direto no servico preparado para Supabase).

## 3. Camada Pronta para Supabase (Sem Stripe)
- `src/lib/supabase.ts`: inicializacao segura de `createClient` apenas quando `NEXT_PUBLIC_SUPABASE_URL` e `NEXT_PUBLIC_SUPABASE_ANON_KEY` existirem; exporta flag `isSupabaseConfigured`.
- `src/services/courseService.ts`: busca cursos e modulos do Supabase com fallback automatico para `src/data/courses.ts`.
- `src/services/enrollmentService.ts`: persiste matriculas e progresso na tabela `enrollments` (Supabase) ou em `localStorage` no modo estatico.
- `src/services/authService.ts`: wrapper de `supabase.auth` (`signInWithPassword`, `signUp`, `signOut`, `getSession`) com modo visitante local.
- `supabase/schema.sql` e `supabase/seed.sql`: schema relacional completo com RLS policies e insert das 26 trilhas e seus 90 cursos/modulos.

## 4. Deploy no GitHub Pages via GitHub Actions
- `next.config.ts` com `output: 'export'`, `trailingSlash: true`, `images: { unoptimized: true }` e `basePath` controlado por `NEXT_PUBLIC_BASE_PATH` (`/Projeto-Cursos-EAD` no workflow).
- Helper `assetPath()` em `src/lib/assets.ts` para garantir caminhos de imagens validos em local e no subcaminho do GitHub Pages.
- Workflow `.github/workflows/deploy.yml` disparado em push para `main` e `workflow_dispatch`, construindo `./out` e publicando com `actions/deploy-pages@v4`.
