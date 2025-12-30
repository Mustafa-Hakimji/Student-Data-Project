export const getClassById = (id: string, data: any[]) => {
  for (let standard of data) {
    if (standard?._id === id) {
      return standard;
    }
  }
};

export const validateNumbers = (number: number, length: number) => {
  const noStr = number?.toString();

  if (noStr?.length === length) {
    for (let i = 0; i < length; i++) {
      if (isNaN(parseInt(noStr[i]))) {
        return false;
      }
    }
    return true;
  }

  return false;
};

export const generateRandomNumbers = (value: number) => {
  return Math.round(Math.random() * value);
};
