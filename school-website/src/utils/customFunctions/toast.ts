import { Slide, toast } from "react-toastify";

export const ToastPosition = {
  topCenter: "top-center",
  topRight: "top-right",
  topLeft: "top-left",
  bottomCenter: "bottom-center",
  bottomRight: "bottom-right",
  bottomLeft: "bottom-left",
} as const;

export type ToastConfig = {
  text?: string;
  position?: ToastPosition;
  autoClose?: number;
  hideProgressBar?: boolean;
  theme?: "light" | "dark" | "colored";
};

export type ToastPosition = (typeof ToastPosition)[keyof typeof ToastPosition];

export const showToast = ({
  text = "",
  position = ToastPosition.topCenter,
  autoClose = 3000,
  hideProgressBar = false,
  theme = "dark",
}: ToastConfig) => {
  const toasConfig = {
    position,
    autoClose,
    hideProgressBar,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme,
    transition: Slide,
  };

  return toast(text, toasConfig);
};
