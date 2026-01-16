import axios from "axios";

// 환경 변수로 백엔드 주소 가져오기
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // docker-compose에서 설정한 VITE_API_URL
  timeout: 5000, // 5초 타임아웃
});

// 요청 전 interceptor: 토큰이 있으면 Authorization 헤더 자동 추가
api.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("token"); // 로컬스토리지에서 토큰 가져오기
    if (token && config.headers) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
