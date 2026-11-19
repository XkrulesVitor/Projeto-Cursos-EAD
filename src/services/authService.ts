// Servico de autenticacao preparado para Supabase Auth com fallback demonstrativo local
import { getSupabaseClient } from "@/lib/supabase";
import type { UserProfile } from "@/types/course";

const LOCAL_USER_KEY = "cursos_ead_user_v1";

function readLocalUser(): UserProfile | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(LOCAL_USER_KEY);
    return raw ? (JSON.parse(raw) as UserProfile) : null;
  } catch {
    return null;
  }
}

function writeLocalUser(user: UserProfile | null): void {
  if (typeof window === "undefined") return;
  try {
    if (user) {
      window.localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(user));
    } else {
      window.localStorage.removeItem(LOCAL_USER_KEY);
    }
  } catch {
    // Ignora restricoes de armazenamento local
  }
}

export async function getCurrentUser(): Promise<UserProfile | null> {
  const client = getSupabaseClient();

  if (client) {
    try {
      const { data } = await client.auth.getUser();
      if (data.user) {
        return {
          id: data.user.id,
          email: data.user.email || "",
          name:
            String(data.user.user_metadata?.full_name || "") ||
            (data.user.email ? data.user.email.split("@")[0] : "Estudante"),
          mode: "supabase",
        };
      }
      return null;
    } catch {
      return readLocalUser();
    }
  }

  return readLocalUser();
}

export async function signInAccount(params: {
  email: string;
  password: string;
  name?: string;
  isSignUp?: boolean;
}): Promise<{ user: UserProfile | null; error?: string }> {
  const email = params.email.trim().toLowerCase();
  const displayName = params.name?.trim() || email.split("@")[0] || "Estudante";
  const client = getSupabaseClient();

  if (client) {
    try {
      if (params.isSignUp) {
        const { data, error } = await client.auth.signUp({
          email,
          password: params.password,
          options: { data: { full_name: displayName } },
        });
        if (error) return { user: null, error: error.message };
        if (!data.user) {
          return {
            user: null,
            error: "Verifique sua caixa de entrada para confirmar o cadastro.",
          };
        }
        return {
          user: {
            id: data.user.id,
            email: data.user.email || email,
            name: displayName,
            mode: "supabase",
          },
        };
      }

      const { data, error } = await client.auth.signInWithPassword({
        email,
        password: params.password,
      });
      if (error) return { user: null, error: error.message };
      if (!data.user) return { user: null, error: "Sessão não iniciada." };

      return {
        user: {
          id: data.user.id,
          email: data.user.email || email,
          name: String(data.user.user_metadata?.full_name || displayName),
          mode: "supabase",
        },
      };
    } catch {
      return { user: null, error: "Não foi possível conectar ao Supabase." };
    }
  }

  // Modo estatico local: cria perfil demonstrativo persistido no navegador
  const localUser: UserProfile = {
    id: `local-${email}`,
    email,
    name: displayName,
    mode: "local",
  };
  writeLocalUser(localUser);
  return { user: localUser };
}

export async function signOutAccount(): Promise<void> {
  const client = getSupabaseClient();
  if (client) {
    try {
      await client.auth.signOut();
    } catch {
      // Ignora erro de rede ao sair
    }
  }
  writeLocalUser(null);
}
