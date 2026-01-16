/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  // 다른 VITE_ 환경 변수도 여기 추가 가능
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
