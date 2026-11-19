# Cursos EAD

E-commerce de trilhas técnicas de desenvolvimento de software, web, back-end, dados, nuvem, IA generativa e vibe coding baseado nas **25 trilhas técnicas do Núcleo de Projetos (NP)** (92 cursos e 564 horas).

Construído com **Next.js (App Router + exportação estática)**, **TypeScript**, **Tailwind CSS v4**, **Motion**, **Phosphor Icons** e camada de integração pronta para **Supabase** e publicação automática no **GitHub Pages** via **GitHub Actions**.

## Principais Recursos

- **Modo Claro e Modo Escuro** calibrados em tokens **OKLCH**, sem flash no carregamento e respeitando a preferência do sistema.
- **Catálogo completo (25 trilhas, 92 cursos, 564 horas)** com busca instantânea, filtro por 6 categorias, filtro de nível, filtro somente promoções e ordenação.
- **Precificação completa de loja:** valores de **R$ 50,00 a R$ 250,00**, com ofertas em **R$ 49,99**, **R$ 249,99** e cupons funcionais no carrinho (`CP2EJR10`, `VIBE15`, `INATEL20`).
- **Ementa detalhada módulo a módulo:** cada trilha exibe todos os seus cursos com cargas horárias individuais que fecham exatamente o total da trilha.
- **Carrinho lateral + Checkout de Matrícula + Área Minhas Matrículas** com acompanhamento interativo de módulos concluídos.
- **Avaliações de alunos e FAQ interativo** em accordion.
- **Página Sobre Mim (`/sobre/`)** com retrato oficial e trajetória completa do GitHub `XkrulesVitor`.
- **Pronto para Supabase:** roda 100% estático no GitHub Pages por padrão (`localStorage`) e ativa **Supabase Auth + PostgreSQL** automaticamente assim que as variáveis públicas forem configuradas.

## Como rodar localmente

```bash
npm install
npm run validate:catalog
npm run dev
```

Acesse `http://localhost:3000`.

Para gerar a exportação estática (`./out`):

```bash
npm run build
```

## Como conectar ao Supabase (100% opcional)

1. Crie um projeto gratuito em [supabase.com](https://supabase.com).
2. Abra o **SQL Editor** do painel e execute primeiro [supabase/schema.sql](supabase/schema.sql) e depois [supabase/seed.sql](supabase/seed.sql).
3. Copie `.env.example` para `.env.local` e preencha:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Para ativar também em produção no GitHub Pages, adicione essas mesmas duas chaves em **Settings > Secrets and variables > Actions** no repositório.

## Deploy no GitHub Pages (GitHub Actions)

O workflow [.github/workflows/deploy.yml](.github/workflows/deploy.yml) já está configurado para o repositório `https://github.com/XkrulesVitor/Projeto-Cursos-EAD` com `NEXT_PUBLIC_BASE_PATH=/Projeto-Cursos-EAD`.

Para deixar no ar após o push na branch `main`:
1. Abra **Settings > Pages** no repositório no GitHub.
2. Em **Build and deployment > Source**, selecione **GitHub Actions**.
3. O site ficará publicado em `https://xkrulesvitor.github.io/Projeto-Cursos-EAD/`.
