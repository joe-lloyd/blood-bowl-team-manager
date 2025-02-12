interface Match {
  home: string;
  away: string;
}

const roundRobin = (
  elements: string[],
  numberOfIterations: number
): Match[] => {
  const matches = elements.reduce<Match[]>((matches, team, index): Match[] => {
    let counter = 0;
    let currentTeamMatches: Match[] = [];
    while (counter < numberOfIterations) {
      counter++;

      currentTeamMatches = [
        ...currentTeamMatches,
        ...(elements
          .map((awayTeam, i) => {
            if (i === index) return null;
            return { home: team, away: awayTeam };
          })
          .filter(Boolean) as Match[]),
      ];
    }
    return [...matches, ...currentTeamMatches];
  }, []);

  return shuffleArray(matches);
};

/**
 * Be Careful, array mutation.
 */
const shuffleArray = (array: Match[]): Match[] => {
  for (let i = array.length - 1; i >= 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }

  return array;
};

export { roundRobin };
