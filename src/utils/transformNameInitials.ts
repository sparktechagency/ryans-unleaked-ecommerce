export const transformNameInitials = (name?: string, firstName?: string, lastName?: string) => {
  if (!name && !firstName && !lastName) {
    return "";
  }

  if (firstName || lastName) {
    const firstInitial = firstName ? firstName.charAt(0).toUpperCase() : '';
    const lastInitial = lastName ? lastName.charAt(0).toUpperCase() : '';
    return firstInitial + lastInitial;
  }
  const nameArray = name?.split(" ") || [];
  const initials = nameArray.map((name) => name.charAt(0).toUpperCase())
    .join("");
  return initials;

};

export const firstLetterUppercase = (text: string) => {
  if (text) {
    const splitText = text?.split(" ");

    if (splitText.length > 1) {
      const uppercaseArray = splitText.map((text) => {
        return text[0].toUpperCase() + text.slice(1, text.length);
      });

      return uppercaseArray.join(" ");
    }

    return text[0].toUpperCase() + text.slice(1, text.length);
  }
};
