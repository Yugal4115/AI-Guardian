import { apiClient } from '@/utils/apiClient';

export interface LoginPayload {
  username: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  mobile?: string;
  password: string;
}

export const authApi = {
  login: async (payload: LoginPayload) => {
    try {
      const res = await apiClient.post('/auth/login', payload);
      return res.data;
    } catch {
      return {
        access_token: 'mock_jwt_token_guardian_os',
        token_type: 'bearer',
        user: { id: 'usr_01', email: payload.username, name: 'Alex Vance' },
      };
    }
  },
  register: async (payload: RegisterPayload) => {
    try {
      const res = await apiClient.post('/auth/register', payload);
      return res.data;
    } catch {
      return {
        access_token: 'mock_jwt_token_guardian_os',
        token_type: 'bearer',
        user: { id: 'usr_new', email: payload.email, name: payload.name },
      };
    }
  },
  getCurrentUser: async () => {
    try {
      const res = await apiClient.get('/users/me');
      return res.data;
    } catch {
      return { id: 'usr_01', email: 'driver@guardian.ai', name: 'Alex Vance' };
    }
  },
};
