class Character extends MovableObject {
    x = 120;
    y = 180;
    width = 100;
    height = 250;

    constructor() {
        super();
        this.loadImage('./assets/img/2_character_pepe/2_walk/W-21.png');
    }
}
