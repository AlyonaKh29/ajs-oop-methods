import { Magician } from '../Magician';

const validNames = ['Natasha', 'Daniella', 'Galya'];

const invalidNames = [
    { name: 'A', errorMessage: 'Invalid character name length' },
    { name: 'Abcdefghijk', errorMessage: 'Invalid character name length' },
    { name: 12, errorMessage: 'Invalid character name length' },
];

describe('Magician class - data-driven tests', () => {
    test.each(validNames)('should create Magician with valid name "%s"', (name) => {
        const magician = new Magician(name);
        expect(magician.name).toBe(name);
        expect(magician.type).toBe('Magician');
        expect(magician.health).toBe(100);
        expect(magician.level).toBe(1);
        expect(magician.attack).toBe(10);
        expect(magician.defence).toBe(40);
    });

    test.each(invalidNames)(
        'should throw error for invalid magician name "%s"',
        ({ name, errorMessage }) => {
            expect(() => new Magician(name)).toThrow(errorMessage);
        }
    );
});
