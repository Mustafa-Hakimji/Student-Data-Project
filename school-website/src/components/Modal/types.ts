import type { ReactNode } from "react";

export interface ModalType {
  open: boolean;
  onClose?: () => void;
  setOpen: (arg: boolean) => void;
  children: ReactNode;
}
