class SmallChicken extends Chicken {
    // #region properties

    y = 370;
    width = 50;
    height = 50;
    offset = {
        top: 5,
        right: 5,
        bottom: 5,
        left: 5
    };
    IMAGES_WALKING = [
        './assets/img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        './assets/img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        './assets/img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];
    IMAGE_DEAD = './assets/img/3_enemies_chicken/chicken_small/2_dead/dead.png';

    // #endregion

    // #region constructor

    // Creates a small chicken and loads its own images.
    constructor(position = 0) {
        super(position);
        this.loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.addImageToCache(this.IMAGE_DEAD);
    }

    // #endregion
}
