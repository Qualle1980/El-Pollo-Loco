import { StatusBar } from './status-bar.class.js';
import { ImageHelper } from '../helper_classes/image-helper.js';

/**
 * Represents the bottle status bar.
 * @class
 */
export class BottleStatusBar extends StatusBar {
    // #region properties

    y = 100;
    IMAGES = ImageHelper.STATUSBAR.bottleBlue;

    // #endregion

    // #region constructor

    // Creates the bottle bar and starts it empty.
    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.setPercentage(0);
    }

    // #endregion
}
