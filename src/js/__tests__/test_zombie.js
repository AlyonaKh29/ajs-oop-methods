import { Zombie } from '../Zombie';

const validNames = ['Natasha', 'Daniella', 'Galya'];

const invalidNames = [
    { name: 'A', errorMessage: 'Invalid character name length' },
    { name: 'Abcdefghijk', errorMessage: 'Invalid character name length' },
    { name: 12, errorMessage: 'Invalid character name length' },
];

describe('Zombie class - data-driven tests', () => {
    test.each(validNames)('should create Zombie with valid name "%s"', (name) => {
        const zombie = new Zombie(name);
        expect(zombie.name).toBe(name);
        expect(zombie.type).toBe('Zombie');
        expect(zombie.health).toBe(100);
        expect(zombie.level).toBe(1);
        expect(zombie.attack).toBe(40);
        expect(zombie.defence).toBe(10);
    });

    test.each(invalidNames)(
        'should throw error for invalid zombie name "%s"',
        ({ name, errorMessage }) => {
            expect(() => new Zombie(name)).toThrow(errorMessage);
        }
    );
});

