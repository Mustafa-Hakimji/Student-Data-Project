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

export const capitaliseFirst = (char: string) => {
  if (char.length > 0) {
    let capitalise = "";
    for (let i = 0; i < char.length; i++) {
      if (i === 0) {
        capitalise += char[i]?.split("")[0].toUpperCase();
      } else {
        capitalise += char[i];
      }
    }
    return capitalise;
  }
  return char;
};
