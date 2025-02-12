import { roundRobin } from './roundRobin';
import seedrandom from 'seedrandom';

// @ts-ignore
const seed = seedrandom('my_seed_value');

// this line is important, it makes sure the seed is initialized
console.log(seed());

describe('generateRoundRobin', () => {
  beforeEach(() => {
    // @ts-ignore
    global.Math.random = seed;
  });

  it('should take an array of objects and round robin them', function () {
    const elements = ['goblin', 'dwarf', 'elf', 'human'];
    const numberOfIterations = 1;
    const result = roundRobin(elements, numberOfIterations);
    expect(result).toEqual([
      { home: 'goblin', away: 'elf' },
      { home: 'elf', away: 'goblin' },
      { home: 'human', away: 'dwarf' },
      { home: 'dwarf', away: 'elf' },
      { home: 'elf', away: 'human' },
      { home: 'dwarf', away: 'human' },
      { home: 'goblin', away: 'human' },
      { home: 'human', away: 'goblin' },
      { home: 'elf', away: 'dwarf' },
      { home: 'dwarf', away: 'goblin' },
      { home: 'goblin', away: 'dwarf' },
      { home: 'human', away: 'elf' },
    ]);
  });

  it('should take an array of objects and round robin them with 2 iterations', function () {
    const elements = ['goblin', 'dwarf', 'elf', 'human'];
    const numberOfIterations = 2;
    const result = roundRobin(elements, numberOfIterations);
    expect(result).toEqual([
      { home: 'dwarf', away: 'goblin' },
      { home: 'human', away: 'elf' },
      { home: 'human', away: 'elf' },
      { home: 'human', away: 'dwarf' },
      { home: 'dwarf', away: 'elf' },
      { home: 'dwarf', away: 'goblin' },
      { home: 'dwarf', away: 'human' },
      { home: 'goblin', away: 'elf' },
      { home: 'human', away: 'dwarf' },
      { home: 'dwarf', away: 'elf' },
      { home: 'elf', away: 'goblin' },
      { home: 'goblin', away: 'elf' },
      { home: 'elf', away: 'dwarf' },
      { home: 'goblin', away: 'human' },
      { home: 'human', away: 'goblin' },
      { home: 'dwarf', away: 'human' },
      { home: 'elf', away: 'human' },
      { home: 'elf', away: 'goblin' },
      { home: 'goblin', away: 'dwarf' },
      { home: 'elf', away: 'human' },
      { home: 'goblin', away: 'human' },
      { home: 'elf', away: 'dwarf' },
      { home: 'human', away: 'goblin' },
      { home: 'goblin', away: 'dwarf' },
    ]);
  });
});
