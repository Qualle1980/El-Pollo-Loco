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
            button.addEventListener('touchstart', KeyboardHelper.pressMobileButton, { passive: false });
            button.addEventListener('touchend', KeyboardHelper.releaseMobileButton, { passive: false });
            button.addEventListener('touchcancel', KeyboardHelper.releaseMobileButton, { passive: false });
        });
    }

    // Stores a pressed mobile control.
    static pressMobileButton(event) {
        KeyboardHelper.preventTouchDefault(event);
        const key = event.currentTarget.dataset.mobileKey;
        if (key === 'UP') return KeyboardHelper.pressMobileJump();
        if (key === 'THROW') return KeyboardHelper.pressMobileThrow();
        KeyboardHelper.setMobileKey(key, true);
    }

    // Stores a released mobile control.
    static releaseMobileButton(event) {
        KeyboardHelper.preventTouchDefault(event);
        KeyboardHelper.setMobileKey(event.currentTarget.dataset.mobileKey, false);
    }

    // Updates the matching mobile keyboard state.
    static setMobileKey(key, isPressed) {
        if (key === 'LEFT') KeyboardHelper.keyboard.LEFT = isPressed;
        if (key === 'RIGHT') KeyboardHelper.keyboard.RIGHT = isPressed;
        if (key === 'UP') KeyboardHelper.keyboard.UP = isPressed;
        if (key === 'THROW') KeyboardHelper.keyboard.THROW = isPressed;
    }

    // Presses jump only shortly on mobile.
    static pressMobileJump() {
        KeyboardHelper.keyboard.UP = true;
        setTimeout(() => KeyboardHelper.keyboard.UP = false, 120);
    }

    // Presses throw only shortly on mobile.
    static pressMobileThrow() {
        KeyboardHelper.keyboard.THROW = true;
        setTimeout(() => KeyboardHelper.keyboard.THROW = false, 350);
    }

    // Prevents browser touch behavior only when possible.
    static preventTouchDefault(event) {
        if (event.cancelable) event.preventDefault();
    }

    // #endregion
}
