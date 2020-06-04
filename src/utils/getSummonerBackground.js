export const getChampionId = (backgroundId) => {
  // 1. Transform id into a string
  const backgroundIdString = backgroundId.toString();

  // 2. Base on the length get champion id
  switch (backgroundIdString.length) {
    case 6:
      return backgroundIdString.substr(0, 3);
    case 5:
      return backgroundIdString.substr(0, 2);
    case 4:
      return backgroundIdString.substr(0, 1);
    default:
      return backgroundIdString;
  }
};

export const getSkinId = (backgroundId) => {
  // 1. Transform id into a string
  const backgroundIdString = backgroundId.toString();

  // 2. Base on the length get skin id
  switch (backgroundIdString.length) {
    case 6:
      return backgroundIdString.substr(3, 3);
    case 5:
      return backgroundIdString.substr(2, 3);
    case 4:
      return backgroundIdString.substr(1, 3);
    default:
      return backgroundIdString;
  }
};
