/**
 * Stores and clears game intervals.
 * @class
 */
export class IntervalHelper {
    // #region properties

    static intervalIds = [];

    // #endregion

    // #region interval control

    /**
     * Starts an interval and stores its id.
     * @param {Function} fn - The function that should run repeatedly.
     * @param {number} time - The interval time in milliseconds.
     */
    static setStoppableInterval(fn, time) {
        const id = setInterval(fn, time);
        IntervalHelper.intervalIds.push(id);
    }

    // Stops all stored intervals.
    static stopAllIntervals() {
        IntervalHelper.intervalIds.forEach(clearInterval);
        IntervalHelper.intervalIds = [];
    }

    // #endregion
}
