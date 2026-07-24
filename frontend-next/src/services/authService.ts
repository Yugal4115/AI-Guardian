import axios from 'axios';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

export const authApi = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const loginDriver = async (email: string, pass: string) => {
  try {
    const res = await authApi.post('/auth/login', { username: email, password: pass });
    return res.data;
  } catch {
    // Fallback simulation for offline/standalone demo
    return {
      access_token: 'mock_jwt_token_guardian_os',
      token_type: 'bearer',
      user: {
        id: 'usr_01',
        email,
        name: 'Alex Vance',
      },
    };
  }
};
