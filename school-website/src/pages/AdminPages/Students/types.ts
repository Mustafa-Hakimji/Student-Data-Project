export interface StudentType {
  _id: string;
  firstName: string;
  lastName: string;
  rollNumber: string;
  adhaar: number;
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
  data: StudentType[];
  setFilters: (arg: string, arg2: string) => void;
  classes: ClassesType[];
}
