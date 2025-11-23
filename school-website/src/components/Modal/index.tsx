import type { ModalType } from "./types";
import "./styles.css";

const Modal = ({ open, children }: ModalType) => {
  if (!open) return null;

  return <div className="modal-overlay">{children}</div>;
};
export default Modal;
