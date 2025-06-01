import { Daemon } from '../Daemon';

const validNames = ['Natasha', 'Daniella', 'Galya'];

const invalidNames = [
    { name: 'A', errorMessage: 'Invalid character name length' },
    { name: 'Abcdefghijk', errorMessage: 'Invalid character name length' },
    { name: 12, errorMessage: 'Invalid character name length' },
];

describe('Daemon class - data-driven tests', () => {
    test.each(validNames)('should create Daemon with valid name "%s"', (name) => {
        const daemon = new Daemon(name);
        expect(daemon.name).toBe(name);
        expect(daemon.type).toBe('Daemon');
        expect(daemon.health).toBe(100);
        expect(daemon.level).toBe(1);
        expect(daemon.attack).toBe(10);
        expect(daemon.defence).toBe(40);
    });

    test.each(invalidNames)(
        'should throw error for invalid daemon name "%s"',
        ({ name, errorMessage }) => {
            expect(() => new Daemon(name)).toThrow(errorMessage);
        }
    );
});
