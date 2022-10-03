/**
 * Used to store informations about doors
 * @export
 * @interface IDoor
 */
export interface IDoor {
    /**
     * A string to identify the door
     * @type {string}
     * @memberof IDoor
     */
    identifier?: string;

    /**
     * Default door state
     * @type {string}
     * @memberof IDoor
     */
    doorState?: number;

    /**
     * An identifier for the door, can be retrieved by using CodeWalker
     * @type {number}
     * @memberof IDoor
     */
    doorHash: number;

    /**
     * An identifier for the model of the door, can be retrieved by using CodeWalker
     * @type {number}
     * @memberof IDoor
     */
    modelHash: number;

    /**
    * x-Coordinate of the door, can be retrieved by using CodeWalker
    * @type {number}
    * @memberof IDoor
    */
    x: number;

    /**
   * y-Coordinate of the door, can be retrieved by using CodeWalker
   * @type {number}
   * @memberof IDoor
   */
    y: number;

    /**
    * z-Coordinate of the door, can be retrieved by using CodeWalker
    * @type {number}
    * @memberof IDoor
    */
    z: number;

    /**
     * The identifier of the linked door, e.g. for double-doors
     * @type {string}
     * @memberof IDoor
     */
    linkedDoor?: string;
}