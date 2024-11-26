import axios from 'axios';

// Funkcja do pobierania tokenu z localStorage
const getUser = () => {
  return JSON.parse(localStorage.getItem('user'))
};

// Tworzymy instancję axios z globalnymi ustawieniami
const axiosInstance = axios.create({
  baseURL: '/api/workouts'
});

// Ustawiamy token w nagłówkach dla każdej wysyłanej prośby, do tego posłuży interceptor z Axiosa
axiosInstance.interceptors.request.use(
  (config) => {
    const user = getUser();
    if (user && user.token) {
      config.headers['Authorization'] = `Bearer ${user.token}`; // Dodajemy token do nagłówków
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;