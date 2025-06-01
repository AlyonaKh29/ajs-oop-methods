import { Character } from '../Character';

const validNames = [
    { name: 'Dana', type: 'Swordsman' },
    { name: 'Masha', type: 'Magician' },
    { name: 'Vova', type: 'Bowerman' },
];

const invalidNames = [
    { name: 'A', errorMessage: 'Invalid character name length' },
    { name: 'Abcdefghijk', errorMessage: 'Invalid character name length' },
    { name: 12, errorMessage: 'Invalid character name length' },
];

const invalidTypes = [
    { type: 'KonVPalto', errorMessage: 'There is no such character' },
    { type: '', errorMessage: 'There is no such character' },
];

describe('Tests for the Character class', () => {
    test.each(validNames)(
        'create an instance with valid data %o',
        ({ name, type }) => {
            const char = new Character(name, type);
            expect(char.health).toBe(100);
            expect(char.level).toBe(1);
        }
    );

    test.each(invalidNames)(
        'create instance with invalid name "%s"',
        ({ name, errorMessage }) => {
            expect(() => new Character(name, 'Swordsman')).toThrow(errorMessage);
        }
    );

    test.each(invalidTypes)(
        'create instance with invalid type "%s"',
        ({ type, errorMessage }) => {
            expect(() => new Character('ValidName', type)).toThrow(errorMessage);
        }
    );
});

const validCharacters = [
    {
        testHealth: 50,
        testLevel: 1,
        testAttack: 100,
        testDefence: 50,
        description: 'character with health > 0',
    },
    {
        testHealth: 100,
        testLevel: 5,
        testAttack: 150,
        testDefence: 70,
        description: 'character with max health',
    },
];

describe('Tests for the levelUp() method', () => {
    test.each(validCharacters)('should level up a $description', ({
        testHealth,
        testLevel,
        testAttack,
        testDefence,
    }) => {
        const instance = new Character('Marishka', 'Swordsman');
        instance.health = testHealth;
        instance.level = testLevel;
        instance.attack = testAttack;
        instance.defence = testDefence;

        instance.levelUp();

        expect(instance.level).toBe(testLevel + 1);
        expect(instance.health).toBe(100);
        expect(instance.attack).toBeCloseTo(testAttack * 1.2);
        expect(instance.defence).toBeCloseTo(testDefence * 1.2);
    });
});

describe('Tests for the levelUp() method for dead character', () => {
    test('should throw error when trying to level up a dead character', () => {
        const instance = new Character('Lyoha', 'Zombie');
        instance.health = 0;
        instance.level = 3;
        instance.attack = 120;
        instance.defence = 60;
        expect(() => instance.levelUp()).toThrow('If a character dies, it is impossible to increase its level');
    });
});

const damageScenarios = [
    {
        description: 'damage less than current health with high defence',
        startHealth: 100,
        defence: 50,
        damagePoints: 40,
        expectedHealth: 80,
    },
    {
        description: 'damage equal to current health',
        startHealth: 16,
        defence: 20,
        damagePoints: 20,
        expectedHealth: 0,
    },
    {
        description: 'damage greater than current health, should set health to zero',
        startHealth: 30,
        defence: 10,
        damagePoints: 100,
        expectedHealth: 0,
    },
];

describe('Tests for the damage() method', () => {
    test.each(damageScenarios)('$description', ({ startHealth, defence, damagePoints, expectedHealth }) => {
        const instance = new Character('Sportsman', 'Magician');
        instance.health = startHealth;
        instance.defence = defence;

        if (startHealth === 0) {
            expect(() => instance.damage(damagePoints)).toThrow('Critical failure. Died.');
        } else {
            instance.damage(damagePoints);
            expect(instance.health).toBeCloseTo(expectedHealth);
        }
    });
});

describe('Tests for the damage() method for dead character', () => {
    test('should throw error when dead character takes damage', () => {
        const instance = new Character('Kartoha', 'Zombie');
        instance.health = 0;
        expect(() => instance.damage(50)).toThrow('Critical failure. Died.');
    });
});
