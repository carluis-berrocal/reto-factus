import axios from 'axios';

let activeRequests = 0;
let updateLoading;

export const setupAxiosInterceptor = (setLoading) => {
  updateLoading = setLoading;

  axios.interceptors.request.use((config) => {
    // Solo excluye peticiones estáticas (opcional)
    if (!isStaticAsset(config.url)) {
      activeRequests++;
      updateLoading(true);
    }
    return config;
  });

  axios.interceptors.response.use(
    (response) => {
      finishRequest();
      return response;
    },
    (error) => {
      finishRequest();
      return Promise.reject(error);
    }
  );
};

function finishRequest() {
  activeRequests = Math.max(0, activeRequests - 1);
  if (activeRequests === 0) {
    updateLoading(false);
  }
}

function isStaticAsset(url) {
  // Excluye archivos CSS, JS, imágenes, etc.
  const staticExtensions = ['.css', '.js', '.png', '.jpg', '.jpeg', '.gif', '.svg'];
  return staticExtensions.some(ext => url.includes(ext));
}