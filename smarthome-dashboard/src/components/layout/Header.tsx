import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAlert } from "../../hooks/useAlert";

export default function Header() {
  const navigate = useNavigate();

  const logoutAlert = useAlert({
    icon: "warning",
    title: "로그아웃",
    text: "정말 로그아웃 하시겠습니까?",
  });

  const handleLogout = () => {
    logoutAlert.confirm(() => {
      sessionStorage.removeItem("token");
      setTimeout(() => navigate("/login"), 100);
    });
  };

  return (
    <header className="h-14 border-b bg-background flex items-center justify-between px-6">
      <h1 className="font-semibold">Dashboard</h1>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={handleLogout}
          className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-600 rounded-md cursor-pointer hover:text-red-500 hover:bg-red-50 active:scale-95 transition-all"
        >
          <LogOut className="w-5 h-5" />
          로그아웃
        </button>
      </div>
    </header>
  );
}
