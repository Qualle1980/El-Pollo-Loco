export class KeyboardHelper {
    // #region properties

    static keyboard;
    static keyDownAction;
    static eventsStarted = false;

    // #endregion

    // #region keyboard setup

    // Stores the active keyboard instance.
    static setKeyboard(keyboard) {
        KeyboardHelper.keyboard = keyboard;
    }

    // Starts keyboard and mobile button events once.
    static startEvents(keyDownAction) {
        if (KeyboardHelper.eventsStarted) return;
        KeyboardHelper.keyDownAction = keyDownAction;
        KeyboardHelper.addKeyboardEvents();
        KeyboardHelper.addMobileControlEvents();
        KeyboardHelper.eventsStarted = true;
    }

    // #endregion

    // #region keyboard events

    // Adds keydown and keyup events.
    static addKeyboardEvents() {
        window.addEventListener('keydown', (event) => KeyboardHelper.handleKeyDown(event));
        window.addEventListener('keyup', (event) => KeyboardHelper.updateKey(event.code, false));
    }

    // Handles one pressed key.
    static handleKeyDown(event) {
        if (KeyboardHelper.isRepeatedThrowKey(event)) return;
        if (KeyboardHelper.keyDownAction) KeyboardHelper.keyDownAction(event.code);
        KeyboardHelper.updateKey(event.code, true);
    }

    // Checks if the throw key is repeated while being held down.
    static isRepeatedThrowKey(event) {
        return event.code === 'KeyD' && event.repeat;
    }

    // Updates the matching keyboard state.
    static updateKey(code, isPressed) {
        if (code === 'ArrowLeft') KeyboardHelper.keyboard.LEFT = isPressed;
        if (code === 'ArrowRight') KeyboardHelper.keyboard.RIGHT = isPressed;
        if (code === 'Space') KeyboardHelper.keyboard.UP = isPressed;
        if (code === 'KeyD') KeyboardHelper.keyboard.THROW = isPressed;
    }

    // #endregion

    // #region mobile controls

    // Adds touch events to all mobile control buttons.
    static addMobileControlEvents() {
        document.querySelectorAll('.mobile-control-button').forEach((button) => {
            button.addEventListener('touchstart', KeyboardHelper.pressMobileButton);
            button.addEventListener('touchend', KeyboardHelper.releaseMobileButton);
            button.addEventListener('touchcancel', KeyboardHelper.releaseMobileButton);
        });
    }

    // Stores a pressed mobile control.
    static pressMobileButton(event) {
        event.preventDefault();
        KeyboardHelper.setMobileKey(event.currentTarget.dataset.mobileKey, true);
    }

    // Stores a released mobile control.
    static releaseMobileButton(event) {
        event.preventDefault();
        KeyboardHelper.setMobileKey(event.currentTarget.dataset.mobileKey, false);
    }

    // Updates the matching mobile keyboard state.
    static setMobileKey(key, isPressed) {
        if (key === 'LEFT') KeyboardHelper.keyboard.LEFT = isPressed;
        if (key === 'RIGHT') KeyboardHelper.keyboard.RIGHT = isPressed;
        if (key === 'UP') KeyboardHelper.keyboard.UP = isPressed;
        if (key === 'THROW') KeyboardHelper.keyboard.THROW = isPressed;
    }

    // #endregion
}
