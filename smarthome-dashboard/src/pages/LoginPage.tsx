// src/pages/LoginPage.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../lib/api";
import { useAlert } from "../hooks/useAlert";

export default function LoginPage() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Alert 훅
  const successAlert = useAlert({
    icon: "success",
    title: "로그인 성공",
    text: "대시보드로 이동합니다.",
  });

  const errorAlert = useAlert({
    icon: "error",
    title: "로그인 실패",
    text: "아이디 또는 비밀번호를 다시 확인해주세요.",
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await api.post("/api/auth/login", {
        username,
        password,
      });

      const token = response.data.token;

      if (!token) {
        errorAlert.open();
        return;
      }

      // 로그인 성공 시 토큰 저장
      sessionStorage.setItem("token", token);

      // Swal 확인 후 navigate
      successAlert.open(() => {
        setTimeout(() => navigate("/dashboard"), 50); // 브라우저 알림과 충돌 방지
      });
    } catch (err) {
      console.error("로그인 실패:", err);
      errorAlert.open();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">로그인</h2>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          {/* 브라우저 로그인 자동완성용 숨겨진 dummy input */}
          <input
            type="text"
            style={{ display: "none" }}
            autoComplete="username"
            name="username_dummy"
          />
          <input
            type="password"
            style={{ display: "none" }}
            autoComplete="current-password"
            name="password_dummy"
          />

          {/* 실제 사용자 입력 필드 */}
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border rounded p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
            autoComplete="username"
            name="username_real"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border rounded p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
            autoComplete="current-password"
            name="password_real"
          />

          <button
            type="submit"
            className="bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition"
          >
            로그인
          </button>
        </form>

        <p className="mt-4 text-center text-sm">
          계정이 없나요?{" "}
          <a
            href="/signup"
            className="text-indigo-600 hover:underline cursor-pointer"
          >
            회원가입
          </a>
        </p>
      </div>
    </div>
  );
}
