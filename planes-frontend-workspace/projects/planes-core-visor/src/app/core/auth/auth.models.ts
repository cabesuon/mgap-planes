export const AUTH_KEY = 'AUTH';

export interface AuthState {
  token: string;
  personaId: string;
  isLoading?: boolean;
  error?: string | null;
}

export interface AuthLoginResult {
  personaId: string;
  token: string;
}

export interface GetTokensResult {
  success: boolean;
  error: { code: number; description: string };
  personasId: string[];
}
