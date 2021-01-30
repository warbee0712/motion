import {
  ObsoleteProperties,
  VendorLonghandProperties,
  VendorShorthandProperties,
} from 'csstype'
import { CSSProperties } from 'vue'
import { TransitionProperties } from './transitions'

/**
 * Permissive properties keys
 */
export type PropertiesKeys = {
  [key: string]: string | number | undefined | any
}

/**
 * SVG Supported properties
 */
export type SVGPathProperties = {
  pathLength?: number
  pathOffset?: number
  pathSpacing?: number
}

/**
 * Transform properties
 */
export type TransformProperties = {
  x?: string | number
  y?: string | number
  z?: string | number
  translateX?: string | number
  translateY?: string | number
  translateZ?: string | number
  rotate?: string | number
  rotateX?: string | number
  rotateY?: string | number
  rotateZ?: string | number
  scale?: string | number
  scaleX?: string | number
  scaleY?: string | number
  scaleZ?: string | number
  skew?: string | number
  skewX?: string | number
  skewY?: string | number
  originX?: string | number
  originY?: string | number
  originZ?: string | number
  perspective?: string | number
  transformPerspective?: string | number
}

/**
 * Relevant styling properties
 */
export type StyleProperties = Omit<
  CSSProperties,
  | keyof TransformProperties
  | keyof VendorLonghandProperties
  | keyof VendorShorthandProperties
  | keyof ObsoleteProperties
  | 'transform'
  | 'transformBox'
  | 'transformOrigin'
  | 'transformStyle'
  | 'transition'
>

/**
 * Available properties for useMotion variants
 */
export type MotionProperties = StyleProperties & TransformProperties

/**
 * Variant
 */
export type Variant = {
  transition?: TransitionProperties
} & MotionProperties

/**
 * Motion variants object
 */
export type MotionVariants = {
  // Initial variant
  initial?: Variant
  // Lifecycle hooks variants
  enter?: Variant
  leave?: Variant
  // Intersection observer variants
  visible?: Variant
  // Custom variants
  [key: string]: Variant | undefined
}
