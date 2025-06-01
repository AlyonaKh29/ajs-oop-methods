export class Character {
    constructor(name, type) {
        const types = ['Bowerman', 'Swordsman', 'Magician', 'Daemon', 'Undead', 'Zombie'];
        if (typeof name !== 'string' || name.length < 2 || name.length > 10) {
            throw new Error('Invalid character name length');
        }
        if (!types.includes(type)) {
            throw new Error('There is no such character')
        }
        this.name = name;
        this.type = type;
        this.health = 100;
        this.level = 1;
    }

    levelUp() {
        if (this.health === 0) {
            throw new Error ('If a character dies, it is impossible to increase its level');
        }
        this.level += 1;
        this.attack += this.attack * 0.2;
        this.defence += this.defence * 0.2;
        this.health = 100;
    }

    damage(points) {
        if (this.health === 0) {
            throw new Error ('Critical failure. Died.');
        }
        let damage_points = points * (1 - this.defence / 100)
        if (this.health < damage_points) {
            this.health = 0;
        } else {
            this.health -= damage_points;
        }
        
    }
}
