import { Swordsman } from '../Swordsman';

const validNames = ['Natasha', 'Daniella', 'Galya'];

const invalidNames = [
    { name: 'A', errorMessage: 'Invalid character name length' },
    { name: 'Abcdefghijk', errorMessage: 'Invalid character name length' },
    { name: 12, errorMessage: 'Invalid character name length' },
];

describe('Swordsman class - data-driven tests', () => {
    test.each(validNames)('should create Swordsman with valid name "%s"', (name) => {
        const swordsman = new Swordsman(name);
        expect(swordsman.name).toBe(name);
        expect(swordsman.type).toBe('Swordsman');
        expect(swordsman.health).toBe(100);
        expect(swordsman.level).toBe(1);
        expect(swordsman.attack).toBe(40);
        expect(swordsman.defence).toBe(10);
    });

    test.each(invalidNames)(
        'should throw error for invalid swordsman name "%s"',
        ({ name, errorMessage }) => {
            expect(() => new Swordsman(name)).toThrow(errorMessage);
        }
    );
});
