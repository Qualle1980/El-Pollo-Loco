import { StatusBar } from './status-bar.class.js';
import { ImageHelper } from '../helper_classes/image-helper.js';

export class EndbossStatusBar extends StatusBar {
    // #region properties

    x = 480;
    y = 20;
    IMAGES = ImageHelper.STATUSBAR.endbossBlue;

    // #endregion

    // #region constructor

    // Creates the endboss health bar and starts it full.
    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.setPercentage(100);
    }

    // #endregion
}
