import randomNameGenerator from './randomNameGenerator';
import playerBlueprintsForNames from './playerBlueprintsForNames.json';

describe('randomNameGenerator', () => {
  it('should generate a name with a base name from the firstName array', () => {
    const positionId = 'goblinBruiser';
    const generatedName = randomNameGenerator(positionId);

    const nameData = playerBlueprintsForNames[positionId];
    const [firstName] = generatedName.split(' ');

    expect(nameData.firstName).toContain(firstName);
  });

  it('should generate a name with a surname from the secondName array', () => {
    const positionId = 'goblinBruiser';
    const generatedName = randomNameGenerator(positionId);

    const nameData = playerBlueprintsForNames[positionId];
    const nameParts = generatedName.split(' ');

    if (nameParts.length > 1) {
      const secondName = nameParts[1];
      expect(nameData.secondName).toContain(secondName);
    }
  });

  it('should generate different names for different positions', () => {
    const goblinName = randomNameGenerator('goblinBruiser');
    const orcName = randomNameGenerator('blackOrc');

    expect(goblinName).not.toEqual(orcName);
  });

  it('should generate names consistently within a range of outcomes', () => {
    const positionId = 'goblinBruiser';
    const generatedNames = new Set();

    for (let i = 0; i < 100; i++) {
      generatedNames.add(randomNameGenerator(positionId));
    }

    expect(generatedNames.size).toBeGreaterThan(1);
  });
});
