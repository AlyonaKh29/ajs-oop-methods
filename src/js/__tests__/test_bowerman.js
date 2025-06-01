import { Bowerman } from '../Bowerman';

const validNames = ['Natasha', 'Daniella', 'Galya'];

const invalidNames = [
    { name: 'A', errorMessage: 'Invalid character name length' },
    { name: 'Abcdefghijk', errorMessage: 'Invalid character name length' },
    { name: 12, errorMessage: 'Invalid character name length' },
];

describe('Bowerman class - data-driven tests', () => {
    test.each(validNames)('should create Bowerman with valid name "%s"', (name) => {
        const bowerman = new Bowerman(name);
        expect(bowerman.name).toBe(name);
        expect(bowerman.type).toBe('Bowerman');
        expect(bowerman.health).toBe(100);
        expect(bowerman.level).toBe(1);
        expect(bowerman.attack).toBe(25);
        expect(bowerman.defence).toBe(25);
    });

    test.each(invalidNames)(
        'should throw error for invalid bowerman name "%s"',
        ({ name, errorMessage }) => {
            expect(() => new Bowerman(name)).toThrow(errorMessage);
        }
    );
});
