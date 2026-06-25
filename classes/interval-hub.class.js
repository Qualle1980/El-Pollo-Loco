class IntervalHub {
    // #region properties

    static intervalIds = [];

    // #endregion

    // #region interval control

    // Starts an interval and stores its id.
    static setStoppableInterval(fn, time) {
        const id = setInterval(fn, time);
        IntervalHub.intervalIds.push(id);
    }

    // Stops all stored intervals.
    static stopAllIntervals() {
        IntervalHub.intervalIds.forEach(clearInterval);
        IntervalHub.intervalIds = [];
    }

    // #endregion
}
