import { MovableObject } from './movable-object.class.js';

/**
 * Base class for collectable game objects.
 * @class
 */
export class CollectibleObject extends MovableObject {
    // #region properties

    collected = false;

    // #endregion
}
