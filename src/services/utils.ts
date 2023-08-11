export const getFirstName = (displayName: string) => {
  const names: string[] = displayName.split(" ");
  return names[0] || "";
};

export const getLastName = (displayName: string) => {
  const names: string[] = displayName.split(" ");
  if (names.length > 4) {
    return names[names.length - 3];
  } else {
    if (names[names.length - 1].includes("(")) {
      return names[names.length - 2];
    }
    return names[names.length - 1];
  }
};
