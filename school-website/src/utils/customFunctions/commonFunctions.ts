export const getClassById = (id: string, data: any[]) => {
  for (let standard of data) {
    if (standard?._id === id) {
      return standard;
    }
  }
};
