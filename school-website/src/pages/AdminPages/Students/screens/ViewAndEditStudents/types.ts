export const filterOptions = [
  { value: "First Name", title: "firstName" },
  { value: "Last Name", title: "lastName" },
  { value: "Roll No.", title: "roll" },
  { value: "Adhaar", title: "adhaar" },
  { value: "Father", title: "father" },
  { value: "Mother", title: "mother" },
  { value: "SSSM", title: "sssm" },
  { value: "Pending Fees", title: "pendingFees" },
];

export interface StudentFilterType {
  standard: string;
  firstName: string;
  lastName: string;
  roll: string;
  adhaar: string;
  father: string;
  mother: string;
  sssm: string;
  pendingFees: string;
}

export interface SelectedFilterType {
  title: StudentFilterType;
  value: string;
}
