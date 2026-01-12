export interface StudentType {
  _id: string;
  firstName: string;
  lastName: string;
  rollNumber: string;
  adhaar: string;
  sssm: string;
  attendance: string;
  class: string;
  stream: string;
  feesAmount: number;
  pendingFees: number;
  fathersName: string;
  mothersName: string;
  mobileNumberFather: number;
  mobileNumberMother: number;
  bankAccountNumber: number;
  ifscCode: string;
  achievements: string;
  reportCards: string[];
  createdBy: string;
  createdAt: string;
}

export interface ClassesType {
  _id: string;
  name: string;
  teacher: string;
  fees: number;
  subjects: string[];
  busFees: number;
  students: StudentType[];
}

export interface StudentTableProps {
  data?: StudentType[];
  setFilters?: (arg: string, arg2: string) => void;
  classes?: ClassesType[];
  setSelectedStudents?: (arg: []) => void;
  selectedStudents?: string[];
  handleDeleteAcion?: () => void;
  actionType?: ActionsTypes;
  handleClick?: () => void;
  handleUpdateClick?: (arg: StudentType) => void;
  updateSelectedStudent?: (arg: string) => void;
  handleButtonClick?: () => void;
  loading?: boolean;
}

export const ActionsTypes = {
  view: "view",
  add: "add",
  delete: "delete",
  update: "update",
  promote: "promote",
} as const;

export type ActionsTypes = (typeof ActionsTypes)[keyof typeof ActionsTypes];
