import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const urlService = {
  // Crear una URL corta
  createShortUrl: async (originalUrl) => {
    const response = await api.post('/api/urls', { originalUrl });
    return response.data;
  },

  // Obtener estadísticas de una URL corta
  getUrlStats: async (shortCode) => {
    const response = await api.get(`/api/urls/${shortCode}`);
    return response.data;
  },

  // Eliminar una URL corta
  deleteUrl: async (shortCode) => {
    await api.delete(`/api/urls/${shortCode}`);
  },

  // Extraer el shortCode de una URL completa
  extractShortCode: (shortUrl) => {
    const parts = shortUrl.split('/');
    return parts[parts.length - 1];
  },
};

export default api;
