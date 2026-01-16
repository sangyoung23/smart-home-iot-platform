// src/hooks/useAlert.ts
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { AlertType } from "../types/alert.type";

export const useAlert = ({ icon, title, text }: AlertType) => {
  const MySwal = withReactContent(Swal);

  // 단순 확인용 팝업
  function open(callback?: () => void) {
    MySwal.fire({
      icon: icon,
      title: title,
      html: text, // HTML 렌더링 가능
      confirmButtonText: "확인",
      confirmButtonColor: "#429f50",
      allowOutsideClick: false,
      allowEscapeKey: false,
      focusConfirm: true,
    }).then(() => {
      if (callback) callback();
    });
  }

  // 확인/취소 팝업
  function confirm(callback?: () => void): Promise<any> {
    return MySwal.fire({
      icon: icon,
      title: title,
      html: text,
      showCancelButton: true,
      confirmButtonText: "예",
      cancelButtonText: "아니오",
      confirmButtonColor: "#429f50",
      cancelButtonColor: "#d33",
      allowOutsideClick: false,
      allowEscapeKey: false,
      focusConfirm: true,
    }).then((result) => {
      // 🔹 여기서 반드시 확인된 경우만 callback 호출
      if (result.isConfirmed) {
        if (callback) callback();
      }
    });
  }

  return {
    open,
    confirm,
  };
};
