import { StatusBar } from './status-bar.class.js';
import { ImageHelper } from '../helper_classes/image-helper.js';

/**
 * Represents the coin status bar.
 * @class
 */
export class CoinStatusBar extends StatusBar {

    y = 60;
    IMAGES = ImageHelper.STATUSBAR.coinBlue;

    /**
     * Creates the coin bar and starts it empty.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.setPercentage(0);
    }

}
