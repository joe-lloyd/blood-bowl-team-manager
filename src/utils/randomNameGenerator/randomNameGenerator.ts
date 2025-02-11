import playerBlueprintsForNames from './playerBlueprintsForNames.json';
const getRandomElement = (arr: string[]) =>
  arr[Math.floor(Math.random() * arr.length)];

interface PlayerBlueprintsForNames {
  [key: string]: {
    positionName: string;
    primary: string;
    firstName: string[];
    secondName: string[];
  };
}

const generateRandomName = (positionId: string): string => {
  const nameParts = [];

  const nameData = (playerBlueprintsForNames as PlayerBlueprintsForNames)[
    positionId
  ];

  const baseName = getRandomElement(nameData.firstName);
  nameParts.push(baseName);

  if (Math.random() < 0.9) {
    nameParts.push(getRandomElement(nameData.secondName));
  }

  return nameParts.join(' ');
};

export default generateRandomName;
