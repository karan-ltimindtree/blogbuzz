export interface AuthState {
  loggedIn: boolean;
  accessToken: string;
  user: {
    name: string;
    email: string;
    id: string;
  } | null;
  status: 'idle' | 'loading' | 'failed';
  initals: string;
}
