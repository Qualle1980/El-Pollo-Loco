/**
 * Stores and clears game intervals.
 * @class
 */
export class IntervalHelper {

    static intervalIds = [];
    static gamePaused = false;

    /**
     * Starts an interval and stores its id.
     * @param {Function} fn - The function that should run repeatedly.
     * @param {number} time - The interval time in milliseconds.
     */
    static setStoppableInterval(fn, time) {
        const id = setInterval(() => {
            if (!IntervalHelper.gamePaused) fn();
        }, time);
        IntervalHelper.intervalIds.push(id);
    }

    /**
     * Pauses all registered intervals.
     */
    static pauseAllIntervals() {
        IntervalHelper.gamePaused = true;
    }

    /**
     * Continues all registered intervals.
     */
    static resumeAllIntervals() {
        IntervalHelper.gamePaused = false;
    }

    /**
     * Stops all stored intervals.
     */
    static stopAllIntervals() {
        IntervalHelper.intervalIds.forEach(clearInterval);
        IntervalHelper.intervalIds = [];
        IntervalHelper.resumeAllIntervals();
    }

}
