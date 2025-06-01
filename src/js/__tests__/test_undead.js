import { Undead } from '../Undead';

const validNames = ['Natasha', 'Daniella', 'Galya'];

const invalidNames = [
    { name: 'A', errorMessage: 'Invalid character name length' },
    { name: 'Abcdefghijk', errorMessage: 'Invalid character name length' },
    { name: 12, errorMessage: 'Invalid character name length' },
];

describe('Undead class - data-driven tests', () => {
    test.each(validNames)('should create Undead with valid name "%s"', (name) => {
        const undead = new Undead(name);
        expect(undead.name).toBe(name);
        expect(undead.type).toBe('Undead');
        expect(undead.health).toBe(100);
        expect(undead.level).toBe(1);
        expect(undead.attack).toBe(25);
        expect(undead.defence).toBe(25);
    });

    test.each(invalidNames)(
        'should throw error for invalid undead name "%s"',
        ({ name, errorMessage }) => {
            expect(() => new Undead(name)).toThrow(errorMessage);
        }
    );
});

