import { StatusBar } from './status-bar.class.js';
import { ImageHelper } from '../helper_classes/image-helper.js';

export class CoinStatusBar extends StatusBar {
    // #region properties

    y = 60;
    IMAGES = ImageHelper.STATUSBAR.coinBlue;

    // #endregion

    // #region constructor

    // Creates the coin bar and starts it empty.
    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.setPercentage(0);
    }

    // #endregion
}
