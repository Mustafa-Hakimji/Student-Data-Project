export const baseUrl = `http://localhost:4000`;

export const API_URL = {
  teachers: `${baseUrl}/teachers`,
  teachersLogin: `${baseUrl}/teachers/login`,
  teachersByName: (name: string) => `${baseUrl}/teachers/${name}`,
  students: `${baseUrl}/students`,
  promoteStudent: `${baseUrl}/students/promote`,
  attendence: `${baseUrl}/students/attendence`,
  attendenceBulk: `${baseUrl}/students/attendence/bulk`,
  studentsByName: (name: string) => `${baseUrl}/students/${name}`,
  classes: `${baseUrl}/classes`,
};
