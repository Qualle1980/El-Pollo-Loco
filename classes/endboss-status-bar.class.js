import { StatusBar } from './status-bar.class.js';
import { ImageHelper } from '../helper_classes/image-helper.js';

/**
 * Represents the endboss health status bar.
 * @class
 */
export class EndbossStatusBar extends StatusBar {

    x = 480;
    y = 34;
    IMAGES = ImageHelper.STATUSBAR.endbossBlue;

    /**
     * Creates the endboss health bar and starts it full.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.setPercentage(100);
    }

}
