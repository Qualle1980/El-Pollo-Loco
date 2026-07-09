/**
 * Handles keyboard and mobile touch input for the game.
 * @class
 */
export class KeyboardHelper {
    // #region properties

    static keyboard;
    static keyDownAction;
    static eventsStarted = false;

    // #endregion

    // #region keyboard setup

    /**
     * Stores the active keyboard instance.
     * @param {Keyboard} keyboard - The keyboard object used by the game.
     */
    static setKeyboard(keyboard) {
        KeyboardHelper.keyboard = keyboard;
    }

    /**
     * Starts keyboard and mobile button events once.
     * @param {Function} keyDownAction - Function that reacts to keydown actions.
     */
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

    /**
     * Handles one pressed key.
     * @param {KeyboardEvent} event - The pressed keyboard event.
     */
    static handleKeyDown(event) {
        if (KeyboardHelper.isRepeatedThrowKey(event)) return;
        if (KeyboardHelper.keyDownAction) KeyboardHelper.keyDownAction(event.code);
        KeyboardHelper.updateKey(event.code, true);
    }

    /**
     * Checks if the throw key is repeated while being held down.
     * @param {KeyboardEvent} event - The pressed keyboard event.
     * @returns {boolean} True if the repeated key is the throw key.
     */
    static isRepeatedThrowKey(event) {
        return event.code === 'KeyD' && event.repeat;
    }

    /**
     * Updates the matching keyboard state.
     * @param {string} code - The pressed or released key code.
     * @param {boolean} isPressed - True if the key is currently pressed.
     */
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

    /**
     * Stores a pressed mobile control.
     * @param {TouchEvent} event - The mobile touch event.
     */
    static pressMobileButton(event) {
        KeyboardHelper.preventTouchDefault(event);
        const key = event.currentTarget.dataset.mobileKey;
        if (key === 'UP') return KeyboardHelper.pressMobileJump();
        if (key === 'THROW') return KeyboardHelper.pressMobileThrow();
        KeyboardHelper.setMobileKey(key, true);
    }

    /**
     * Stores a released mobile control.
     * @param {TouchEvent} event - The mobile touch event.
     */
    static releaseMobileButton(event) {
        KeyboardHelper.preventTouchDefault(event);
        KeyboardHelper.setMobileKey(event.currentTarget.dataset.mobileKey, false);
    }

    /**
     * Updates the matching mobile keyboard state.
     * @param {string} key - The mobile button key.
     * @param {boolean} isPressed - True if the mobile button is pressed.
     */
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

    /**
     * Prevents browser touch behavior only when possible.
     * @param {TouchEvent} event - The mobile touch event.
     */
    static preventTouchDefault(event) {
        if (event.cancelable) event.preventDefault();
    }

    // #endregion
}
