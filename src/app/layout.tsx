import type { Metadata } from "next";
import "@fontsource/bricolage-grotesque/600.css";
import "@fontsource/bricolage-grotesque/700.css";
import "@fontsource/bricolage-grotesque/800.css";
import "@fontsource/figtree/400.css";
import "@fontsource/figtree/500.css";
import "@fontsource/figtree/600.css";
import "@fontsource/figtree/700.css";
import "@fontsource/jetbrains-mono/500.css";
import "@fontsource/jetbrains-mono/600.css";
import { AppShell } from "@/components/layout/AppShell";
import { StoreProvider } from "@/context/StoreContext";
import { ThemeProvider } from "@/context/ThemeContext";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cursos EAD | Trilhas de Engenharia de Software, Web, Back-End e IA",
  description:
    "Loja de trilhas de capacitação técnica do Núcleo de Projetos: 25 trilhas, 92 cursos e 564 horas em Web, Back-End, Software, Dados, Cloud e Vibe Coding.",
};

// Script inline para evitar flash de tema claro/escuro antes da hidratacao React
const themeInitScript = `
(function() {
  try {
    var saved = localStorage.getItem('cursos_ead_theme_v1');
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (saved === 'dark' || (!saved && prefersDark)) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-dvh antialiased">
        <ThemeProvider>
          <StoreProvider>
            <AppShell>{children}</AppShell>
          </StoreProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
