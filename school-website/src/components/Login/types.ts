export interface LoginType {
  onClose?: () => void;
  setOpen: (arg: boolean) => void;
}

export interface LoginUser {
  email: string;
  password: string;
  setLoading: (arg: boolean) => void;
}
