import type { StudentType } from "../../types";

export interface UpdateFormTypes {
  onClose: () => void;
  studentData: () => StudentType;
  loading?: boolean;
  setLoading: (arg: boolean) => void;
  clearSelectedStudent: () => void;
}
