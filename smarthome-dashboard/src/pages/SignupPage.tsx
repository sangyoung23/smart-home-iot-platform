import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../lib/api";

export default function SignupPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      await api.post("/api/auth/register", { username, password });

      // 성공 메시지 표시
      setSuccess("회원가입 성공! 로그인 페이지로 이동합니다...");

      // 1초 뒤 로그인 페이지로 이동
      setTimeout(() => navigate("/login"), 1000);
    } catch (err: any) {
      setError(err.response?.data?.message || "회원가입 실패");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">회원가입</h2>

        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">{success}</p>}

        <form onSubmit={handleSignup} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border rounded p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border rounded p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
          <button
            type="submit"
            className="bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition"
          >
            회원가입
          </button>
        </form>

        <p className="mt-4 text-center text-sm">
          이미 계정이 있나요?{" "}
          <a href="/login" className="text-indigo-600 hover:underline">
            로그인
          </a>
        </p>
      </div>
    </div>
  );
}
