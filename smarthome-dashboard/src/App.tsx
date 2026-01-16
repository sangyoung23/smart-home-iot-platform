import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";

// 토큰 체크 함수
const isLoggedIn = () => !!sessionStorage.getItem("token");

function App() {
  return (
    <Router>
      <Routes>
        {/* 로그인하지 않았으면 대시보드 접근 불가 */}
        <Route
          path="/"
          element={
            isLoggedIn() ? (
              <AppLayout>
                <DashboardPage />
              </AppLayout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        {/* 로그인 페이지 */}
        <Route
          path="/login"
          element={isLoggedIn() ? <Navigate to="/" replace /> : <LoginPage />}
        />
        {/* 회원가입 페이지 */}
        <Route
          path="/signup"
          element={isLoggedIn() ? <Navigate to="/" replace /> : <SignupPage />}
        />
        {/* 그 외 경로는 로그인 페이지로 리다이렉트 */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
