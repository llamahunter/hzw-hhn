/**
 * (c) Meta Platforms, Inc. and affiliates. Confidential and proprietary.
 *
 * @flow strict
 * @oncall horizon_scripting
 */
/**
 * (c) Meta Platforms, Inc. and affiliates. Confidential and proprietary.
 *
 * @format
 */

/**
 * Console interface for logging
 */
interface Console {
  /**
   * Logs data to scripting console
   * @param args - values to log
   */
  log(...args: unknown[]): void;
  /**
   * Logs a warning to scripting console with provided arguments
   * @param args - values to log
   */
  warn(...args: unknown[]): void;
  /**
   * Logs an error to scripting console with provided arguments
   * @param args - values to log
   */
  error(...args: unknown[]): void;
}

/**
 * Global console object that allows logging
 */
declare const console: Console;

declare module '@early_access_api/v1' {
 /**
 * (c) Meta Platforms, Inc. and affiliates. Confidential and proprietary.
 *
 * @format
 */
export declare enum PropTypes {
    Number = "number",
    String = "string",
    Boolean = "boolean",
    Vec3 = "Vec3",
    Color = "Color",
    Entity = "Entity",
    Quaternion = "Quaternion",
    Player = "Player",
    Asset = "Asset",
    NumberArray = "Array<number>",
    StringArray = "Array<string>",
    BooleanArray = "Array<boolean>",
    Vec3Array = "Array<Vec3>",
    ColorArray = "Array<Color>",
    EntityArray = "Array<Entity>",
    QuaternionArray = "Array<Quaternion>",
    PlayerArray = "Array<Player>",
    AssetArray = "Array<Asset>"
}
export declare enum Space {
    World = 0,
    Local = 1
}
/**
 * Assert a value is true
 * @param condition - value that expected to be true
 */
export declare function assert(condition: boolean): void;
export interface ReadableHorizonProperty<T> {
    get(): T;
}
export interface WritableHorizonProperty<T, U = never> {
    set(value: T, ...values: [U?]): void;
}
export declare class HorizonProperty<T> implements ReadableHorizonProperty<T>, WritableHorizonProperty<T> {
    private _cachedFrameValue;
    private _lastFrameFetched;
    getter: () => T;
    setter: (value: T) => void;
    constructor(getter: () => T, setter: (value: T) => void);
    /**
     * Gets the current value of the property. Calls are cached per frame.
     *
     * @remarks
     * Mutating this state snapshot will not change the underlying value - `set` must be called to do this
     *
     * @returns current value of the property
     */
    get(): T;
    /**
     * Sets the property value. This is not guaranteed to be synchronous (happen on the same frame it was called)
     * @param value - property value to be set
     */
    set(value: T): void;
}
declare class HorizonSetProperty<T> implements Iterable<T>, ReadableHorizonProperty<T[]>, WritableHorizonProperty<T[]> {
    private _getter;
    private _setter;
    constructor(getter: () => T[], setter: (value: T[]) => void);
    [Symbol.iterator](): Iterator<T>;
    get(): T[];
    set(value: T[]): void;
    contains(value: T): boolean;
}
/**
 * Events
 */
declare type LocalEventData = {
    [key: string]: any;
};
export declare class HorizonEvent<TPayload extends LocalEventData> {
    private static _nextUniqueId;
    private _enforceType;
    name: string;
    uniqueName: string;
    constructor(name: string);
}
declare type ConstrainedPropTypes<T extends BuiltInVariableType[]> = {
    [key in keyof T]: StringifiedBuiltInVariable<T[key]>;
};
export declare class CodeBlockEvent<T extends BuiltInVariableType[]> {
    name: string;
    expectedTypes: ConstrainedPropTypes<T> | [];
    private _enforceType;
    constructor(name: string, expectedTypes: ConstrainedPropTypes<T> | []);
}
/**
 * Event subscription that is returned from subscribing to an event
 */
export interface EventSubscription {
    disconnect: () => void;
}
/**
 * The Comparable interface defines a set of methods for comparing values of the same type,
 * including {@link Comparable.equals | equals()} and {@link Comparable.equalsApprox | equalsApprox()} methods.
 *
 * @typeParam T - The type of objects this object can be compared to
 */
export interface Comparable<T> {
    equals(val: T): boolean;
    equalsApprox(val: T, epsilon?: number): boolean;
}
/**
 * 3D Vector
 */
export declare class Vec3 implements Comparable<Vec3> {
    private _hzType;
    x: number;
    y: number;
    z: number;
    constructor(x: number, y: number, z: number);
    /**
     * Clone this vector's value into a mutable Vec3
     * @returns a mutable Vec3 with our same x,y,z values
     */
    clone(): Vec3;
    /**
     * Compares the equality of a vector to the given vector
     * @param vec - vector to compare
     */
    equals(vec: Vec3): boolean;
    /**
     * Compares the approximate equality of a vector to the given vector
     * @param vec - vector to compare
     * @param epsilon - maxium difference in value to be considered equal
     */
    equalsApprox(vec: Vec3, epsilon?: number): boolean;
    /**
     * Magnitude of a vector
     */
    magnitude(): number;
    /**
     * Squared magnitude of a vector
     */
    magnitudeSquared(): number;
    /**
     * Dot product of vector with target vector
     * @param vec -
     */
    dot(vec: Vec3): number;
    /**
     * Distance between from vector to given vector
     * @param vec - vector to compute distance between
     */
    distance(vec: Vec3): number;
    /**
     * Squared distance between from vector to given vector
     * @param vec - vector to compute squared distance between
     */
    distanceSquared(vec: Vec3): number;
    toString(): string;
    copy(vec: Vec3): this;
    /**
     * Returns a new vector which is the result of adding vec to the current vector
     * @param vec - vector to add
     */
    add(vec: Vec3): Vec3;
    /**
     * Returns a new vector which is the result of subtracting vec from the current vector
     * @param vec - vector to subtract
     */
    sub(vec: Vec3): Vec3;
    /**
     * Returns a new vector which is the result of multiplying the current vector by scalar
     * @param scalar - scalar to multiply
     */
    mul(scalar: number): Vec3;
    /**
     * Returns a new vector which is the result of multiplying the one vector's components by another's components
     * (a.x*b.x, a.y*b.y, a.z*b.z)
     * @param vec - vec to multiply
     */
    componentMul(vec: Vec3): Vec3;
    /**
     * Returns a new vector which is the result of dividing the current vector by scalar
     * @param scalar - scalar to divide
     */
    div(scalar: number): Vec3;
    /**
     * Returns a new vector which is the result of dividing the one vector's components by another's components
     * (a.x/b.x, a.y/b.y, a.z/b.z)
     * @param vec - vec to divide
     */
    componentDiv(vec: Vec3): Vec3;
    /**
     * Returns a new vector which is the result of normalizing the current vector
     */
    normalize(): Vec3;
    /**
     * Returns a new vector which is the result of crossing the current vector
     */
    cross(vec: Vec3): Vec3;
    /**
     * Returns a new vector which is the result of reflecting the current vector on the given normal
     * @param normal - The normal of the reflecting surface. This is assumed to be normalized.
     */
    reflect(normal: Vec3): Vec3;
    /**
     * Adds a vector, modifying the original vector in place
     * @param vec - vector to add
     */
    addInPlace(vec: Vec3): this;
    /**
     * Subtracts a vector, modifying the original vector in place
     * @param vec - vector to subtract
     */
    subInPlace(vec: Vec3): this;
    /**
     * Scalar multiplication, modifying the original vector in place
     * @param scalar - value to scale the vector by
     */
    mulInPlace(scalar: number): this;
    /**
     * Vector x vector multiplication, modifying the original vector in place
     * @param vec - vector to multiply the vector by
     */
    componentMulInPlace(vec: Vec3): this;
    /**
     * Scalar division, modifying the original vector in place
     * @param scalar - value to scale the vector by
     */
    divInPlace(scalar: number): this;
    /**
     * Vector/vector division, modifying the original vector in place
     * @param vec - vector to divide the vector by
     */
    componentDivInPlace(vec: Vec3): this;
    /**
     * Normalizes the vector in palce
     */
    normalizeInPlace(): this;
    /**
     * Computes the cross product with a target vector, modifying the original vector in place
     * @param vec - Vector to cross
     */
    crossInPlace(vec: Vec3): this;
    /**
     * Computes the reflection vector given a normal, modifying the original vector in place
     * @param normal - The normal of the reflecting surface. This is assumed to be normalized.
     */
    reflectInPlace(normal: Vec3): this;
    static get zero(): Vec3;
    static get one(): Vec3;
    static get forward(): Vec3;
    static get up(): Vec3;
    static get left(): Vec3;
    static get right(): Vec3;
    static get backward(): Vec3;
    static get down(): Vec3;
    /**
     * Compares the if two vectors are equal
     * @param vecA - vector to compare
     * @param vecB - vector to compare
     */
    static equals(vecA: Vec3, vecB: Vec3): boolean;
    /**
     * Compares the approximate equality of a vector to another vector
     * @param vecA - vector to compare
     * @param vecB - vector to compare
     * @param epsilon - maxium difference in value to be considered equal
     */
    static equalsApprox(vecA: Vec3, vecB: Vec3, epsilon?: number): boolean;
    /**
     * Adds vectors, returning a new vector
     * @param vecA - vector to add
     * @param vecB - vector to add
     * @param outVec - vector in which this operation takes place. If not supplied, a new vector will be created and returned.
     */
    static add(vecA: Vec3, vecB: Vec3, outVec?: Vec3): Vec3;
    /**
     * Subtracts a vector from another, returning a new vector
     * @param vecA - vector to substract from
     * @param vecB - vector to subtract
     * @param outVec - vector in which this operation takes place. If not supplied, a new vector will be created and returned.
     */
    static sub(vecA: Vec3, vecB: Vec3, outVec?: Vec3): Vec3;
    /**
     * Scalar multiplication on a vector, returning a new vector
     * @param vec - vector to scale
     * @param scalar - value to scale the vector by
     * @param outVec - vector in which this operation takes place. If not supplied, a new vector will be created and returned.
     */
    static mul(vec: Vec3, scalar: number, outVec?: Vec3): Vec3;
    /**
     * Scalar division on a vector, returning a new vector
     * @param vec - vector to scale
     * @param scalar - value to scale the vector by
     * @param outVec - vector in which this operation takes place. If not supplied, a new vector will be created and returned.
     */
    static div(vec: Vec3, scalar: number, outVec?: Vec3): Vec3;
    /**
     * Normalizes a vector, returning a new vector
     * @param vec - vector to normalize
     * @param outVec - vector in which this operation takes place. If not supplied, a new vector will be created and returned.
     * @returns normalied Vec3
     */
    static normalize(vec: Vec3, outVec?: Vec3): Vec3;
    /**
     * Computes the cross product of two vectors, returning a new vector
     * @param vecA - Left side vector of the cross product
     * @param vecB - Right side vector of the cross product
     * @param outVec - vector in which this operation takes place. If not supplied, a new vector will be created and returned.
     * @returns cross product
     */
    static cross(vecA: Vec3, vecB: Vec3, outVec?: Vec3): Vec3;
    /**
     * Lerp (linear interpolation) between two vectors
     * @param vecA - vec3 to lerp
     * @param vecB - vec3 to lerp
     * @param amount - defines the gradient to use for interpolation (clamped 0 to 1)
     * @param outVec - vector in which this operation takes place. If not supplied, a new vector will be created and returned.
     * @returns interpolated Vec3
     */
    static lerp(vecA: Vec3, vecB: Vec3, amount: number, outVec?: Vec3): Vec3;
}
/**
 * Color in RGB space
 */
export declare class Color implements Comparable<Color> {
    private _hzType;
    r: number;
    g: number;
    b: number;
    /**
     * @param r - The red component of the RGB color as a float from 0 to 1.
     * @param g - The green component of the RGB color as a float from 0 to 1.
     * @param b - The blue component of the RGB color as a float from 0 to 1.
     */
    constructor(r: number, g: number, b: number);
    toString(): string;
    /**
     * Clone this color's value into a mutable Color
     * @returns a mutable Color with our same r,g,b values
     */
    clone(): Color;
    /**
     * Converts RGB color to HSV
     */
    toHSV(): Vec3;
    /**
     * Converts RGB color to Vec3
     */
    toVec3(): Vec3;
    /**
     * Compares the value of a color to the target color and returns a boolean
     * @param color - color to compare
     */
    equals(color: Color): boolean;
    /**
     * Compares the approximate equality of a color to the given color
     * @param color - color to compare
     * @param epsilon - maxium difference in value to be considered equal
     */
    equalsApprox(color: Color, epsilon?: number): boolean;
    copy(color: Color): this;
    /**
     * Returns a new color which is the result of adding color to the current color
     * @param color - color to add
     */
    add(color: Color): Color;
    /**
     * Adds a color, modifying the original color in place
     * @param color - color to add
     */
    addInPlace(color: Color): this;
    /**
     * Returns a new color which is the result of subtracting color from the current color
     * @param color - color to subtract
     */
    sub(color: Color): Color;
    /**
     * Subtracts a color, modifying the original color in place
     * @param color - color to subtract
     */
    subInPlace(color: Color): this;
    /**
     * Returns a new color which is the result of multiplying scalar on each component of the current color
     * @param scalar - scalar to multiply
     */
    mul(scalar: number): Color;
    /**
     * Scalar multiplication, modifying the original color in place
     * @param scalar - value to scale the color by
     */
    mulInPlace(scalar: number): this;
    /**
     * Returns a new color which is the result of multiplying each component of the current color with the input color's component
     * @param color - color to multiply
     */
    componentMul(color: Color): Color;
    /**
     * component multiplication, modifying the original color in place
     * @param color - color to multiply by
     */
    componentMulInPlace(color: Color): this;
    /**
     * Returns a new color which is the result of dividing scalar on each component of the current color
     * @param scalar - scalar to divide
     */
    div(scalar: number): Color;
    /**
     * Scalar division, modifying the original color in place
     * @param scalar - value to scale the color by
     */
    divInPlace(scalar: number): this;
    static get red(): Color;
    static get green(): Color;
    static get blue(): Color;
    static get white(): Color;
    static get black(): Color;
    /**
     * Compares the if two colors are equal
     * @param colorA - color to compare
     * @param colorB - color to compare
     */
    static equals(colorA: Color, colorB: Color): boolean;
    /**
     * Compares the approximate equality of a color to another color
     * @param colorA - color to compare
     * @param colorB - color to compare
     * @param epsilon - maxium difference in value to be considered equal
     */
    static equalsApprox(colorA: Color, colorB: Color, epsilon?: number): boolean;
    /**
     * Adds two colors, returning a new color
     * @param colorA - color to add
     * @param colorB - color to add
     * @param outColor - color in which this operation takes place. If not supplied, a new vector will be created and returned.
     */
    static add(colorA: Color, colorB: Color, outColor?: Color): Color;
    /**
     * Subtracts a color from the another color, returning a new color
     * @param colorA - color to subtract from
     * @param colorB - color to subtract
     * @param outColor - color in which this operation takes place. If not supplied, a new vector will be created and returned.
     */
    static sub(colorA: Color, colorB: Color, outColor?: Color): Color;
    /**
     * Scalar multiplication on a color, returning a new color
     * @param color - to scale
     * @param scalar - value to scale the color by
     * @param outColor - color in which this operation takes place. If not supplied, a new vector will be created and returned.
     */
    static mul(color: Color, scalar: number, outColor?: Color): Color;
    /**
     * Scalar division on a color, returning a new color
     * @param color - to scale
     * @param scalar - value to scale the color by
     * @param outColor - color in which this operation takes place. If not supplied, a new vector will be created and returned.
     */
    static div(color: Color, scalar: number, outColor?: Color): Color;
    /**
     * Create a new color from an HSV value.
     * @param hsv - The HSV color value to convert to RGB
     */
    static fromHSV(hsv: Vec3): Color;
}
export declare enum EulerOrder {
    XYZ = "XYZ",
    YXZ = "YXZ",
    ZXY = "ZXY",
    ZYX = "ZYX",
    YZX = "YZX",
    XZY = "XZY"
}
/**
 * Clamps a value between a min and max
 * @param value - value to clamp
 * @param min - minimum
 * @param max - maxium
 * @returns clamped value
 */
export declare function clamp(value: number, min: number, max: number): number;
/**
 * Converts radians to degrees
 * @param radians - value in radians
 * @returns value in degrees
 */
export declare function radiansToDegrees(radians: number): number;
/**
 * Converts degrees to radians
 * @param degrees - value in degrees
 * @returns value in radians
 */
export declare function degreesToRadians(degrees: number): number;
/**
 * Quaternion
 */
export declare class Quaternion implements Comparable<Quaternion> {
    private _hzType;
    x: number;
    y: number;
    z: number;
    w: number;
    constructor(x: number, y: number, z: number, w: number);
    toString(): string;
    clone(): Quaternion;
    /**
     * Converts the quaternion to an Euler angle in degrees
     * @param order - the order of the resulting Vec3 defaults to XYZ
     * @returns Vec3 representing Euler angle (in degrees)
     */
    toEuler: (order?: EulerOrder) => Vec3;
    /**
     * Compares the if a quaternion is equal to the given quaternion
     * @param quat - quaternion to compare
     */
    equals(quat: Quaternion): boolean;
    /**
     * Compares the approximate equality of a quaternion to the given quaternion
     * @param quat - quaternion to compare
     * @param epsilon - maxium difference in value to be considered equal
     */
    equalsApprox(quat: Quaternion, epsilon?: number): boolean;
    /**
     * Returns the axis of the rotation represented by this quaternion
     */
    axis(): Vec3;
    /**
     * Returns the angle of rotation represented by this quaternion, in radians
     * @returns angle in radians
     */
    angle(): number;
    copy(quat: Quaternion): this;
    /**
     * Returns a new quaternion which is the result of inverting the current quaternion
     */
    inverse(): Quaternion;
    /**
     * Compute the inverse, modifying the original Quaternion in place.
     */
    inverseInPlace(): this;
    /**
     * Returns a new quaternion which is the result of normalizing vec to the current quaternion
     */
    normalize(): Quaternion;
    /**
     * Normalize the quaternion in place
     */
    normalizeInPlace(): this;
    /**
     * Returns a new quaternion which is the result of conjugating the current quaternion
     */
    conjugate(): Quaternion;
    /**
     * Conjugate the quaternion in place
     */
    conjugateInPlace(): this;
    /**
     * Returns a new quaternion which is the result of multiplying quat by the current quaternion
     * @param quat -
     */
    mul(quat: Quaternion): Quaternion;
    /**
     * Multiply by another quaternion, modifying the original quaternion in place
     * @param quat -
     */
    mulInPlace(quat: Quaternion): this;
    static get zero(): Quaternion;
    static get one(): Quaternion;
    static get i(): Quaternion;
    static get j(): Quaternion;
    static get k(): Quaternion;
    /**
     * Compares the if two quaternions are equal
     * @param quatA - quaternion to compare
     * @param quatB - quaternion to compare
     */
    static equals(quatA: Quaternion, quatB: Quaternion): boolean;
    /**
     * Compares the approximate equality of a quaternion to another quaternion
     * @param quatA - quaternion to compare
     * @param quatB - quaternion to compare
     * @param epsilon - maxium difference in value to be considered equal
     */
    static equalsApprox(quatA: Quaternion, quatB: Quaternion, epsilon?: number): boolean;
    /**
     * Creates a quaternion from Euler angle in degrees
     * @param euler - Euler angle as a Vec3 in degrees
     * @param order - order that the euler angle is in (defaults to XYZ)
     */
    static fromEuler(euler: Vec3, order?: EulerOrder): Quaternion;
    /**
     * Creates a quaternion using the forward and up vectors
     * @param forward - forward direction of rotation (must be orthogonal to up)
     * @param up - up direction of rotation - defaults to Vec3.up (must be orthogonal to forward)
     * @param outQuat - quaternion in which this operation takes place. If not supplied, a new quaternion will be created and returned.
     * @returns Quaternion looking towards the given vectors
     */
    static lookRotation(forward: Vec3, up?: Vec3, outQuat?: Quaternion): Quaternion;
    /**
     * Slerp (spherical linear interpolation) between two quaternions
     * @param left - quaternion to slerp
     * @param right - quaternion to slerp
     * @param amount - defines the gradient to use for interpolation (clamped 0 to 1)
     * @param outQuat - quaternion in which this operation takes place. If not supplied, a new quaternion will be created and returned.
     * @returns interpolated Quaternion
     */
    static slerp(left: Quaternion, right: Quaternion, amount: number, outQuat?: Quaternion): Quaternion;
    /**
     * Multiplies two quaternions, returning a new quaternion
     * @param quatA - quaternion to multiply
     * @param quatB - quaternion to multiply
     * @param outQuat - quaternion in which this operation takes place. If not supplied, a new quaternion will be created and returned.
     * @returns a new quaternion
     */
    static mul(quatA: Quaternion, quatB: Quaternion, outQuat?: Quaternion): Quaternion;
    /**
     * Rotate the given vector by this quaternion, returning a new vector
     * @param quat - quaternion to multiply
     * @param vec - vector to multiply
     * @returns a new Vec3
     */
    static mulVec3: (quat: Quaternion, vec: Vec3) => Vec3;
    /**
     * Conjugate a quaternion, returning a new quaternion
     * @param quat - quaternion to conjugate
     * @param outQuat - quaternion in which this operation takes place. If not supplied, a new quaternion will be created and returned.
     * @returns a new quaternion
     */
    static conjugate(quat: Quaternion, outQuat?: Quaternion): Quaternion;
    /**
     * Compute the inverse of a quaternion, returning a new quaternion
     * @returns a new quaternion
     */
    static inverse(quat: Quaternion): Quaternion;
    /**
     * Normalize a quaternion, returning a new quaternion
     * @param outQuat - quaternion in which this operation takes place. If not supplied, a new quaternion will be created and returned.
     * @returns a normalized quaternion
     */
    static normalize(quat: Quaternion, outQuat?: Quaternion): Quaternion;
    /**
     * Creates a new quaternion from a vector (w is 0)
     * @param vec -
     * @returns a Quaternion
     */
    static fromVec3(vec: Vec3): Quaternion;
    /**
     * Creates a quaternion from axis angle
     * @param axis -
     * @param angle - in radians
     */
    static fromAxisAngle: (axis: Vec3, angle: number) => Quaternion;
}
export declare class Entity {
    private _hzType;
    readonly id: number;
    private static _cache;
    constructor(id: number);
    toString(): string;
    position: HorizonProperty<Vec3>;
    scale: HorizonProperty<Vec3>;
    rotation: HorizonProperty<Quaternion>;
    color: HorizonProperty<Color>;
    forward: ReadableHorizonProperty<Vec3>;
    up: ReadableHorizonProperty<Vec3>;
    visible: HorizonProperty<boolean>;
    collidable: HorizonProperty<boolean>;
    simulated: HorizonProperty<boolean>;
    interactionMode: HorizonProperty<EntityInteractionMode>;
    owner: HorizonProperty<Player>;
    /**
     * Tags can be used to annotate Entities with user-defined labels to identify and match objects.
     *
     * Note: Currently, the data model only supports one tag. When setting a collection of tags, only
     * the first element in the provided collection will be saved. Getting or checking existence of tags
     * will also operate on a collection with a single tag in them, if set.
     */
    tags: HorizonSetProperty<string>;
    exists(): boolean;
    /**
     * Cast an Entity as its more specific subclass (eg TextDisplay)
     * @param entityClass - subclass to cast Entity into
     */
    as<T extends Entity>(entityClass: IEntity<T>): T;
    setVisibleToPlayers(players: Array<Player>): void;
    /**
     * Sets an entity to be visible by all players.
     *
     * @example
     * cubeEntity.setVisibleToAllPlayers();
     */
    setVisibleToAllPlayers(): void;
    /**
     * Checks whether or not the entity is visible to a particular player.
     * @param player - The player for which the entity may or may not be visible.
     * @returns True if the entity is visible, false otherwise.
     *
     * @example
     * var isVisible = cubeEntity.isVisibleTo(player);
     */
    isVisibleToPlayer(player: Player): boolean;
    /**
     * Rotates an entity to look at a point
     * @param target - Target for the entity to look at
     * @param up - up direction of rotation - defaults to Vec3.up
     */
    lookAt(target: Vec3, up?: Vec3): void;
}
interface IEntity<T extends Entity> {
    new (id: number): T;
}
export declare class SpawnPointGizmo extends Entity {
    toString(): string;
    teleportPlayer(player: Player): void;
}
export declare class TextGizmo extends Entity {
    toString(): string;
    /**
     * The content to display in the text label
     */
    text: HorizonProperty<string>;
}
export declare class TriggerGizmo extends Entity {
    toString(): string;
    /**
     * Whether the Trigger is actively testing for overlaps
     */
    enabled: WritableHorizonProperty<boolean>;
}
export declare class ParticleGizmo extends Entity {
    toString(): string;
    /**
     * Plays particle effect
     */
    play(): void;
    /**
     * Stops particle effect
     */
    stop(): void;
}
export declare class TrailGizmo extends Entity {
    toString(): string;
    /**
     * Plays trail effect
     */
    play(): void;
    /**
     * Stops trail effect
     */
    stop(): void;
}
/**
 * AudioOptions control how audio is interacted with:
 * fade - Time (s) it takes for the sound to fade in or out.
 * players - Optional. Include this if the sound should only play for certain players.
 */
export declare type AudioOptions = {
    fade: number;
    players?: Array<Player>;
};
export declare class AudioGizmo extends Entity {
    toString(): string;
    /**
     * The audio volume 0-1
     */
    volume: WritableHorizonProperty<number, AudioOptions>;
    /**
     * The audio pitch in semitones (-12 to 12)
     */
    pitch: WritableHorizonProperty<number>;
    /**
     * Plays an AudioGizmo.
     *
     * @param audioOptions - Optional. Controls how the audio is played.
     * fade - Time (s) it takes for the sound to fade in or out.
     * players - Optional array of players. Include this if the sound should only affect certain players.
     *
     * @example
     * ```
     * const soundGizmo = this.props.sfx.as(hz.AudioGizmo);
     * const audioOptions: AudioOptions = {fade: 1, players: [player1, player2]};
     * soundGizmo.play(audioOptions);
     * ```
     */
    play(audioOptions?: AudioOptions): void;
    /**
     * Pauses an AudioGizmo.
     *
     * @param audioOptions - Optional. Controls how the audio is paused.
     * fade - Time (s) it takes for the sound to fade in or out.
     * players - Optional array of players. Include this if the sound should only affect certain players.
     *
     * @example
     * ```
     * const soundGizmo = this.props.sfx.as(hz.AudioGizmo);
     * const audioOptions: AudioOptions = {fade: 1, players: [player1, player2]};
     * soundGizmo.pause(audioOptions);
     * ```
     */
    pause(audioOptions?: AudioOptions): void;
    /**
     * Stops an AudioGizmo.
     *
     * @param audioOptions - Optional. Controls how the audio is played.
     * fade - Time (s) it takes for the sound to fade in or out.
     * players - Optional array of players. Include this if the sound should only affect certain players.
     *
     * @example
     * ```
     * const soundGizmo = this.props.sfx.as(hz.AudioGizmo);
     * const audioOptions: AudioOptions = {fade: 1, players: [player1, player2]};
     * soundGizmo.stop(audioOptions);
     * ```
     */
    stop(audioOptions?: AudioOptions): void;
}
export declare class ProjectileLauncherGizmo extends Entity {
    toString(): string;
    projectileGravity: WritableHorizonProperty<number>;
    launchProjectile(speed?: number): void;
}
export declare class AchievementsGizmo extends Entity {
    toString(): string;
    displayAchievements(achievementScriptIDs: Array<string>): void;
}
export declare enum MonetizationTimeOption {
    Seconds = "SECONDS",
    Hours = "HOURS",
    Days = "DAYS"
}
export declare class IWPSellerGizmo extends Entity {
    toString(): string;
    playerOwnsItem(player: Player, item: string): boolean;
    playerHasConsumedItem(player: Player, item: string): boolean;
    quantityPlayerOwns(player: Player, item: string): number;
    timeSincePlayerConsumedItem(player: Player, item: string, timeOption: MonetizationTimeOption): number;
    consumeItemForPlayer(player: Player, item: string): void;
}
export declare enum LayerType {
    Player = 0,
    Objects = 1,
    Both = 2
}
export interface RaycastHit {
    hit: boolean;
    didHitPlayer: boolean;
    didHitEntity: boolean;
    didHitStatic: boolean;
    distance?: number;
    hitPoint?: Vec3;
    normal?: Vec3;
    playerHit?: Player;
    entityHit?: Entity;
    colliderHit?: string;
}
export declare class RaycastGizmo extends Entity {
    toString(): string;
    /**
     * Raycast from a raycast gizmo
     * @param origin - from where to start the raycast
     * @param direction - to send the raycast
     * @param options - options to configure raycast
     * * layerType- Player, Objects, Both
     * * maxDistance - to send the raycast
     * @returns information about the raycast hit
     */
    raycast(origin: Vec3, direction: Vec3, options?: {
        layerType?: LayerType;
        maxDistance?: number;
    }): RaycastHit;
}
export declare class DynamicLightGizmo extends Entity {
    toString(): string;
    enabled: WritableHorizonProperty<boolean>;
    /**
     * Set the light intensity from 0-10
     */
    intensity: WritableHorizonProperty<number>;
    /**
     * Set the light falloff distance from 0-100
     */
    falloffDistance: WritableHorizonProperty<number>;
    /**
     * Set the light spread from 0-180
     */
    spread: WritableHorizonProperty<number>;
}
export declare enum PhysicsForceMode {
    Force = "Force",
    Impulse = "Impulse",
    VelocityChange = "VelocityChange"
}
/**
 * SpringOptions control the springs physics:
 * stiffness - The stiffness of the spring controls the amount of force applied on the object.
 * damping - The damping ratio of the string reduces oscillations
 * axisIndependent - Ensures the object's motion is parallel to the push direction.
 */
export declare type SpringOptions = {
    stiffness: number;
    damping: number;
    axisIndependent: boolean;
};
export declare const DefaultSpringOptions: {
    stiffness: number;
    damping: number;
    axisIndependent: boolean;
};
export declare class PhysicalEntity extends Entity {
    toString(): string;
    gravityEnabled: WritableHorizonProperty<boolean>;
    locked: HorizonProperty<boolean>;
    velocity: ReadableHorizonProperty<Vec3>;
    angularVelocity: ReadableHorizonProperty<Vec3>;
    applyForce(vector: Vec3, mode: PhysicsForceMode): void;
    applyLocalForce(vector: Vec3, mode: PhysicsForceMode): void;
    applyForceAtPosition(vector: Vec3, position: Vec3, mode: PhysicsForceMode): void;
    applyTorque(vector: Vec3): void;
    applyLocalTorque(vector: Vec3): void;
    zeroVelocity(): void;
    /**
     * Pushes a physical entity toward a target position as if it's attached to a spring.
     * This should be called every frame and requires the physical entity's motion type to be interactive.
     *
     * @param position - The target position, or 'origin' of the spring
     * @param options - Additional optional arguments to control the spring's behavior
     * stiffness - The stiffness of the spring controls the amount of force applied on the object.
     * damping - The damping ratio of the string reduces oscillations
     * axisIndependent - Ensures the object's motion is parallel to the push direction.
     *
     * @example
     * ```
     * var physEnt = this.props.obj1.as(hz.PhysicalEntity);
     * this.connectBroadcastEvent(hz.World.onUpdate, (data: { deltaTime: number }) => {
     *  physEnt.springPushTowardPosition(this.props.obj2.position.get(), {stiffness: 5, damping: 0.2});
     * })
     * ```
     */
    springPushTowardPosition(position: Vec3, options?: Partial<SpringOptions>): void;
    /**
     * Spins a physical entity toward a target rotation as if it's attached to a spring.
     * This should be called every frame and requires the physical entity's motion type to be interactive.
     *
     * @param rotation - The target quaternion rotation
     * @param options - Additional optional arguments to control the spring's behavior
     * stiffness - The stiffness of the spring controls the amount of force applied on the object.
     * damping - The damping ratio of the string reduces oscillations
     * axisIndependent - Ensures the object's spinning motion is parallel to the push direction.
     *
     * @example
     * ```
     * var physEnt = this.props.obj1.as(hz.PhysicalEntity);
     * this.connectBroadcastEvent(hz.World.onUpdate, (data: { deltaTime: number }) => {
     *  physEnt.springSpinTowardRotation(this.props.obj2.rotation.get(), {stiffness: 10, damping: 0.5, axisIndependent: false});
     * })
     * ```
     */
    springSpinTowardRotation(rotation: Quaternion, options?: Partial<SpringOptions>): void;
}
export declare class GrabbableEntity extends Entity {
    toString(): string;
    forceHold(player: Player, hand: Handedness, allowRelease: boolean): void;
    forceRelease(): void;
    setWhoCanGrab(players: Array<Player>): void;
}
export declare enum AttachablePlayerAnchor {
    Head = "Head",
    Torso = "Torso"
}
export declare class AttachableEntity extends Entity {
    toString(): string;
    attachToPlayer(player: Player, anchor: AttachablePlayerAnchor): void;
    detach(): void;
}
export declare class AnimatedEntity extends Entity {
    toString(): string;
    play(): void;
    pause(): void;
    stop(): void;
}
export declare enum PlayerBodyPartType {
    Head = "Head",
    Foot = "Foot",
    Torso = "Torso",
    LeftHand = "LeftHand",
    RightHand = "RightHand"
}
export declare enum Handedness {
    Left = "Left",
    Right = "Right"
}
export declare enum HapticStrength {
    VeryLight = "VeryLight",
    Light = "Light",
    Medium = "Medium",
    Strong = "Strong"
}
export declare enum HapticSharpness {
    Sharp = "Sharp",
    Coarse = "Coarse",
    Soft = "Soft"
}
export declare enum EntityInteractionMode {
    Grabbable = "Grabbable",
    Physics = "Physics",
    Both = "Both"
}
declare class PlayerBodyPart {
    protected readonly player: Player;
    protected readonly type: PlayerBodyPartType;
    constructor(player: Player, type: PlayerBodyPartType);
    position: ReadableHorizonProperty<Vec3>;
    /**
     * Position relative to the player torso.
     */
    localPosition: ReadableHorizonProperty<Vec3>;
    rotation: ReadableHorizonProperty<Quaternion>;
    /**
     * Rotation relative to the player torso.
     */
    localRotation: ReadableHorizonProperty<Quaternion>;
    forward: ReadableHorizonProperty<Vec3>;
    up: ReadableHorizonProperty<Vec3>;
    /**
     * Alias for position and localPosition property getters.
     * @param space - whether to get world or local position
     * @returns
     */
    getPosition(space: Space): Vec3;
    /**
     * Alias for rotation and localRotation property getters.
     * @param space - whether to get world or local rotation
     * @returns
     */
    getRotation(space: Space): Quaternion;
}
export declare class PlayerHand extends PlayerBodyPart {
    protected readonly handedness: Handedness;
    constructor(player: Player, handedness: Handedness);
    /**
     * Plays haptics on the specified hand
     * @param duration - Duration in MS
     * @param strength - Strength of haptics to play
     * @param sharpness - Sharpness of the haptics
     */
    playHaptics(duration: number, strength: HapticStrength, sharpness: HapticSharpness): void;
}
export declare const VoipSettingValues: {
    readonly Default: "Default";
    readonly Global: "Global";
    readonly Nearby: "Nearby";
    readonly Extended: "Extended";
    readonly Whisper: "Whisper";
    readonly Mute: "Mute";
};
/**
 * VOIP settings affect the player's in-game voice chat settings and include the following:
 * 'Default' - "Your voice setting has been set back to the world default."
 * 'Global' - "Everyone in this world can now hear you."
 * 'Nearby' - "Only people nearby can hear you."
 * 'Extended' - "Your voice now travels farther in this world."
 * 'Whisper' - "Only people next to you can hear you."
 * 'Mute' - "Voices are turned off."
 */
export declare type VoipSetting = keyof typeof VoipSettingValues;
export declare enum PlayerDeviceType {
    VR = "VR",
    Mobile = "Mobile",
    Desktop = "Desktop"
}
export declare class Player {
    private _hzType;
    readonly id: number;
    private static _cache;
    constructor(id: number);
    toString(): string;
    head: PlayerBodyPart;
    torso: PlayerBodyPart;
    foot: PlayerBodyPart;
    leftHand: PlayerHand;
    rightHand: PlayerHand;
    position: HorizonProperty<Vec3>;
    rotation: ReadableHorizonProperty<Quaternion>;
    forward: ReadableHorizonProperty<Vec3>;
    up: ReadableHorizonProperty<Vec3>;
    name: ReadableHorizonProperty<string>;
    /**
     * Each player is assigned an index when they join the game in the range [0, \{Max Players - 1\}]. The index can be used to identify each player with world.getPlayerFromIndex() and can be a useful tool for keeping track of players.
     */
    index: ReadableHorizonProperty<number>;
    velocity: HorizonProperty<Vec3>;
    gravity: HorizonProperty<number>;
    locomotionSpeed: WritableHorizonProperty<number>;
    /**
     * Get the type of device the player is using.
     * Handling a 'default' case in a switch statement is recommended as new types may be added in the future
     */
    deviceType: ReadableHorizonProperty<PlayerDeviceType>;
    /**
     * Checks whether a player is in build mode or not. Useful for debugging.
     */
    isInBuildMode: ReadableHorizonProperty<boolean>;
    applyForce(force: Vec3): void;
    /**
     * Sets the enabled collision layers for physical hands
     * @param collideWithDynamicObjects - Enables physical hands colliding with dynamic objects
     * @param collideWithStaticObjects - Enables physical hands colliding with static objects
     */
    configurePhysicalHands(collideWithDynamicObjects: boolean, collideWithStaticObjects: boolean): void;
    /**
     * Sets the VOIP setting for the player
     * @param setting - VOIP settings includes the following:
     * 'Default' - "Your voice setting has been set back to the world default."
     * 'Global' - "Everyone in this world can now hear you."
     * 'Nearby' - "Only people nearby can hear you."
     * 'Extended' - "Your voice now travels farther in this world."
     * 'Whisper' - "Only people next to you can hear you."
     * 'Mute' - "Voices are turned off."
     */
    setVoipSetting(setting: VoipSetting): void;
    /**
     * Checks whether or not a player has an achievement
     * @param achievementScriptID - The scriptID of the achievement. This can be accessed/set on the Achievements page in the VR creator UI.
     * @returns True if the player has the achievement, false otherwise.
     *
     * @example
     * var WonAGameAchievementScriptID = "wonAGame"
     * var hasAchievement = player.hasCompletedAchievement(WonAGameAchievementScriptID)
     */
    hasCompletedAchievement(achievementScriptID: string): boolean;
    /**
     * Sets an achievement to complete/incomplete for the player
     * @param achievementScriptID - The scriptID of the achievement. This can be accessed/set on the Achievements page in the VR creator UI.
     * @param complete - Whether or not the achievement is completed
     *
     * @example
     * var WonAGameAchievementScriptID = "wonAGame"
     * player.setAchievementComplete(WonAGameAchievementScriptID, true)
     */
    setAchievementComplete(achievementScriptID: string, complete: boolean): void;
}
export declare class Asset {
    private _hzType;
    readonly id: number;
    private static _cache;
    constructor(id: number);
    toString(): string;
}
declare enum WorldUpdateType {
    Update = "Update",
    PrePhysicsUpdate = "PrePhysicsUpdate"
}
export declare type PopupOptions = {
    position: Vec3;
    fontSize: number;
    fontColor: Color;
    backgroundColor: Color;
    playSound: boolean;
    showTimer: boolean;
};
export declare const DefaultPopupOptions: {
    position: Vec3;
    fontSize: number;
    fontColor: Color;
    backgroundColor: Color;
    playSound: boolean;
    showTimer: boolean;
};
interface IWorld {
    reset(): void;
}
export declare class World implements IWorld {
    /**
     * Event broadcasted on every frame
     * deltaTime is the time since the last update in seconds
     */
    static readonly onUpdate: HorizonEvent<{
        deltaTime: number;
    }>;
    /**
     * Event broadcasted on every frame before physics
     * deltaTime is the time since the last update in seconds
     */
    static readonly onPrePhysicsUpdate: HorizonEvent<{
        deltaTime: number;
    }>;
    toString(): string;
    reset(): void;
    /**
     * Get the server player
     * @returns Server player
     */
    getServerPlayer(): Player;
    getLocalPlayer(): Player;
    /**
     * Get the player corresponding to some playerIndex
     * @param playerIndex - The index of the player. Retrievable with player.index.get()
     * @returns The player corresponding to that index, or null if no player exists at that index.
     */
    getPlayerFromIndex(playerIndex: number): Player | null;
    /**
     * Gets all players currently in the world, not including the server player.
     * @returns An array of players in the world.
     */
    getPlayers(): Player[];
    /**
     * Spawns an asset async
     * @param asset - the asset to spawn
     * @param position - position to spawn the asset at
     * @param rotation - rotation of spawned asset.  If invalid, will be sanitized to Quaternion.one (no rotation)
     * @param scale - scale of spawned asset
     * @returns promise resolving to all of the root entities within the asset
     */
    spawnAsset(asset: Asset, position: Vec3, rotation?: Quaternion, scale?: Vec3): Promise<Entity[]>;
    /**
     * Removes a previously spawned asset from the world
     * @param entity - previously spawned entity
     * @param fullDelete - if true, entity must be the root object, and will cause all subobjects to also be deleted
     * @returns promise that resolves when the entity has been deleted
     */
    deleteAsset(entity: Entity, fullDelete?: boolean): Promise<undefined>;
    /**
     * Called on every frame
     * @param updateType - type of update
     * @param deltaTime - time since last frame in seconds
     */
    update(updateType: WorldUpdateType, deltaTime: number): undefined;
    leaderboards: {
        /**
         * Sets leaderboard score for a player
         * @param leaderboardName - Name of the leader board
         * @param player - player to update the score for
         * @param score -
         * @param override - overrides previous score if set to true
         */
        setScoreForPlayer(leaderboardName: string, player: Player, score: number, override: boolean): void;
    };
    persistentStorage: {
        /**
         * Gets a persistent player variable
         * @param player -
         * @param key - Variable key
         */
        getPlayerVariable(player: Player, key: string): number;
        /**
         * Sets a persistent player variable
         * @param player -
         * @param key - Variable key
         * @param value - Variable value
         */
        setPlayerVariable(player: Player, key: string, value: number): void;
    };
    ui: {
        /**
         * Shows a popup modal to all players
         * @param text - the text to display in the popup
         * @param displayTime - the amount of time (in seconds) to display the popup
         * @param options - configuration for popup UI (eg color, position, showTimer)
         */
        showPopupForEveryone(text: string, displayTime: number, options?: Partial<PopupOptions>): void;
        /**
         * Shows a popup modal to the given player
         * @param player - player to display the popup to
         * @param text - the text to display in the popup
         * @param displayTime - the amount of time (in seconds) to display the popup
         * @param options - configuration for popup UI (eg color, position, showTimer)
         */
        showPopupForPlayer(player: Player, text: string, displayTime: number, options?: Partial<PopupOptions>): void;
    };
}
declare type BuiltInVariableTypeArray = Array<number> | Array<string> | Array<boolean> | Array<Vec3> | Array<Color> | Array<Entity> | Array<Quaternion> | Array<Player> | Array<Asset>;
export declare type BuiltInVariableType = number | string | boolean | Vec3 | Color | Entity | Quaternion | Player | Asset | BuiltInVariableTypeArray;
declare type StringifiedBuiltInVariable<T extends BuiltInVariableType> = T extends number ? 'number' : T extends string ? 'string' : T extends boolean ? 'boolean' : T extends Vec3 ? 'Vec3' : T extends Color ? 'Color' : T extends Entity ? 'Entity' : T extends Quaternion ? 'Quaternion' : T extends Player ? 'Player' : T extends Asset ? 'Asset' : T extends Array<number> ? 'Array<number>' : T extends Array<string> ? 'Array<string>' : T extends Array<boolean> ? 'Array<boolean>' : T extends Array<Vec3> ? 'Array<Vec3>' : T extends Array<Color> ? 'Array<Color>' : T extends Array<Entity> ? 'Array<Entity>' : T extends Array<Quaternion> ? 'Array<Quaternion>' : T extends Array<Player> ? 'Array<Player>' : T extends Array<Asset> ? 'Array<Asset>' : never;
/**
 * Props used to initialize a Component
 * This is the script variable data that is sent from the UI
 */
export declare type ComponentProps = {
    [key: string]: BuiltInVariableType;
};
/**
 * State transferred to the new owner on ownership change
 * Implement the receiveOwnership and transferOwnership methods
 */
export declare type SerializableState = {
    [key: string]: SerializableState;
} | SerializableState[] | number | boolean | string | null;
/**
 * Structure of expected properties that are used to initialize a Component
 * This is use to provide inputs on instances in the UI
 */
export declare type PropsDefinition<T extends ComponentProps> = {
    [key in keyof T]: {
        type: StringifiedBuiltInVariable<T[key]>;
        default?: T[key];
    };
};
declare type IComponent<TProps extends ComponentProps> = {
    new (): Component<TProps>;
    propsDefinition: PropsDefinition<TProps>;
};
/**
 * Built in CodeBlock events
 */
export declare const CodeBlockEvents: {
    OnPlayerEnterTrigger: CodeBlockEvent<[enteredBy: Player]>;
    OnPlayerExitTrigger: CodeBlockEvent<[exitedBy: Player]>;
    OnEntityEnterTrigger: CodeBlockEvent<[enteredBy: Entity]>;
    OnEntityExitTrigger: CodeBlockEvent<[enteredBy: Entity]>;
    OnPlayerCollision: CodeBlockEvent<[collidedWith: Player, collisionAt: Vec3, normal: Vec3, relativeVelocity: Vec3, localColliderName: string, OtherColliderName: string]>;
    OnEntityCollision: CodeBlockEvent<[collidedWith: Entity, collisionAt: Vec3, normal: Vec3, relativeVelocity: Vec3, localColliderName: string, OtherColliderName: string]>;
    OnPlayerEnterWorld: CodeBlockEvent<[player: Player]>;
    OnPlayerExitWorld: CodeBlockEvent<[player: Player]>;
    OnGrabStart: CodeBlockEvent<[isRightHand: boolean, player: Player]>;
    OnGrabEnd: CodeBlockEvent<[player: Player]>;
    OnMultiGrabStart: CodeBlockEvent<[player: Player]>;
    OnMultiGrabEnd: CodeBlockEvent<[player: Player]>;
    OnIndexTriggerDown: CodeBlockEvent<[player: Player]>;
    OnIndexTriggerUp: CodeBlockEvent<[player: Player]>;
    OnButton1Down: CodeBlockEvent<[player: Player]>;
    OnButton1Up: CodeBlockEvent<[player: Player]>;
    OnButton2Down: CodeBlockEvent<[player: Player]>;
    OnButton2Up: CodeBlockEvent<[player: Player]>;
    OnAttachStart: CodeBlockEvent<[player: Player]>;
    OnAttachEnd: CodeBlockEvent<[player: Player]>;
    OnProjectileLaunched: CodeBlockEvent<[]>;
    OnProjectileHitPlayer: CodeBlockEvent<[playerHit: Player, position: Vec3, normal: Vec3, headshot: boolean]>;
    OnProjectileHitObject: CodeBlockEvent<[objectHit: Entity, position: Vec3, normal: Vec3]>;
    OnProjectileHitWorld: CodeBlockEvent<[position: Vec3, normal: Vec3]>;
    OnAchievementComplete: CodeBlockEvent<[player: Player, scriptId: string]>;
    OnItemPurchaseSucceeded: CodeBlockEvent<[player: Player, item: string]>;
    OnItemPurchaseFailed: CodeBlockEvent<[player: Player, item: string]>;
    OnPlayerConsumeSucceeded: CodeBlockEvent<[player: Player, item: string]>;
    OnPlayerConsumeFailed: CodeBlockEvent<[player: Player, item: string]>;
    OnPlayerSpawnedItem: CodeBlockEvent<[player: Player, item: Entity]>;
    OnAssetSpawned: CodeBlockEvent<[entity: Entity, asset: Asset]>;
    OnAssetDespawned: CodeBlockEvent<[entity: Entity, asset: Asset]>;
    OnAssetSpawnFailed: CodeBlockEvent<[asset: Asset]>;
    OnAudioCompleted: CodeBlockEvent<[]>;
};
declare type TimerHandler = (...args: unknown[]) => void;
/**
 * Base component class
 */
export declare abstract class Component<TProps extends ComponentProps = ComponentProps, TSerializableState extends SerializableState = SerializableState> {
    private eventSubscriptions;
    private timeoutIds;
    private intervalIds;
    readonly entityId: number;
    readonly props: TProps;
    /**
     * The entity the component is attached to
     */
    readonly entity: Entity;
    /**
     * The Horizon world
     */
    readonly world: World;
    private init;
    /**
     * Called when the component is started
     */
    abstract start(): void;
    /**
     * Called when the component is cleaned up.
     *
     * Subscriptions registered via `connectCodeBlockEvent`, `connectBroadcastEvent` and
     * `connectEntityEvent` as well as timers registered via the `async` APIs will be
     * cleaned up automatically.
     */
    dispose(): void;
    /**
     * Sends an event using the existing/legacy event system. These events are networked automatically.
     * The event will be sent and handled asynchronously
     * @param targetEntity - target to send the event to
     * @param event - CodeBlockEvent
     * @param args - data to send the event
     */
    sendCodeBlockEvent<TPayload extends BuiltInVariableType[]>(targetEntity: Entity, event: CodeBlockEvent<TPayload>, ...args: TPayload): void;
    /**
     * Called when receiving the specified CodeBlock event from the given target
     * @param targetEntity - the target to listen to
     * @param event - CodeBlockEvent
     * @param callback - called when the event is received with any data as arguments
     */
    connectCodeBlockEvent<TEventArgs extends BuiltInVariableType[], TCallbackArgs extends TEventArgs>(targetEntity: Entity, event: CodeBlockEvent<TEventArgs>, callback: (...payload: TCallbackArgs) => void): EventSubscription;
    /**
     * Sends an event locally to a specific entity - NOT networked
     * The event will be sent immediately; this function does not return until delivery has completed
     * @param targetEntity - target to send the event to
     * @param event - HorizonEvent
     * @param args - data to send the event
     */
    sendEntityEvent<TPayload extends LocalEventData, TData extends TPayload>(targetEntity: Entity, event: HorizonEvent<TPayload>, data: TData): void;
    /**
     * Called when receiving the specified local event from the given target
     * @param targetEntity - the target to listen to
     * @param event - HorizonEvent
     * @param callback - called when the event is received with any data as arguments
     */
    connectEntityEvent<TPayload extends LocalEventData>(targetEntity: Entity, event: HorizonEvent<TPayload>, callback: (payload: TPayload) => void): EventSubscription;
    /**
     * Sends an event locally to all listeners - NOT networked
     * The event will be sent immediately; this function does not return until delivery has completed
     * @param event - HorizonEvent
     * @param args - data to send the event
     */
    sendBroadcastEvent<TPayload extends LocalEventData, TData extends TPayload>(event: HorizonEvent<TPayload>, data: TData): void;
    /**
     * Called when receiving the specified local event
     * @param event - HorizonEvent
     * @param callback - called when the event is received with any data as arguments
     */
    connectBroadcastEvent<TPayload extends LocalEventData>(event: HorizonEvent<TPayload>, callback: (payload: TPayload) => void): EventSubscription;
    /**
     * When the script's ownership is being transferred to a new owner,
     * the new owner can receive some serializable state from the prior owner.
     *
     * @example
     * ```
     * type Props = {initialAmmo: number};
     * type State = {ammo: number};
     * class WeaponWithAmmo extends Component<Props, State> {
     *   static propsDefinition: PropsDefinition<Props> = {
     *     initialAmmo: {type: PropTypes.Number, default: 20},
     *   };
     *   private ammo: number = 0;
     *   start() {
     *     this.ammo = this.props.initialAmmo;
     *   }
     *   receiveOwnership(state: State | null, fromPlayer: Player, toPlayer: Player) {
     *     this.ammo = state?.ammo ?? this.ammo;
     *   }
     *   transferOwnership(fromPlayer: Player, toPlayer: Player): State {
     *     return {ammo: this.ammo};
     *   }
     * }
     * ```
     *
     * @param serializableState - serializable state from prior owner, or null if that state was not valid
     * @param oldOwner - the prior owner
     * @param newOwner - the current owner
     */
    receiveOwnership(serializableState: TSerializableState | null, oldOwner: Player, newOwner: Player): void;
    /**
     * When the script's ownership is being transferred to a new owner,
     * it has the opportunity to condense its state into a serializable
     * format that will be passed to the next owner.
     *
     * @example
     * ```
     * type Props = {initialAmmo: number};
     * type State = {ammo: number};
     * class WeaponWithAmmo extends Component<Props, State> {
     *   static propsDefinition: PropsDefinition<Props> = {
     *     initialAmmo: {type: PropTypes.Number, default: 20},
     *   };
     *   private ammo: number = 0;
     *   start() {
     *     this.ammo = this.props.initialAmmo;
     *   }
     *   receiveOwnership(state: State | null, fromPlayer: Player, toPlayer: Player) {
     *     this.ammo = state?.ammo ?? this.ammo;
     *   }
     *   transferOwnership(fromPlayer: Player, toPlayer: Player): State {
     *     return {ammo: this.ammo};
     *   }
     * }
     * ```
     *
     * @param oldOwner - the prior owner
     * @param newOwner - the current owner
     * @returns serializable state to transfer to new owner
     */
    transferOwnership(oldOwner: Player, newOwner: Player): TSerializableState;
    /**
     * Async helpers. Scoped to the component for automatic cleanup on dispose
     */
    async: {
        /**
         * Sets a timer which executes a function or specified piece of code once the timer expires.
         * @param callback - A function to be compiled and executed after the timer expires.
         * @param timeout - The time, in milliseconds that the timer should wait before the specified function or code is executed.
         * If this parameter is omitted, a value of 0 is used, meaning execute "immediately", or more accurately, the next event cycle.
         * @param args - Additional arguments which are passed through to the function specified by callback.
         * @returns The returned timeoutID is a positive integer value which identifies the timer created by the call to setTimeout().
         * This value can be passed to clearTimeout() to cancel the timeout. It is guaranteed that a timeoutID value will never be reused
         * by a subsequent call to setTimeout() or setInterval() on the same object (a window or a worker)
         */
        setTimeout: (callback: TimerHandler, timeout?: number, ...args: unknown[]) => number;
        /**
         * Cancels a timeout previously established by calling setTimeout().
         * If the parameter provided does not identify a previously established action, this method does nothing.
         * @param id - The identifier of the timeout you want to cancel. This ID was returned by the corresponding call to setTimeout().
         */
        clearTimeout: (id: number) => void;
        /**
         * Repeatedly calls a function or executes a code snippet, with a fixed time delay between each call.
         * @param callback - A function to be compiled and executed every timeout milliseconds.
         * The first execution happens after delay milliseconds.
         * @param timeout - (optional) The time, in milliseconds (thousandths of a second), the timer should delay
         * in between executions of the specified function or code. Defaults to 0 if not specified.
         * @param arguments - (optional) Additional arguments which are passed through to the function specified by callback.
         * @returns The returned intervalID is a numeric, non-zero value which identifies the timer created by the call to setInterval();
         * this value can be passed to clearInterval() to cancel the interval.
         */
        setInterval: (callback: TimerHandler, timeout?: number, ...args: unknown[]) => number;
        /**
         * Cancels a timed, repeating action which was previously established by a call to setInterval().
         * If the parameter provided does not identify a previously established action, this method does nothing.
         * @param id - The identifier of the repeated action you want to cancel. This ID was returned by the corresponding call to setInterval().
         */
        clearInterval: (id: number) => void;
    };
    /**
     * Registers a component definition such that it can be attached to an object in the UI
     * @param componentClass - The Typescript class of the component
     * @param componentName - Name of component as you want it to show in the UI
     */
    static register<TProps extends ComponentProps, T extends IComponent<TProps>>(componentClass: T, componentName?: string): void;
    /**
     * Defines a structure of properties that this component takes as input (should mirror props)
     * This will show up in the UI as available properties
     */
    static propsDefinition: PropsDefinition<ComponentProps>;
}
export {};
 
}
declare module 'InternalUtils' {
 /**
 * (c) Meta Platforms, Inc. and affiliates. Confidential and proprietary.
 */
export declare const MAX_STRING_LENGTH = 1000;
export declare function sliceStringIntoArray(value: string, chunkSize?: number): Array<string>;
 
}
declare module '@early_access_api/test_bridge' {
 /**
 * (c) Meta Platforms, Inc. and affiliates. Confidential and proprietary.
 *
 * @format
 * @generated
 */
import { Player } from '@early_access_api/v1';
export declare enum CameraDirection {
    SELFIE = "SELFIE",
    FORWARD = "FORWARD"
}
export declare enum CameraOrientation {
    LANDSCAPE = "LANDSCAPE",
    PORTRAIT = "PORTRAIT"
}
export declare enum KeyCode {
    None = "None",
    Backspace = "Backspace",
    Tab = "Tab",
    Clear = "Clear",
    Return = "Return",
    Pause = "Pause",
    Escape = "Escape",
    Space = "Space",
    Exclaim = "Exclaim",
    DoubleQuote = "DoubleQuote",
    Hash = "Hash",
    Dollar = "Dollar",
    Percent = "Percent",
    Ampersand = "Ampersand",
    Quote = "Quote",
    LeftParen = "LeftParen",
    RightParen = "RightParen",
    Asterisk = "Asterisk",
    Plus = "Plus",
    Comma = "Comma",
    Minus = "Minus",
    Period = "Period",
    Slash = "Slash",
    Alpha0 = "Alpha0",
    Alpha1 = "Alpha1",
    Alpha2 = "Alpha2",
    Alpha3 = "Alpha3",
    Alpha4 = "Alpha4",
    Alpha5 = "Alpha5",
    Alpha6 = "Alpha6",
    Alpha7 = "Alpha7",
    Alpha8 = "Alpha8",
    Alpha9 = "Alpha9",
    Colon = "Colon",
    Semicolon = "Semicolon",
    Less = "Less",
    Equals = "Equals",
    Greater = "Greater",
    Question = "Question",
    At = "At",
    LeftBracket = "LeftBracket",
    Backslash = "Backslash",
    RightBracket = "RightBracket",
    Caret = "Caret",
    Underscore = "Underscore",
    BackQuote = "BackQuote",
    A = "A",
    B = "B",
    C = "C",
    D = "D",
    E = "E",
    F = "F",
    G = "G",
    H = "H",
    I = "I",
    J = "J",
    K = "K",
    L = "L",
    M = "M",
    N = "N",
    O = "O",
    P = "P",
    Q = "Q",
    R = "R",
    S = "S",
    T = "T",
    U = "U",
    V = "V",
    W = "W",
    X = "X",
    Y = "Y",
    Z = "Z",
    LeftCurlyBracket = "LeftCurlyBracket",
    Pipe = "Pipe",
    RightCurlyBracket = "RightCurlyBracket",
    Tilde = "Tilde",
    Delete = "Delete",
    Keypad0 = "Keypad0",
    Keypad1 = "Keypad1",
    Keypad2 = "Keypad2",
    Keypad3 = "Keypad3",
    Keypad4 = "Keypad4",
    Keypad5 = "Keypad5",
    Keypad6 = "Keypad6",
    Keypad7 = "Keypad7",
    Keypad8 = "Keypad8",
    Keypad9 = "Keypad9",
    KeypadPeriod = "KeypadPeriod",
    KeypadDivide = "KeypadDivide",
    KeypadMultiply = "KeypadMultiply",
    KeypadMinus = "KeypadMinus",
    KeypadPlus = "KeypadPlus",
    KeypadEnter = "KeypadEnter",
    KeypadEquals = "KeypadEquals",
    UpArrow = "UpArrow",
    DownArrow = "DownArrow",
    RightArrow = "RightArrow",
    LeftArrow = "LeftArrow",
    Insert = "Insert",
    Home = "Home",
    End = "End",
    PageUp = "PageUp",
    PageDown = "PageDown",
    F1 = "F1",
    F2 = "F2",
    F3 = "F3",
    F4 = "F4",
    F5 = "F5",
    F6 = "F6",
    F7 = "F7",
    F8 = "F8",
    F9 = "F9",
    F10 = "F10",
    F11 = "F11",
    F12 = "F12",
    F13 = "F13",
    F14 = "F14",
    F15 = "F15",
    Numlock = "Numlock",
    CapsLock = "CapsLock",
    ScrollLock = "ScrollLock",
    RightShift = "RightShift",
    LeftShift = "LeftShift",
    RightControl = "RightControl",
    LeftControl = "LeftControl",
    RightAlt = "RightAlt",
    LeftAlt = "LeftAlt",
    RightMeta = "RightMeta",
    RightCommand = "RightCommand",
    RightApple = "RightApple",
    LeftMeta = "LeftMeta",
    LeftCommand = "LeftCommand",
    LeftApple = "LeftApple",
    LeftWindows = "LeftWindows",
    RightWindows = "RightWindows",
    AltGr = "AltGr",
    Help = "Help",
    Print = "Print",
    SysReq = "SysReq",
    Break = "Break",
    Menu = "Menu",
    Mouse0 = "Mouse0",
    Mouse1 = "Mouse1",
    Mouse2 = "Mouse2",
    Mouse3 = "Mouse3",
    Mouse4 = "Mouse4",
    Mouse5 = "Mouse5",
    Mouse6 = "Mouse6",
    JoystickButton0 = "JoystickButton0",
    JoystickButton1 = "JoystickButton1",
    JoystickButton2 = "JoystickButton2",
    JoystickButton3 = "JoystickButton3",
    JoystickButton4 = "JoystickButton4",
    JoystickButton5 = "JoystickButton5",
    JoystickButton6 = "JoystickButton6",
    JoystickButton7 = "JoystickButton7",
    JoystickButton8 = "JoystickButton8",
    JoystickButton9 = "JoystickButton9",
    JoystickButton10 = "JoystickButton10",
    JoystickButton11 = "JoystickButton11",
    JoystickButton12 = "JoystickButton12",
    JoystickButton13 = "JoystickButton13",
    JoystickButton14 = "JoystickButton14",
    JoystickButton15 = "JoystickButton15",
    JoystickButton16 = "JoystickButton16",
    JoystickButton17 = "JoystickButton17",
    JoystickButton18 = "JoystickButton18",
    JoystickButton19 = "JoystickButton19",
    Joystick1Button0 = "Joystick1Button0",
    Joystick1Button1 = "Joystick1Button1",
    Joystick1Button2 = "Joystick1Button2",
    Joystick1Button3 = "Joystick1Button3",
    Joystick1Button4 = "Joystick1Button4",
    Joystick1Button5 = "Joystick1Button5",
    Joystick1Button6 = "Joystick1Button6",
    Joystick1Button7 = "Joystick1Button7",
    Joystick1Button8 = "Joystick1Button8",
    Joystick1Button9 = "Joystick1Button9",
    Joystick1Button10 = "Joystick1Button10",
    Joystick1Button11 = "Joystick1Button11",
    Joystick1Button12 = "Joystick1Button12",
    Joystick1Button13 = "Joystick1Button13",
    Joystick1Button14 = "Joystick1Button14",
    Joystick1Button15 = "Joystick1Button15",
    Joystick1Button16 = "Joystick1Button16",
    Joystick1Button17 = "Joystick1Button17",
    Joystick1Button18 = "Joystick1Button18",
    Joystick1Button19 = "Joystick1Button19",
    Joystick2Button0 = "Joystick2Button0",
    Joystick2Button1 = "Joystick2Button1",
    Joystick2Button2 = "Joystick2Button2",
    Joystick2Button3 = "Joystick2Button3",
    Joystick2Button4 = "Joystick2Button4",
    Joystick2Button5 = "Joystick2Button5",
    Joystick2Button6 = "Joystick2Button6",
    Joystick2Button7 = "Joystick2Button7",
    Joystick2Button8 = "Joystick2Button8",
    Joystick2Button9 = "Joystick2Button9",
    Joystick2Button10 = "Joystick2Button10",
    Joystick2Button11 = "Joystick2Button11",
    Joystick2Button12 = "Joystick2Button12",
    Joystick2Button13 = "Joystick2Button13",
    Joystick2Button14 = "Joystick2Button14",
    Joystick2Button15 = "Joystick2Button15",
    Joystick2Button16 = "Joystick2Button16",
    Joystick2Button17 = "Joystick2Button17",
    Joystick2Button18 = "Joystick2Button18",
    Joystick2Button19 = "Joystick2Button19",
    Joystick3Button0 = "Joystick3Button0",
    Joystick3Button1 = "Joystick3Button1",
    Joystick3Button2 = "Joystick3Button2",
    Joystick3Button3 = "Joystick3Button3",
    Joystick3Button4 = "Joystick3Button4",
    Joystick3Button5 = "Joystick3Button5",
    Joystick3Button6 = "Joystick3Button6",
    Joystick3Button7 = "Joystick3Button7",
    Joystick3Button8 = "Joystick3Button8",
    Joystick3Button9 = "Joystick3Button9",
    Joystick3Button10 = "Joystick3Button10",
    Joystick3Button11 = "Joystick3Button11",
    Joystick3Button12 = "Joystick3Button12",
    Joystick3Button13 = "Joystick3Button13",
    Joystick3Button14 = "Joystick3Button14",
    Joystick3Button15 = "Joystick3Button15",
    Joystick3Button16 = "Joystick3Button16",
    Joystick3Button17 = "Joystick3Button17",
    Joystick3Button18 = "Joystick3Button18",
    Joystick3Button19 = "Joystick3Button19",
    Joystick4Button0 = "Joystick4Button0",
    Joystick4Button1 = "Joystick4Button1",
    Joystick4Button2 = "Joystick4Button2",
    Joystick4Button3 = "Joystick4Button3",
    Joystick4Button4 = "Joystick4Button4",
    Joystick4Button5 = "Joystick4Button5",
    Joystick4Button6 = "Joystick4Button6",
    Joystick4Button7 = "Joystick4Button7",
    Joystick4Button8 = "Joystick4Button8",
    Joystick4Button9 = "Joystick4Button9",
    Joystick4Button10 = "Joystick4Button10",
    Joystick4Button11 = "Joystick4Button11",
    Joystick4Button12 = "Joystick4Button12",
    Joystick4Button13 = "Joystick4Button13",
    Joystick4Button14 = "Joystick4Button14",
    Joystick4Button15 = "Joystick4Button15",
    Joystick4Button16 = "Joystick4Button16",
    Joystick4Button17 = "Joystick4Button17",
    Joystick4Button18 = "Joystick4Button18",
    Joystick4Button19 = "Joystick4Button19",
    Joystick5Button0 = "Joystick5Button0",
    Joystick5Button1 = "Joystick5Button1",
    Joystick5Button2 = "Joystick5Button2",
    Joystick5Button3 = "Joystick5Button3",
    Joystick5Button4 = "Joystick5Button4",
    Joystick5Button5 = "Joystick5Button5",
    Joystick5Button6 = "Joystick5Button6",
    Joystick5Button7 = "Joystick5Button7",
    Joystick5Button8 = "Joystick5Button8",
    Joystick5Button9 = "Joystick5Button9",
    Joystick5Button10 = "Joystick5Button10",
    Joystick5Button11 = "Joystick5Button11",
    Joystick5Button12 = "Joystick5Button12",
    Joystick5Button13 = "Joystick5Button13",
    Joystick5Button14 = "Joystick5Button14",
    Joystick5Button15 = "Joystick5Button15",
    Joystick5Button16 = "Joystick5Button16",
    Joystick5Button17 = "Joystick5Button17",
    Joystick5Button18 = "Joystick5Button18",
    Joystick5Button19 = "Joystick5Button19",
    Joystick6Button0 = "Joystick6Button0",
    Joystick6Button1 = "Joystick6Button1",
    Joystick6Button2 = "Joystick6Button2",
    Joystick6Button3 = "Joystick6Button3",
    Joystick6Button4 = "Joystick6Button4",
    Joystick6Button5 = "Joystick6Button5",
    Joystick6Button6 = "Joystick6Button6",
    Joystick6Button7 = "Joystick6Button7",
    Joystick6Button8 = "Joystick6Button8",
    Joystick6Button9 = "Joystick6Button9",
    Joystick6Button10 = "Joystick6Button10",
    Joystick6Button11 = "Joystick6Button11",
    Joystick6Button12 = "Joystick6Button12",
    Joystick6Button13 = "Joystick6Button13",
    Joystick6Button14 = "Joystick6Button14",
    Joystick6Button15 = "Joystick6Button15",
    Joystick6Button16 = "Joystick6Button16",
    Joystick6Button17 = "Joystick6Button17",
    Joystick6Button18 = "Joystick6Button18",
    Joystick6Button19 = "Joystick6Button19",
    Joystick7Button0 = "Joystick7Button0",
    Joystick7Button1 = "Joystick7Button1",
    Joystick7Button2 = "Joystick7Button2",
    Joystick7Button3 = "Joystick7Button3",
    Joystick7Button4 = "Joystick7Button4",
    Joystick7Button5 = "Joystick7Button5",
    Joystick7Button6 = "Joystick7Button6",
    Joystick7Button7 = "Joystick7Button7",
    Joystick7Button8 = "Joystick7Button8",
    Joystick7Button9 = "Joystick7Button9",
    Joystick7Button10 = "Joystick7Button10",
    Joystick7Button11 = "Joystick7Button11",
    Joystick7Button12 = "Joystick7Button12",
    Joystick7Button13 = "Joystick7Button13",
    Joystick7Button14 = "Joystick7Button14",
    Joystick7Button15 = "Joystick7Button15",
    Joystick7Button16 = "Joystick7Button16",
    Joystick7Button17 = "Joystick7Button17",
    Joystick7Button18 = "Joystick7Button18",
    Joystick7Button19 = "Joystick7Button19",
    Joystick8Button0 = "Joystick8Button0",
    Joystick8Button1 = "Joystick8Button1",
    Joystick8Button2 = "Joystick8Button2",
    Joystick8Button3 = "Joystick8Button3",
    Joystick8Button4 = "Joystick8Button4",
    Joystick8Button5 = "Joystick8Button5",
    Joystick8Button6 = "Joystick8Button6",
    Joystick8Button7 = "Joystick8Button7",
    Joystick8Button8 = "Joystick8Button8",
    Joystick8Button9 = "Joystick8Button9",
    Joystick8Button10 = "Joystick8Button10",
    Joystick8Button11 = "Joystick8Button11",
    Joystick8Button12 = "Joystick8Button12",
    Joystick8Button13 = "Joystick8Button13",
    Joystick8Button14 = "Joystick8Button14",
    Joystick8Button15 = "Joystick8Button15",
    Joystick8Button16 = "Joystick8Button16",
    Joystick8Button17 = "Joystick8Button17",
    Joystick8Button18 = "Joystick8Button18",
    Joystick8Button19 = "Joystick8Button19"
}
export declare enum PlayerBodyPart {
    Head = "Head",
    Foot = "Foot",
    Torso = "Torso",
    LeftHand = "LeftHand",
    RightHand = "RightHand"
}
export declare enum Handedness {
    LEFT = "LEFT",
    RIGHT = "RIGHT",
    BOTH = "BOTH"
}
export declare enum LocomotionType {
    DEFAULT = "DEFAULT",
    JOYSTICK = "JOYSTICK",
    TELEPORTATION = "TELEPORTATION",
    VIRTUAL_JOYSTICK = "VIRTUAL_JOYSTICK",
    CUSTOM = "CUSTOM",
    NONE = "NONE"
}
export declare enum EditorMode {
    BUILD = "BUILD",
    PREVIEW = "PREVIEW",
    NONE = "NONE"
}
export declare enum WBEntityType {
    None = "None",
    EntityGroup = "EntityGroup",
    Mesh = "Mesh",
    Selection = "Selection",
    SpawnPoint = "SpawnPoint",
    Trigger = "Trigger",
    Environment = "Environment",
    Player = "Player",
    StaticMesh = "StaticMesh",
    StaticLocalMesh = "StaticLocalMesh",
    CreatorDebugGizmo = "CreatorDebugGizmo",
    MusicPlayer = "MusicPlayer",
    Trimesh = "Trimesh",
    SphereCollider = "SphereCollider",
    BoxCollider = "BoxCollider",
    CapsuleCollider = "CapsuleCollider",
    PrototypeDoor = "PrototypeDoor",
    PrototypeSoundRecorder = "PrototypeSoundRecorder",
    Script = "Script",
    PrototypeTextLabel = "PrototypeTextLabel",
    PrototypeLayeredMusicSequencer = "PrototypeLayeredMusicSequencer",
    PrototypeAmbientAudio = "PrototypeAmbientAudio",
    PrototypeSoundFx = "PrototypeSoundFx",
    PrototypeParticleFx = "PrototypeParticleFx",
    PrototypeTrailFx = "PrototypeTrailFx",
    PrototypeLight = "PrototypeLight",
    AudioGraph = "AudioGraph",
    PrototypeSUI = "PrototypeSUI",
    PrototypeNUX = "PrototypeNUX",
    PrototypeSUIStatic = "PrototypeSUIStatic",
    PrototypeSUIV2Static = "PrototypeSUIV2Static",
    PrototypeToy = "PrototypeToy",
    NPC = "NPC",
    Raycast = "Raycast",
    ProjectileLauncher = "ProjectileLauncher",
    EndGameZone = "EndGameZone",
    StartGameZone = "StartGameZone",
    WorldLeaderboard = "WorldLeaderboard",
    GoalsPanel = "GoalsPanel",
    VideoPlayer = "VideoPlayer",
    ScheduledVideoPlayer = "ScheduledVideoPlayer",
    EmoteEmitter = "EmoteEmitter",
    SnapDestination = "SnapDestination",
    AvatarMirror = "AvatarMirror",
    UserInterface = "UserInterface",
    NodeGraph = "NodeGraph",
    ActivityKitPanel = "ActivityKitPanel",
    IWPSeller = "IWPSeller",
    MusicPlaylistPanel = "MusicPlaylistPanel",
    VenuesDoor = "VenuesDoor",
    PUINUXTutorial = "PUINUXTutorial",
    AssetVolume = "AssetVolume",
    Image = "Image",
    WelcomeBoard = "WelcomeBoard",
    VentanaFrame = "VentanaFrame",
    AvatarPlayback = "AvatarPlayback",
    CloudGamingScreen = "CloudGamingScreen",
    GreetingCardPanel = "GreetingCardPanel",
    PictureFrame = "PictureFrame",
    SingleAvatarPlayback = "SingleAvatarPlayback",
    DevPractice = "DevPractice",
    GLTFMesh = "GLTFMesh",
    PhotoBooth = "PhotoBooth",
    CreatorRules = "CreatorRules",
    UnityAssetBundleGizmo = "UnityAssetBundleGizmo",
    ConnectionCTA = "ConnectionCTA",
    ExternalTravelZone = "ExternalTravelZone"
}
export declare enum FxPlayState {
    UNINITIALIZED = "UNINITIALIZED",
    PLAYING = "PLAYING",
    STOPPED = "STOPPED",
    FINISHED = "FINISHED"
}
export declare enum WBLocomotionMode {
    AVATAR = "AVATAR",
    BUILDER = "BUILDER",
    HOME_EDIT = "HOME_EDIT",
    BUILDER_CAMERA = "BUILDER_CAMERA"
}
export declare enum ScriptCompilationState {
    Compiled = "Compiled",
    NotCompiled = "NotCompiled"
}
export declare enum ManipulationDirection {
    Left = "Left",
    Right = "Right",
    Down = "Down",
    Up = "Up",
    Back = "Back",
    Forward = "Forward",
    None = "None"
}
export declare enum ManipulationType {
    None = "None",
    Translate = "Translate",
    AxisTranslate = "AxisTranslate",
    AxisRotate = "AxisRotate",
    AxisScale = "AxisScale",
    Delete = "Delete",
    Color = "Color",
    Select = "Select",
    CodeBlock = "CodeBlock",
    Lock = "Lock",
    Block = "Block",
    Snap = "Snap",
    Panel = "Panel",
    WiresNode = "WiresNode",
    WiresNodeDefinition = "WiresNodeDefinition",
    WiresWire = "WiresWire"
}
export declare enum ScriptSourceType {
    CodeBlocks = "CodeBlocks",
    TypeScript = "TypeScript"
}
export declare enum TestServiceEnum {
    VALUE_1 = "VALUE_1",
    VALUE_2 = "VALUE_2"
}
export declare class PlatformService {
    private _session;
    static onMaster(): PlatformService;
    static onClient(): PlatformService;
    static on(session: Player): PlatformService;
    constructor(session: Player);
    static isRunningAsDesktopDevice(): Promise<boolean>;
    isRunningAsDesktopDevice(): Promise<boolean>;
    static isVREnabled(): Promise<boolean>;
    isVREnabled(): Promise<boolean>;
    static switchToDesktop(): Promise<void>;
    switchToDesktop(): Promise<void>;
}
export declare class ResourcePressureService {
    private _session;
    static onMaster(): ResourcePressureService;
    static onClient(): ResourcePressureService;
    static on(session: Player): ResourcePressureService;
    constructor(session: Player);
    static startMemoryPressure(managedBufferSizeMb?: number, nativeBufferSizeMb?: number): Promise<void>;
    startMemoryPressure(managedBufferSizeMb?: number, nativeBufferSizeMb?: number): Promise<void>;
    static stopMemoryPressure(): Promise<void>;
    stopMemoryPressure(): Promise<void>;
}
export declare class WearableSpawnerService {
    private _session;
    static onMaster(): WearableSpawnerService;
    static onClient(): WearableSpawnerService;
    static on(session: Player): WearableSpawnerService;
    constructor(session: Player);
    static toggleWearableGauntlet(): Promise<void>;
    toggleWearableGauntlet(): Promise<void>;
}
export declare class InputActions {
    private _session;
    static onMaster(): InputActions;
    static onClient(): InputActions;
    static on(session: Player): InputActions;
    constructor(session: Player);
    static sendButtonAction(assemblyName: string | null, actionType: string | null): Promise<void>;
    sendButtonAction(assemblyName: string | null, actionType: string | null): Promise<void>;
}
export declare class LiveModServiceV2 {
    private _session;
    static onMaster(): LiveModServiceV2;
    static onClient(): LiveModServiceV2;
    static on(session: Player): LiveModServiceV2;
    constructor(session: Player);
    static goToWelcomeIsland(): Promise<void>;
    goToWelcomeIsland(): Promise<void>;
    static isShowingBystanders(): Promise<boolean>;
    isShowingBystanders(): Promise<boolean>;
    static moveToSubject(): Promise<void>;
    moveToSubject(): Promise<void>;
    static setSubjectID(subjectIdStr: string | null): Promise<void>;
    setSubjectID(subjectIdStr: string | null): Promise<void>;
    static subjectPlayerExists(): Promise<boolean>;
    subjectPlayerExists(): Promise<boolean>;
    static toggleBystanders(showBystanders: boolean): Promise<void>;
    toggleBystanders(showBystanders: boolean): Promise<void>;
    static travelToSubject(): Promise<void>;
    travelToSubject(): Promise<void>;
}
export declare class LiveModUIV2 {
    private _session;
    static onMaster(): LiveModUIV2;
    static onClient(): LiveModUIV2;
    static on(session: Player): LiveModUIV2;
    constructor(session: Player);
    static isShowingTeleportToSubjectButton(): Promise<boolean>;
    isShowingTeleportToSubjectButton(): Promise<boolean>;
    static isShowingTravelToWorldButton(): Promise<boolean>;
    isShowingTravelToWorldButton(): Promise<boolean>;
    static reset(): Promise<void>;
    reset(): Promise<void>;
}
export declare class OVRLoadingScene {
    private _session;
    static onMaster(): OVRLoadingScene;
    static onClient(): OVRLoadingScene;
    static on(session: Player): OVRLoadingScene;
    constructor(session: Player);
    static getLoadingScreenPluginTexture(): Promise<boolean>;
    getLoadingScreenPluginTexture(): Promise<boolean>;
}
export declare class PerformanceDisplay {
    private _session;
    static onMaster(): PerformanceDisplay;
    static onClient(): PerformanceDisplay;
    static on(session: Player): PerformanceDisplay;
    constructor(session: Player);
    static isFPSCheckerActive(): Promise<boolean>;
    isFPSCheckerActive(): Promise<boolean>;
    static isGraphyActive(): Promise<boolean>;
    isGraphyActive(): Promise<boolean>;
    static setFPSCheckerActive(active: boolean): Promise<void>;
    setFPSCheckerActive(active: boolean): Promise<void>;
    static setGraphyActive(active: boolean): Promise<void>;
    setGraphyActive(active: boolean): Promise<void>;
}
export declare class PlayerManager {
    private _session;
    static onMaster(): PlayerManager;
    static onClient(): PlayerManager;
    static on(session: Player): PlayerManager;
    constructor(session: Player);
    static getLocalPlayerTogetherId(): Promise<string | null>;
    getLocalPlayerTogetherId(): Promise<string | null>;
}
export declare class LightweightVoipVertsService {
    private _session;
    static onMaster(): LightweightVoipVertsService;
    static onClient(): LightweightVoipVertsService;
    static on(session: Player): LightweightVoipVertsService;
    constructor(session: Player);
    static readAvailablePcmData(): Promise<number[]>;
    readAvailablePcmData(): Promise<number[]>;
    static startE2EVoipPcmLogger(): Promise<boolean>;
    startE2EVoipPcmLogger(): Promise<boolean>;
}
export declare class OVRVoipMicrophoneInput {
    private _session;
    static onMaster(): OVRVoipMicrophoneInput;
    static onClient(): OVRVoipMicrophoneInput;
    static on(session: Player): OVRVoipMicrophoneInput;
    constructor(session: Player);
    static mute(val: boolean): Promise<void>;
    mute(val: boolean): Promise<void>;
    static sendBeepThroughE2EMic(): Promise<void>;
    sendBeepThroughE2EMic(): Promise<void>;
    static switchToE2EMic(): Promise<void>;
    switchToE2EMic(): Promise<void>;
}
export declare class BroadcastCameraService {
    private _session;
    static onMaster(): BroadcastCameraService;
    static onClient(): BroadcastCameraService;
    static on(session: Player): BroadcastCameraService;
    constructor(session: Player);
    static checkVideoThumbnailExistGauntlet(): Promise<boolean>;
    checkVideoThumbnailExistGauntlet(): Promise<boolean>;
    static completeCameraNUXForTest(): Promise<void>;
    completeCameraNUXForTest(): Promise<void>;
    static isCameraDirection(direction: CameraDirection): Promise<boolean>;
    isCameraDirection(direction: CameraDirection): Promise<boolean>;
    static isCameraOrientation(orientation: CameraOrientation): Promise<boolean>;
    isCameraOrientation(orientation: CameraOrientation): Promise<boolean>;
    static toggleSelfieStickGauntlet(worldType: string | null, source: string | null): Promise<void>;
    toggleSelfieStickGauntlet(worldType: string | null, source: string | null): Promise<void>;
}
export declare class HorizonAuthManagerService {
    private _session;
    static onMaster(): HorizonAuthManagerService;
    static onClient(): HorizonAuthManagerService;
    static on(session: Player): HorizonAuthManagerService;
    constructor(session: Player);
    static provideAccessToken(token: string | null): Promise<boolean>;
    provideAccessToken(token: string | null): Promise<boolean>;
}
export declare class CogitoWorldObservationService {
    private _session;
    static onMaster(): CogitoWorldObservationService;
    static onClient(): CogitoWorldObservationService;
    static on(session: Player): CogitoWorldObservationService;
    constructor(session: Player);
    static getDynamicLayerFromIndex(index: number): Promise<string | null>;
    getDynamicLayerFromIndex(index: number): Promise<string | null>;
    static getDynamicLayers(): Promise<any>;
    getDynamicLayers(): Promise<any>;
    static getEntityData(entityId: string | null): Promise<any>;
    getEntityData(entityId: string | null): Promise<any>;
    static getScriptContents(scriptEntityId: string | null): Promise<any>;
    getScriptContents(scriptEntityId: string | null): Promise<any>;
    static getScriptInstances(): Promise<any>;
    getScriptInstances(): Promise<any>;
    static getWorldBounds(minExtent: number[]): Promise<any>;
    getWorldBounds(minExtent: number[]): Promise<any>;
    static overlapBox(center: number[], halfExtents: number[], rotation: number[], layerMask: number): Promise<any[]>;
    overlapBox(center: number[], halfExtents: number[], rotation: number[], layerMask: number): Promise<any[]>;
    static overlapSphere(center: number[], radius: number, layerMask: number): Promise<any[]>;
    overlapSphere(center: number[], radius: number, layerMask: number): Promise<any[]>;
    static raycast(origin: number[], direction: number[], maxDistance: number, layerMask: number): Promise<any>;
    raycast(origin: number[], direction: number[], maxDistance: number, layerMask: number): Promise<any>;
}
export declare class GauntletUnityDevTestHelperBridge {
    private _session;
    static onMaster(): GauntletUnityDevTestHelperBridge;
    static onClient(): GauntletUnityDevTestHelperBridge;
    static on(session: Player): GauntletUnityDevTestHelperBridge;
    constructor(session: Player);
    static getLocalAccessTokenIfInEditor(): Promise<string | null>;
    getLocalAccessTokenIfInEditor(): Promise<string | null>;
    static getLocalUserIdIfInEditor(): Promise<string | null>;
    getLocalUserIdIfInEditor(): Promise<string | null>;
    static isUnityEditor(): Promise<boolean>;
    isUnityEditor(): Promise<boolean>;
}
export declare class RenderToolKitGauntletBridge {
    private _session;
    static onMaster(): RenderToolKitGauntletBridge;
    static onClient(): RenderToolKitGauntletBridge;
    static on(session: Player): RenderToolKitGauntletBridge;
    constructor(session: Player);
    static addExtraCPU(scale: number): Promise<void>;
    addExtraCPU(scale: number): Promise<void>;
    static validateBatching(): Promise<string | null>;
    validateBatching(): Promise<string | null>;
}
export declare class HorizonReactBundleService {
    private _session;
    static onMaster(): HorizonReactBundleService;
    static onClient(): HorizonReactBundleService;
    static on(session: Player): HorizonReactBundleService;
    constructor(session: Player);
    static getUICameraScreenPositionForTag(componentTag: number): Promise<number[] | null>;
    getUICameraScreenPositionForTag(componentTag: number): Promise<number[] | null>;
    static getUnityWorldPositionForTag(componentTag: number): Promise<number[] | null>;
    getUnityWorldPositionForTag(componentTag: number): Promise<number[] | null>;
}
export declare class PlayerSpawner {
    private _session;
    static onMaster(): PlayerSpawner;
    static onClient(): PlayerSpawner;
    static on(session: Player): PlayerSpawner;
    constructor(session: Player);
    static spawnTestPlayersInViewAsync(testPlayerCount: number, withLegs: boolean): Promise<void>;
    spawnTestPlayersInViewAsync(testPlayerCount: number, withLegs: boolean): Promise<void>;
}
export declare class DebugBridgeVRModule {
    private _session;
    static onMaster(): DebugBridgeVRModule;
    static onClient(): DebugBridgeVRModule;
    static on(session: Player): DebugBridgeVRModule;
    constructor(session: Player);
    static spawnTenRemoteTestPlayersInCircle(): Promise<void>;
    spawnTenRemoteTestPlayersInCircle(): Promise<void>;
    static spawnTenRemoteTestPlayersInCircleWithLegs(): Promise<void>;
    spawnTenRemoteTestPlayersInCircleWithLegs(): Promise<void>;
}
export declare class DesktopCameraService {
    private _session;
    static onMaster(): DesktopCameraService;
    static onClient(): DesktopCameraService;
    static on(session: Player): DesktopCameraService;
    constructor(session: Player);
    static getFocalLength(): Promise<number>;
    getFocalLength(): Promise<number>;
    static getMaxFocalLength(): Promise<number>;
    getMaxFocalLength(): Promise<number>;
    static getMinFocalLength(): Promise<number>;
    getMinFocalLength(): Promise<number>;
    static getScreenPointFromViewport(viewportPoint: number[]): Promise<number[]>;
    getScreenPointFromViewport(viewportPoint: number[]): Promise<number[]>;
    static getScreenPointFromWorldPoint(worldPoint: number[]): Promise<number[]>;
    getScreenPointFromWorldPoint(worldPoint: number[]): Promise<number[]>;
}
export declare class DesktopControlService {
    private _session;
    static onMaster(): DesktopControlService;
    static onClient(): DesktopControlService;
    static on(session: Player): DesktopControlService;
    constructor(session: Player);
    static pushTextInput(playerId: number, inputText: string | null): Promise<void>;
    pushTextInput(playerId: number, inputText: string | null): Promise<void>;
    static sendCameraLookEvent(playerId: number, val: number[]): Promise<void>;
    sendCameraLookEvent(playerId: number, val: number[]): Promise<void>;
    static sendCameraPanEvent(playerId: number, val: number[]): Promise<void>;
    sendCameraPanEvent(playerId: number, val: number[]): Promise<void>;
    static sendCursorMoveEvent(playerId: number, val: number[]): Promise<void>;
    sendCursorMoveEvent(playerId: number, val: number[]): Promise<void>;
    static sendCursorPressEvent(playerId: number, isPressed: boolean, isSecondary?: boolean): Promise<void>;
    sendCursorPressEvent(playerId: number, isPressed: boolean, isSecondary?: boolean): Promise<void>;
    static sendKeyboardClick(playerId: number, key: KeyCode): Promise<void>;
    sendKeyboardClick(playerId: number, key: KeyCode): Promise<void>;
    static sendMouseButtonClick(playerId: number, button: number): Promise<void>;
    sendMouseButtonClick(playerId: number, button: number): Promise<void>;
    static sendZoomEvent(playerId: number, val: number[]): Promise<void>;
    sendZoomEvent(playerId: number, val: number[]): Promise<void>;
    static setKeyDown(playerId: number, key: KeyCode, down: boolean): Promise<void>;
    setKeyDown(playerId: number, key: KeyCode, down: boolean): Promise<void>;
    static setMouseButtonDown(playerId: number, button: number, down: boolean): Promise<void>;
    setMouseButtonDown(playerId: number, button: number, down: boolean): Promise<void>;
    static setMouseLookMoveInput(playerId: number, moveRate: number[]): Promise<void>;
    setMouseLookMoveInput(playerId: number, moveRate: number[]): Promise<void>;
    static setMousePosition(playerId: number, position: number[]): Promise<void>;
    setMousePosition(playerId: number, position: number[]): Promise<void>;
    static setMouseScrollInput(playerId: number, scrollRate: number[]): Promise<void>;
    setMouseScrollInput(playerId: number, scrollRate: number[]): Promise<void>;
    static unsetMousePosition(playerId: number): Promise<void>;
    unsetMousePosition(playerId: number): Promise<void>;
}
export declare class EntityControlService {
    private _session;
    static onMaster(): EntityControlService;
    static onClient(): EntityControlService;
    static on(session: Player): EntityControlService;
    constructor(session: Player);
    static getEntityPosition(entityId: string): Promise<number[] | null>;
    getEntityPosition(entityId: string): Promise<number[] | null>;
}
export declare class PlayerControlService {
    private _session;
    static onMaster(): PlayerControlService;
    static onClient(): PlayerControlService;
    static on(session: Player): PlayerControlService;
    constructor(session: Player);
    static addPlayerVelocity(playerId: number, velocity: number[]): Promise<void>;
    addPlayerVelocity(playerId: number, velocity: number[]): Promise<void>;
    static cancelAllInputSends(playerId: number): Promise<void>;
    cancelAllInputSends(playerId: number): Promise<void>;
    static getAllPlayerIds(): Promise<number[]>;
    getAllPlayerIds(): Promise<number[]>;
    static getBodyPartLocalPosition(playerId: number, part: PlayerBodyPart): Promise<number[]>;
    getBodyPartLocalPosition(playerId: number, part: PlayerBodyPart): Promise<number[]>;
    static getBodyPartLocalRotation(playerId: number, part: PlayerBodyPart): Promise<number[]>;
    getBodyPartLocalRotation(playerId: number, part: PlayerBodyPart): Promise<number[]>;
    static getBodyPartPosition(playerId: number, part: PlayerBodyPart): Promise<number[]>;
    getBodyPartPosition(playerId: number, part: PlayerBodyPart): Promise<number[]>;
    static getBodyPartRotation(playerId: number, part: PlayerBodyPart): Promise<number[]>;
    getBodyPartRotation(playerId: number, part: PlayerBodyPart): Promise<number[]>;
    static getGrabbedEntityId(playerId: number, hand: Handedness): Promise<string | null>;
    getGrabbedEntityId(playerId: number, hand: Handedness): Promise<string | null>;
    static getLocalPlayerId(): Promise<number>;
    getLocalPlayerId(): Promise<number>;
    static getPlayerHeadForward(playerId: number): Promise<number[]>;
    getPlayerHeadForward(playerId: number): Promise<number[]>;
    static getPlayerHeadPosition(playerId: number): Promise<number[]>;
    getPlayerHeadPosition(playerId: number): Promise<number[]>;
    static getPlayerHeadRight(playerId: number): Promise<number[]>;
    getPlayerHeadRight(playerId: number): Promise<number[]>;
    static getPlayerHeadUp(playerId: number): Promise<number[]>;
    getPlayerHeadUp(playerId: number): Promise<number[]>;
    static getPlayerPosition(playerId: number): Promise<number[]>;
    getPlayerPosition(playerId: number): Promise<number[]>;
    static getPlayerRotation(playerId: number): Promise<number[]>;
    getPlayerRotation(playerId: number): Promise<number[]>;
    static localForceSimulateProdBuildEnabled(playerId: number, enabled: boolean): Promise<void>;
    localForceSimulateProdBuildEnabled(playerId: number, enabled: boolean): Promise<void>;
    static localOverrideCustomLocomotionEnabled(playerId: number, enabled: boolean): Promise<void>;
    localOverrideCustomLocomotionEnabled(playerId: number, enabled: boolean): Promise<void>;
    static pushTextInput(playerId: number, inputText: string | null): Promise<void>;
    pushTextInput(playerId: number, inputText: string | null): Promise<void>;
    static send2DGrabEndInput(playerId: number): Promise<void>;
    send2DGrabEndInput(playerId: number): Promise<void>;
    static send2DGrabStartInput(playerId: number): Promise<void>;
    send2DGrabStartInput(playerId: number): Promise<void>;
    static send2DThrowCancelInput(playerId: number): Promise<void>;
    send2DThrowCancelInput(playerId: number): Promise<void>;
    static send2DThrowChargeInput(playerId: number): Promise<void>;
    send2DThrowChargeInput(playerId: number): Promise<void>;
    static send2DThrowReleaseInput(playerId: number): Promise<void>;
    send2DThrowReleaseInput(playerId: number): Promise<void>;
    static sendGripButtonGameplayClick(playerId: number, hand: Handedness): Promise<void>;
    sendGripButtonGameplayClick(playerId: number, hand: Handedness): Promise<void>;
    static sendGripButtonGameplayInput(playerId: number, hand: Handedness, buttonDown: boolean): Promise<void>;
    sendGripButtonGameplayInput(playerId: number, hand: Handedness, buttonDown: boolean): Promise<void>;
    static sendJumpInput(playerId: number): Promise<void>;
    sendJumpInput(playerId: number): Promise<void>;
    static sendKeyboardClick(playerId: number, key: KeyCode): Promise<void>;
    sendKeyboardClick(playerId: number, key: KeyCode): Promise<void>;
    static sendMouseButtonClick(playerId: number, button: number): Promise<void>;
    sendMouseButtonClick(playerId: number, button: number): Promise<void>;
    static sendSmoothRotateInput(playerId: number, rate: number, seconds: number): Promise<void>;
    sendSmoothRotateInput(playerId: number, rate: number, seconds: number): Promise<void>;
    static sendSnapTurnInput(playerId: number, left: boolean): Promise<void>;
    sendSnapTurnInput(playerId: number, left: boolean): Promise<void>;
    static sendTeleportInput(playerId: number, startTeleport: boolean, hand: Handedness): Promise<void>;
    sendTeleportInput(playerId: number, startTeleport: boolean, hand: Handedness): Promise<void>;
    static sendTriggerButtonGameplayClick(playerId: number, hand: Handedness): Promise<void>;
    sendTriggerButtonGameplayClick(playerId: number, hand: Handedness): Promise<void>;
    static sendTriggerButtonGameplayInput(playerId: number, hand: Handedness, buttonDown: boolean): Promise<void>;
    sendTriggerButtonGameplayInput(playerId: number, hand: Handedness, buttonDown: boolean): Promise<void>;
    static sendTriggerButtonUIInput(playerId: number, hand: Handedness, inputValue?: number, duration?: number): Promise<void>;
    sendTriggerButtonUIInput(playerId: number, hand: Handedness, inputValue?: number, duration?: number): Promise<void>;
    static sendWalkInput(playerId: number, thumbstickVector: number[], seconds: number): Promise<void>;
    sendWalkInput(playerId: number, thumbstickVector: number[], seconds: number): Promise<void>;
    static setBodyPartLocalPosition(playerId: number, part: PlayerBodyPart, localPosition: number[]): Promise<void>;
    setBodyPartLocalPosition(playerId: number, part: PlayerBodyPart, localPosition: number[]): Promise<void>;
    static setBodyPartLocalRotation(playerId: number, part: PlayerBodyPart, localRotation: number[]): Promise<void>;
    setBodyPartLocalRotation(playerId: number, part: PlayerBodyPart, localRotation: number[]): Promise<void>;
    static setBodyPartPosition(playerId: number, part: PlayerBodyPart, position: number[]): Promise<void>;
    setBodyPartPosition(playerId: number, part: PlayerBodyPart, position: number[]): Promise<void>;
    static setBodyPartRotation(playerId: number, part: PlayerBodyPart, rotation: number[]): Promise<void>;
    setBodyPartRotation(playerId: number, part: PlayerBodyPart, rotation: number[]): Promise<void>;
    static setControllerStatus(playerId: number, hand: Handedness, isThumbUp: boolean, isPointing: boolean, trigger: number, gripTrigger: number): Promise<void>;
    setControllerStatus(playerId: number, hand: Handedness, isThumbUp: boolean, isPointing: boolean, trigger: number, gripTrigger: number): Promise<void>;
    static setKeyDown(playerId: number, key: KeyCode, down: boolean): Promise<void>;
    setKeyDown(playerId: number, key: KeyCode, down: boolean): Promise<void>;
    static setLocomotionType(playerId: number, locomotionType: LocomotionType): Promise<void>;
    setLocomotionType(playerId: number, locomotionType: LocomotionType): Promise<void>;
    static setMouseButtonDown(playerId: number, button: number, down: boolean): Promise<void>;
    setMouseButtonDown(playerId: number, button: number, down: boolean): Promise<void>;
    static setMouseLookMoveInput(playerId: number, moveRate: number[]): Promise<void>;
    setMouseLookMoveInput(playerId: number, moveRate: number[]): Promise<void>;
    static setMousePosition(playerId: number, position: number[]): Promise<void>;
    setMousePosition(playerId: number, position: number[]): Promise<void>;
    static setMouseScrollInput(playerId: number, scrollRate: number[]): Promise<void>;
    setMouseScrollInput(playerId: number, scrollRate: number[]): Promise<void>;
    static setPlayerPosition(playerId: number, position: number[]): Promise<void>;
    setPlayerPosition(playerId: number, position: number[]): Promise<void>;
    static setPlayerRotation(playerId: number, rotation: number[]): Promise<void>;
    setPlayerRotation(playerId: number, rotation: number[]): Promise<void>;
    static setPlayerVelocity(playerId: number, velocity: number[]): Promise<void>;
    setPlayerVelocity(playerId: number, velocity: number[]): Promise<void>;
    static setSmoothRotationEnabled(playerId: number, enabled: boolean): Promise<void>;
    setSmoothRotationEnabled(playerId: number, enabled: boolean): Promise<void>;
    static smoothMoveHandTo(playerId: number, hand: Handedness, position: number[], duration: number): Promise<void>;
    smoothMoveHandTo(playerId: number, hand: Handedness, position: number[], duration: number): Promise<void>;
    static smoothMoveHandToLocalPosition(playerId: number, hand: Handedness, localPosition: number[], duration: number): Promise<void>;
    smoothMoveHandToLocalPosition(playerId: number, hand: Handedness, localPosition: number[], duration: number): Promise<void>;
    static smoothRotateHandTo(playerId: number, hand: Handedness, rotation: number[], duration: number): Promise<void>;
    smoothRotateHandTo(playerId: number, hand: Handedness, rotation: number[], duration: number): Promise<void>;
    static smoothRotateHandToLocalRotation(playerId: number, hand: Handedness, localRotation: number[], duration: number): Promise<void>;
    smoothRotateHandToLocalRotation(playerId: number, hand: Handedness, localRotation: number[], duration: number): Promise<void>;
    static smoothRotateTo(playerId: number, forward: number[]): Promise<void>;
    smoothRotateTo(playerId: number, forward: number[]): Promise<void>;
    static startGroupTravel(playerId: number, worldId: string | null, masterSessionId: number): Promise<void>;
    startGroupTravel(playerId: number, worldId: string | null, masterSessionId: number): Promise<void>;
    static unsetMousePosition(playerId: number): Promise<void>;
    unsetMousePosition(playerId: number): Promise<void>;
    static walkTo(playerId: number, position: number[], timeoutSeconds: number): Promise<void>;
    walkTo(playerId: number, position: number[], timeoutSeconds: number): Promise<void>;
}
export declare class TestPlayersControlService {
    private _session;
    static onMaster(): TestPlayersControlService;
    static onClient(): TestPlayersControlService;
    static on(session: Player): TestPlayersControlService;
    constructor(session: Player);
    static destroyAllServerTestPlayers(): Promise<void>;
    destroyAllServerTestPlayers(): Promise<void>;
    static destroyServerTestPlayer(playerId: number): Promise<void>;
    destroyServerTestPlayer(playerId: number): Promise<void>;
    static spawnServerTestPlayer(position: number[], rotation: number[]): Promise<number>;
    spawnServerTestPlayer(position: number[], rotation: number[]): Promise<number>;
}
export declare class ScriptingTestRunner {
    private _session;
    static onMaster(): ScriptingTestRunner;
    static onClient(): ScriptingTestRunner;
    static on(session: Player): ScriptingTestRunner;
    constructor(session: Player);
    static getCompleteTestMethodCount(): Promise<number>;
    getCompleteTestMethodCount(): Promise<number>;
    static getJSONReport(): Promise<any>;
    getJSONReport(): Promise<any>;
    static getTestMethodCount(): Promise<number>;
    getTestMethodCount(): Promise<number>;
    static loadAdditionalScriptModule(moduleName: string | null): Promise<string | null>;
    loadAdditionalScriptModule(moduleName: string | null): Promise<string | null>;
    static runAllTests(): Promise<void>;
    runAllTests(): Promise<void>;
}
export declare class InventoryRuntimeIntegration {
    private _session;
    static onMaster(): InventoryRuntimeIntegration;
    static onClient(): InventoryRuntimeIntegration;
    static on(session: Player): InventoryRuntimeIntegration;
    constructor(session: Player);
    static getPayerAssetFirstRoot(playerId: number, assetId: string): Promise<string | null>;
    getPayerAssetFirstRoot(playerId: number, assetId: string): Promise<string | null>;
}
export declare class UnityAssetBundleScriptingHandler {
    private _session;
    static onMaster(): UnityAssetBundleScriptingHandler;
    static onClient(): UnityAssetBundleScriptingHandler;
    static on(session: Player): UnityAssetBundleScriptingHandler;
    constructor(session: Player);
    static getAnimationParameterBool(entityId: string | null, parameterName: string | null): Promise<boolean>;
    getAnimationParameterBool(entityId: string | null, parameterName: string | null): Promise<boolean>;
    static getAnimationParameterFloat(entityId: string | null, parameterName: string | null): Promise<number>;
    getAnimationParameterFloat(entityId: string | null, parameterName: string | null): Promise<number>;
}
export declare class WBEnvironmentService {
    private _session;
    static onMaster(): WBEnvironmentService;
    static onClient(): WBEnvironmentService;
    static on(session: Player): WBEnvironmentService;
    constructor(session: Player);
    static getCurrentLightingState(): Promise<number>;
    getCurrentLightingState(): Promise<number>;
    static updateEnvironment(lightingState: number, topColorValues: number[], middleColorValues: number[], bottomColorValues: number[], topExponent: number, bottomExponent: number, exposure: number, useGIContribution: boolean, giContribution: number, lightSaturation: number, rotation: number, skyboxType: number, fogColor: number[], useFogColor: boolean, fogDensity: number, isGridVisible: boolean, imageUri: string | null): Promise<void>;
    updateEnvironment(lightingState: number, topColorValues: number[], middleColorValues: number[], bottomColorValues: number[], topExponent: number, bottomExponent: number, exposure: number, useGIContribution: boolean, giContribution: number, lightSaturation: number, rotation: number, skyboxType: number, fogColor: number[], useFogColor: boolean, fogDensity: number, isGridVisible: boolean, imageUri: string | null): Promise<void>;
}
export declare class ColliderVisualizationService {
    private _session;
    static onMaster(): ColliderVisualizationService;
    static onClient(): ColliderVisualizationService;
    static on(session: Player): ColliderVisualizationService;
    constructor(session: Player);
    static getNumberOfActiveColliderVisuals(): Promise<number>;
    getNumberOfActiveColliderVisuals(): Promise<number>;
    static isColliderVisualizationEnabled(): Promise<boolean>;
    isColliderVisualizationEnabled(): Promise<boolean>;
    static toggleColliderVisualization(): Promise<void>;
    toggleColliderVisualization(): Promise<void>;
}
export declare class DesktopEditingService {
    private _session;
    static onMaster(): DesktopEditingService;
    static onClient(): DesktopEditingService;
    static on(session: Player): DesktopEditingService;
    constructor(session: Player);
    static getCurrentMode(): Promise<EditorMode>;
    getCurrentMode(): Promise<EditorMode>;
    static sendCameraLookEvent(playerId: number, val: number[]): Promise<void>;
    sendCameraLookEvent(playerId: number, val: number[]): Promise<void>;
    static sendCameraPanEvent(playerId: number, val: number[]): Promise<void>;
    sendCameraPanEvent(playerId: number, val: number[]): Promise<void>;
    static sendCursorMoveEvent(playerId: number, val: number[]): Promise<void>;
    sendCursorMoveEvent(playerId: number, val: number[]): Promise<void>;
    static sendCursorPressEvent(playerId: number, isPressed: boolean, isSecondary?: boolean): Promise<void>;
    sendCursorPressEvent(playerId: number, isPressed: boolean, isSecondary?: boolean): Promise<void>;
    static sendZoomEvent(playerId: number, val: number[]): Promise<void>;
    sendZoomEvent(playerId: number, val: number[]): Promise<void>;
}
export declare class StatsService {
    private _session;
    static onMaster(): StatsService;
    static onClient(): StatsService;
    static on(session: Player): StatsService;
    constructor(session: Player);
    static getCurrentWorldUserEntry(statKey: string | null, assigneeId: string): Promise<string | null>;
    getCurrentWorldUserEntry(statKey: string | null, assigneeId: string): Promise<string | null>;
    static getStatAssigneeIds(): Promise<(string | null)[]>;
    getStatAssigneeIds(): Promise<(string | null)[]>;
    static getWorldPersistentVariablesIds(): Promise<(string | null)[]>;
    getWorldPersistentVariablesIds(): Promise<(string | null)[]>;
    static getWorldPersistentVariablesNames(): Promise<(string | null)[]>;
    getWorldPersistentVariablesNames(): Promise<(string | null)[]>;
    static requestCreateStat(statName: string | null, contextId?: string, dataType?: string | null): Promise<boolean>;
    requestCreateStat(statName: string | null, contextId?: string, dataType?: string | null): Promise<boolean>;
    static requestDeleteStat(statId: string): Promise<boolean>;
    requestDeleteStat(statId: string): Promise<boolean>;
    static requestSetStatValueForStatAndAssignee(assigneeId: string, statId: string | null, statValue: string | null): Promise<boolean>;
    requestSetStatValueForStatAndAssignee(assigneeId: string, statId: string | null, statValue: string | null): Promise<boolean>;
    static requestUpdateStatName(statId: string, variableName: string | null): Promise<boolean>;
    requestUpdateStatName(statId: string, variableName: string | null): Promise<boolean>;
    static setIsGauntletTest(): Promise<void>;
    setIsGauntletTest(): Promise<void>;
}
export declare class PersonalUISpawner {
    private _session;
    static onMaster(): PersonalUISpawner;
    static onClient(): PersonalUISpawner;
    static on(session: Player): PersonalUISpawner;
    constructor(session: Player);
    static isPersonalUIOpen(): Promise<boolean>;
    isPersonalUIOpen(): Promise<boolean>;
    static setPersonalUIOpen(openPUI: boolean, initialRoute?: string | null): Promise<void>;
    setPersonalUIOpen(openPUI: boolean, initialRoute?: string | null): Promise<void>;
    static toggleSafeMode(): Promise<void>;
    toggleSafeMode(): Promise<void>;
}
export declare class DiskUI {
    private _session;
    static onMaster(): DiskUI;
    static onClient(): DiskUI;
    static on(session: Player): DiskUI;
    constructor(session: Player);
    static getDominantHandActiveQuickActionTooltip(): Promise<string | null>;
    getDominantHandActiveQuickActionTooltip(): Promise<string | null>;
    static inputDominantHandJoystick(joystick: number[]): Promise<void>;
    inputDominantHandJoystick(joystick: number[]): Promise<void>;
    static showCUI(show: boolean): Promise<void>;
    showCUI(show: boolean): Promise<void>;
}
export declare class Edit2GauntletHelperBridge {
    private _session;
    static onMaster(): Edit2GauntletHelperBridge;
    static onClient(): Edit2GauntletHelperBridge;
    static on(session: Player): Edit2GauntletHelperBridge;
    constructor(session: Player);
    static isEntityDynamic(legacyEntityID: string | null): Promise<boolean>;
    isEntityDynamic(legacyEntityID: string | null): Promise<boolean>;
    static tryEditGroup(groupEntityId: string): Promise<void>;
    tryEditGroup(groupEntityId: string): Promise<void>;
    static tryFinishEditGroup(): Promise<void>;
    tryFinishEditGroup(): Promise<void>;
}
export declare class EntityManager {
    private _session;
    static onMaster(): EntityManager;
    static onClient(): EntityManager;
    static on(session: Player): EntityManager;
    constructor(session: Player);
    static getAttachedScript(entityId: string | null): Promise<string | null>;
    getAttachedScript(entityId: string | null): Promise<string | null>;
    static getEntityInitialPosition(entityId: string | null): Promise<number[] | null>;
    getEntityInitialPosition(entityId: string | null): Promise<number[] | null>;
    static getIdsOfAllEntitiesOfType(entityType: WBEntityType): Promise<(string | null)[]>;
    getIdsOfAllEntitiesOfType(entityType: WBEntityType): Promise<(string | null)[]>;
    static sendMessageToEntityComponents(entityId: string | null, methodName: string | null): Promise<void>;
    sendMessageToEntityComponents(entityId: string | null, methodName: string | null): Promise<void>;
    static setAttachedScript(entityId: string | null, scriptId: string | null): Promise<void>;
    setAttachedScript(entityId: string | null, scriptId: string | null): Promise<void>;
    static spawnEntityAndGetComplexityCostMS(entityType: WBEntityType): Promise<number>;
    spawnEntityAndGetComplexityCostMS(entityType: WBEntityType): Promise<number>;
    static spawnEntityAndGetComplexityGeometryVertexCount(entityType: WBEntityType): Promise<number>;
    spawnEntityAndGetComplexityGeometryVertexCount(entityType: WBEntityType): Promise<number>;
    static spawnEntityAndGetComplexityUserAssetMemoryCostKB(entityType: WBEntityType): Promise<number>;
    spawnEntityAndGetComplexityUserAssetMemoryCostKB(entityType: WBEntityType): Promise<number>;
    static spawnEntityAndGetId(entityType: WBEntityType): Promise<string | null>;
    spawnEntityAndGetId(entityType: WBEntityType): Promise<string | null>;
    static spawnNewEntityAndGetId(entityType: string | null, position: number[], scale: number[], rotationEuler: number[], meshDefinitionId: string | null, audioAssetPropName: string | null, audioDisplayName: string | null, useScaleFixedValuesAndFlipRotation: boolean): Promise<string | null>;
    spawnNewEntityAndGetId(entityType: string | null, position: number[], scale: number[], rotationEuler: number[], meshDefinitionId: string | null, audioAssetPropName: string | null, audioDisplayName: string | null, useScaleFixedValuesAndFlipRotation: boolean): Promise<string | null>;
}
export declare class LegacySelectionManager {
    private _session;
    static onMaster(): LegacySelectionManager;
    static onClient(): LegacySelectionManager;
    static on(session: Player): LegacySelectionManager;
    constructor(session: Player);
    static getSelectedEntitiesIds(): Promise<(string | null)[]>;
    getSelectedEntitiesIds(): Promise<(string | null)[]>;
    static getSelectionEntityId(): Promise<string | null>;
    getSelectionEntityId(): Promise<string | null>;
}
export declare class ManipulationManager {
    private _session;
    static onMaster(): ManipulationManager;
    static onClient(): ManipulationManager;
    static on(session: Player): ManipulationManager;
    constructor(session: Player);
    static clearSelectedEntities(): Promise<void>;
    clearSelectedEntities(): Promise<void>;
    static duplicateEntity(entityId: string | null): Promise<void>;
    duplicateEntity(entityId: string | null): Promise<void>;
    static selectEntity(entityID: string | null): Promise<void>;
    selectEntity(entityID: string | null): Promise<void>;
    static setEntityTransform(entityId: string | null, position: number[], rotation: number[], localScale: number[]): Promise<void>;
    setEntityTransform(entityId: string | null, position: number[], rotation: number[], localScale: number[]): Promise<void>;
}
export declare class ParticleFxService {
    private _session;
    static onMaster(): ParticleFxService;
    static onClient(): ParticleFxService;
    static on(session: Player): ParticleFxService;
    constructor(session: Player);
    static getAllVFXEntities(): Promise<(string | null)[]>;
    getAllVFXEntities(): Promise<(string | null)[]>;
    static getVFXCurrentPlayState(entityId: string | null): Promise<FxPlayState>;
    getVFXCurrentPlayState(entityId: string | null): Promise<FxPlayState>;
    static getVFXIsLooping(entityId: string | null): Promise<boolean>;
    getVFXIsLooping(entityId: string | null): Promise<boolean>;
    static getVFXName(entityId: string | null): Promise<string | null>;
    getVFXName(entityId: string | null): Promise<string | null>;
    static getVFXOptions(entityId: string | null): Promise<(string | null)[]>;
    getVFXOptions(entityId: string | null): Promise<(string | null)[]>;
    static getVFXParametersJSON(entityId: string | null): Promise<string | null>;
    getVFXParametersJSON(entityId: string | null): Promise<string | null>;
    static getVFXPlaysOnStart(entityId: string | null): Promise<boolean>;
    getVFXPlaysOnStart(entityId: string | null): Promise<boolean>;
    static isVFXInitialized(entityId: string | null): Promise<boolean>;
    isVFXInitialized(entityId: string | null): Promise<boolean>;
    static playVFX(entityId: string | null, fromStart: boolean): Promise<void>;
    playVFX(entityId: string | null, fromStart: boolean): Promise<void>;
    static setVFXParameterBool(entityId: string | null, name: string | null, value: boolean): Promise<void>;
    setVFXParameterBool(entityId: string | null, name: string | null, value: boolean): Promise<void>;
    static setVFXParameterBoolVector(entityId: string | null, name: string | null, value: boolean[]): Promise<void>;
    setVFXParameterBoolVector(entityId: string | null, name: string | null, value: boolean[]): Promise<void>;
    static setVFXParameterNumber(entityId: string | null, name: string | null, value: number): Promise<void>;
    setVFXParameterNumber(entityId: string | null, name: string | null, value: number): Promise<void>;
    static setVFXParameterNumberVector(entityId: string | null, name: string | null, value: number[]): Promise<void>;
    setVFXParameterNumberVector(entityId: string | null, name: string | null, value: number[]): Promise<void>;
    static stopVFX(entityId: string | null): Promise<void>;
    stopVFX(entityId: string | null): Promise<void>;
}
export declare class SelectionManager {
    private _session;
    static onMaster(): SelectionManager;
    static onClient(): SelectionManager;
    static on(session: Player): SelectionManager;
    constructor(session: Player);
    static getSelectedEntitiesIds(): Promise<(string | null)[]>;
    getSelectedEntitiesIds(): Promise<(string | null)[]>;
    static getSelectionEntityId(): Promise<string | null>;
    getSelectionEntityId(): Promise<string | null>;
}
export declare class SelectionManager2 {
    private _session;
    static onMaster(): SelectionManager2;
    static onClient(): SelectionManager2;
    static on(session: Player): SelectionManager2;
    constructor(session: Player);
    static getSelectedEntitiesIds(): Promise<(string | null)[]>;
    getSelectedEntitiesIds(): Promise<(string | null)[]>;
    static getSelectionEntityId(): Promise<string | null>;
    getSelectionEntityId(): Promise<string | null>;
}
export declare class WBEditLocomotion {
    private _session;
    static onMaster(): WBEditLocomotion;
    static onClient(): WBEditLocomotion;
    static on(session: Player): WBEditLocomotion;
    constructor(session: Player);
    static getCurrentMode(): Promise<WBLocomotionMode>;
    getCurrentMode(): Promise<WBLocomotionMode>;
    static setLocalPlayerPosition(position: number[]): Promise<void>;
    setLocalPlayerPosition(position: number[]): Promise<void>;
}
export declare class WbGauntletHelperPlatformAgnostic {
    private _session;
    static onMaster(): WbGauntletHelperPlatformAgnostic;
    static onClient(): WbGauntletHelperPlatformAgnostic;
    static on(session: Player): WbGauntletHelperPlatformAgnostic;
    constructor(session: Player);
    static clearSelectedEntities(): Promise<void>;
    clearSelectedEntities(): Promise<void>;
    static compareExportNodes(filepath1: string | null, filepath2: string | null): Promise<boolean>;
    compareExportNodes(filepath1: string | null, filepath2: string | null): Promise<boolean>;
    static getAttachedScript(scriptEntityId: string | null): Promise<string | null>;
    getAttachedScript(scriptEntityId: string | null): Promise<string | null>;
    static getAttachedScriptComponentId(scriptEntityId: string | null): Promise<string | null>;
    getAttachedScriptComponentId(scriptEntityId: string | null): Promise<string | null>;
    static getEntityCount(): Promise<number>;
    getEntityCount(): Promise<number>;
    static getEntityInitialPosition(entityId: string | null): Promise<number[] | null>;
    getEntityInitialPosition(entityId: string | null): Promise<number[] | null>;
    static getEntityInitialRotation(entityId: string | null): Promise<number[] | null>;
    getEntityInitialRotation(entityId: string | null): Promise<number[] | null>;
    static getEntityInitialScale(entityId: string | null): Promise<number[] | null>;
    getEntityInitialScale(entityId: string | null): Promise<number[] | null>;
    static getNumberOfMaximizedEntityPanels(): Promise<number>;
    getNumberOfMaximizedEntityPanels(): Promise<number>;
    static getScriptCode(scriptEntityId: string | null): Promise<string | null>;
    getScriptCode(scriptEntityId: string | null): Promise<string | null>;
    static getScriptCompilationStatus(scriptEntityId: string | null): Promise<ScriptCompilationState | null>;
    getScriptCompilationStatus(scriptEntityId: string | null): Promise<ScriptCompilationState | null>;
    static getScriptId(scriptFriendlyName: string | null): Promise<string | null>;
    getScriptId(scriptFriendlyName: string | null): Promise<string | null>;
    static getScriptName(scriptEntityId: string | null): Promise<string | null>;
    getScriptName(scriptEntityId: string | null): Promise<string | null>;
    static getWorldPositionForHandle(handIndex: number, dir: ManipulationDirection, type: ManipulationType): Promise<number[]>;
    getWorldPositionForHandle(handIndex: number, dir: ManipulationDirection, type: ManipulationType): Promise<number[]>;
    static minimizeAllEntityPanels(): Promise<void>;
    minimizeAllEntityPanels(): Promise<void>;
    static setAttachedScript(scriptEntityId: string | null, scriptId: string | null, tsComponentId: string | null): Promise<void>;
    setAttachedScript(scriptEntityId: string | null, scriptId: string | null, tsComponentId: string | null): Promise<void>;
    static setScriptAst(scriptEntityId: string | null, astUsingBrackets: string | null): Promise<void>;
    setScriptAst(scriptEntityId: string | null, astUsingBrackets: string | null): Promise<void>;
    static setScriptCode(scriptEntityId: string | null, scriptCode: string | null): Promise<void>;
    setScriptCode(scriptEntityId: string | null, scriptCode: string | null): Promise<void>;
    static setScriptName(scriptEntityId: string | null, scriptName: string | null): Promise<void>;
    setScriptName(scriptEntityId: string | null, scriptName: string | null): Promise<void>;
    static setScriptVariableValueAsNumber(scriptEntityId: string | null, varName: string | null, varValue: number): Promise<void>;
    setScriptVariableValueAsNumber(scriptEntityId: string | null, varName: string | null, varValue: number): Promise<void>;
    static showPropertiesPanel(entityId: string | null, show: boolean): Promise<void>;
    showPropertiesPanel(entityId: string | null, show: boolean): Promise<void>;
    static spawnNewEntityAndGetId(entityType: string | null, position: number[], scale: number[], rotationEuler: number[], meshDefinitionId: string | null, audioAssetPropName: string | null, audioDisplayName: string | null, useScaleFixedValuesAndFlipRotation: boolean): Promise<string | null>;
    spawnNewEntityAndGetId(entityType: string | null, position: number[], scale: number[], rotationEuler: number[], meshDefinitionId: string | null, audioAssetPropName: string | null, audioDisplayName: string | null, useScaleFixedValuesAndFlipRotation: boolean): Promise<string | null>;
    static spawnNewScriptAndGetId(scriptSourceType: ScriptSourceType, position: number[], scale: number[], rotationEuler: number[]): Promise<string | null>;
    spawnNewScriptAndGetId(scriptSourceType: ScriptSourceType, position: number[], scale: number[], rotationEuler: number[]): Promise<string | null>;
}
export declare class TestInvocableService {
    private _session;
    static onMaster(): TestInvocableService;
    static onClient(): TestInvocableService;
    static on(session: Player): TestInvocableService;
    constructor(session: Player);
    static testAsync(testArg: number): Promise<number>;
    testAsync(testArg: number): Promise<number>;
    static testAsyncVoid(): Promise<void>;
    testAsyncVoid(): Promise<void>;
    static testBool(arg: boolean): Promise<boolean>;
    testBool(arg: boolean): Promise<boolean>;
    static testDouble(arg: number): Promise<number>;
    testDouble(arg: number): Promise<number>;
    static testEnum(arg: TestServiceEnum): Promise<TestServiceEnum>;
    testEnum(arg: TestServiceEnum): Promise<TestServiceEnum>;
    static testFloat(arg: number): Promise<number>;
    testFloat(arg: number): Promise<number>;
    static testInt(arg: number): Promise<number>;
    testInt(arg: number): Promise<number>;
    static testLong(arg: string): Promise<string>;
    testLong(arg: string): Promise<string>;
    static testQuaternion(arg: number[]): Promise<number[]>;
    testQuaternion(arg: number[]): Promise<number[]>;
    static testString(arg: string | null): Promise<string | null>;
    testString(arg: string | null): Promise<string | null>;
    static testUint(arg: number): Promise<number>;
    testUint(arg: number): Promise<number>;
    static testUlong(arg: string): Promise<string>;
    testUlong(arg: string): Promise<string>;
    static testVector2(arg: number[]): Promise<number[]>;
    testVector2(arg: number[]): Promise<number[]>;
    static testVector3(arg: number[]): Promise<number[]>;
    testVector3(arg: number[]): Promise<number[]>;
    static testVoid(): Promise<void>;
    testVoid(): Promise<void>;
}
export declare class PlayerEmoteController {
    private _session;
    static onMaster(): PlayerEmoteController;
    static onClient(): PlayerEmoteController;
    static on(session: Player): PlayerEmoteController;
    constructor(session: Player);
    static getIsEmoteActive(): Promise<boolean>;
    getIsEmoteActive(): Promise<boolean>;
}
 
}
declare module '@early_access_api/testing' {
 /**
 * (c) Meta Platforms, Inc. and affiliates. Confidential and proprietary.
 *
 * @format
 */
import { Component, Entity, Handedness, HorizonProperty, Vec3, Player, PlayerHand, Quaternion, Space } from '@early_access_api/v1';
export declare function getRuntimeEntityID(entity: Entity): unknown;
export declare class Pose {
    position?: Vec3;
    rotation?: Quaternion;
}
export declare class PlayerPose extends Pose {
    leftHandLocal?: Pose;
    rightHandLocal?: Pose;
    leftHandWorld?: Pose;
    rightHandWorld?: Pose;
}
declare class TestPlayerHand extends PlayerHand {
    constructor(player: TestPlayer, handedness: Handedness);
    position: HorizonProperty<Vec3>;
    /**
     * Position relative to the player torso.
     */
    localPosition: HorizonProperty<Vec3>;
    rotation: HorizonProperty<Quaternion>;
    /**
     * Rotation relative to the player torso.
     */
    localRotation: HorizonProperty<Quaternion>;
    /**
     * Alias for position and localPosition property setters.
     * @param position - world or local position to set
     * @param space - whether the position is a world or local position
     * @returns
     */
    setPosition(position: Vec3, space: Space): void;
    /**
     * Alias for rotation and localRotation property setters.
     * @param position - world or local rotation to set
     * @param space - whether the rotation is a world or local rotation
     * @returns
     */
    setRotation(rotation: Quaternion, space: Space): void;
    /**
     * Smoothly moves the hand to a position over time. Can be cancelled by
     * cancelInputs().
     * Can be cancelled by cancelInputs().
     * @param position - Position to move to.
     * @param duration - Time to take to move in seconds.
     * @param space - Whether the position is in local or world space.
     * @returns Promise resolves when the hand has reached the target position.
     */
    moveToOverTime(position: Vec3, duration: number, space: Space): Promise<void>;
    /**
     * Smoothly rotates the hand to a rotation over time.
     * Can be cancelled by cancelInputs().
     * @param rotation - Rotation to rotate to.
     * @param duration - Time to take to rotate in seconds.
     * @param space - Whether the rotation is in local or world space.
     * @returns Promise resolves when the hand has reached the target rotation.
     */
    rotateToOverTime(rotation: Quaternion, duration: number, space: Space): Promise<void>;
    /**
     * Simulates pushing or releasing the trigger button, activating grabbing
     * and scripting trigger button events.
     * cancelInputs() simulates a release if called after a simulated press.
     * @param buttonDown - If true, simulates button push, else button release.
     */
    setTriggerButton(buttonDown: boolean): void;
    /**
     * Simulates pushing and releasing the grip button, activating
     * grabbing and scripting trigger button events.
     */
    clickTriggerButton(): Promise<void>;
    /**
     * Simulates pushing or releasing the grip button.
     * cancelInputs() simulates a release if called after a simulated press.
     * @param buttonDown - If true, simulates button push, else button release.
     */
    setGripButton(buttonDown: boolean): void;
    /**
     * Simulates pushing and releasing the grip button.
     */
    clickGripButton(): Promise<void>;
    /**
     * Set position and rotation.
     * @param pose - The pose to move to.
     * @param space - Whether the pose is in local or world space.
     */
    apply(pose: Pose, space: Space): void;
    /**
     * Smoothly move to this pose's positions and rotations over a duration.
     * Can be cancelled by cancelInputs().
     * @param pose - The pose to move to.
     * @param duration - The target duration of the movement in seconds.
     * @param space - Whether the pose is in local or world space.
     */
    applyOverTime(pose: Pose, duration: number, space: Space): Promise<void>;
}
export declare class TestPlayer extends Player {
    leftHand: TestPlayerHand;
    rightHand: TestPlayerHand;
    constructor(id: number);
    static isTestPlayer(player: Player): boolean;
    /**
     * Same as `TestPlayer.fromPlayer`, but doesn't throw if the player is not a test player.
     * Note that methods will still not work for a real player in production builds.
     */
    static fromPlayerNoThrow(player: Player): TestPlayer;
    /**
     * Use this to "cast" Player instances of test players to TestPlayer. Throws if the
     * player is not actually a test player.
     * e.g. with event callbacks.
     */
    static fromPlayer(player: Player): TestPlayer;
    static spawnNew(position: Vec3, rotation: Quaternion): Promise<TestPlayer>;
    /**
     * Destroys a test player. This throws an error if called on a real player.
     */
    destroy(): void;
    /**
     * Cancels all ongoing simulated inputs and movements over time for the player,
     * including simulated locomotion and simulated controller inputs.
     */
    cancelAllInstructions(): void;
    /**
     * Simulates a jump input.
     */
    jump(): void;
    /**
     * Note that this is the torso rotation, not head rotation; it is always
     * in the horizontal plane. Rotations provided to this setter are automatically
     * rectified to the horizontal plane.
     */
    rotation: HorizonProperty<Quaternion>;
    /**
     * Simulates locomotion input to walk to a location. Automatically puts the
     * player in sliding locomotion mode. The y-coordinate is ignored.
     * Can be cancelled by cancelInputs(). The player will not turn to
     * face the destination. To also do turning, see locomoteTo
     * @param position - Position to walk to.
     * @param timeout - Timeout for this instruction in seconds.
     */
    walkTo(position: Vec3, timeout: number): Promise<void>;
    /**
     * Simulates smooth rotation inputs to face a direction. Automatically puts the
     * player in smooth rotation mode. Can be cancelled by cancelInputs().
     * @param faceDirection - Direction to be facing at end. z component is ignored.
     */
    smoothRotateTo(faceDirection: Vec3): Promise<void>;
    /**
     * Set position and rotation of player and player hands.
     * @param pose -  The pose to apply
     * @param space - Whether to use the local or world hand poses from the pose.
     */
    applyAll(pose: PlayerPose, space: Space): void;
    /**
     * Set position and rotation of player hands.
     * @param pose -  The pose whose hand positions and rotations to apply
     * @param space - Whether to use the local or world hand poses from the pose.
     */
    applyHands(pose: PlayerPose, space: Space): void;
    /**
     * Set player position and rotation.
     * @param pose - The pose whose body position and rotation to apply
     */
    applyBody(pose: Pose): void;
    /**
     * Smoothly move player hands to a pose over a duration. Can be cancelled by cancelInputs().
     * @param player - The player whose hands to move.
     * @param duration - The target duration of the movement in seconds.
     * @param space - Whether to use the local or world hand poses from the pose.
     */
    applyHandsOverTime(pose: PlayerPose, duration: number, space: Space): Promise<void>;
    /**
     * Locomote the player to this pose's position and rotation by in order doing:
     * 1. Rotate to look at pose position
     * 2. Walk to pose position
     * 3. Rotate to pose rotation
     *
     * If the position is undefined, skip 1 and 2. If rotation is undefined, skip 3.
     * Can be cancelled by cancelInputs().
     * @param pose - Pose to locomote to.
     * @param timeout - Timeout for the walk step in seconds.
     */
    locomoteTo(pose: Pose, timeout: number): Promise<void>;
}
/**
 * An interface for tests
 */
declare class Test {
    register(entity: Entity, methods: Array<string>): void;
    complete(): void;
    assert(condition: boolean, message?: string): void;
    assertNull(a: unknown, message?: string): void;
    assertNotNull(a: unknown, message?: string): void;
    assertEqual(a: unknown, b: unknown, message?: string): void;
    assertEqualsApprox(a: unknown, b: unknown, message?: string, epsilon?: number): void;
    assertNotEqual(a: unknown, b: unknown, message?: string): void;
    assertStringIncludes(baseString: string, includedString: string, message?: string): void;
    waitUntil(component: Component, predicate: () => boolean, timeoutError?: string | (() => string), timeoutSeconds?: number): Promise<void>;
    waitUntilAsync(component: Component, condition: () => Promise<boolean>, interval?: number, timeout?: number, onTimeout?: () => void): Promise<void>;
    sleep(ms: number): Promise<unknown>;
    waitUntilNextFrame(component: Component): Promise<void>;
    /**
     * Expects a test to have an exception matching the given message - fails if it doesn't match
     * @param message - Exception message to match
     */
    expectException(message: string): void;
}
export declare const test: Test;
export {};
 
}
