import { DrawableObject } from './drawable-object.class.js';
import { ImageHelper } from '../helper_classes/image-helper.js';

export class StatusBar extends DrawableObject {
    // #region properties

    x = 40;
    y = 20;
    width = 200;
    height = 60;
    percentage = 100;
    IMAGES = ImageHelper.STATUSBAR.healthBlue;

    // #endregion

    // #region constructor

    // Creates the health bar and loads its images.
    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.setPercentage(100);
    }

    // #endregion

    // #region percentage

    // Updates the health bar image by percentage.
    setPercentage(percentage) {
        this.percentage = percentage;
        const imagePath = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[imagePath];
    }

    // Resolves the matching image for the current percentage.
    resolveImageIndex() {
        if (this.percentage === 100) return 5;
        if (this.percentage > 80) return 4;
        if (this.percentage > 60) return 3;
        if (this.percentage > 40) return 2;
        if (this.percentage > 20) return 1;
        return 0;
    }

    // #endregion
}
