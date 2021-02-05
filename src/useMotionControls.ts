import { Fn } from '@vueuse/core'
import { MotionProperties, Variant } from './types'
import { MotionTransitions } from './useMotionTransitions'
import { getDefaultTransition } from './utils/defaults'

export type MotionControls = {
  /**
   * Apply a variant declaration and execute the resolved transitions.
   *
   * @param variant
   */
  apply: (variant: Variant) => void
  /**
   * Stop all the ongoing transitions for the current element.
   */
  stopTransitions: Fn
}

/**
 * A Composable handling motion controls, pushing resolved variant to useMotionTransitions manager.
 *
 * @param transform
 * @param style
 * @param currentVariant
 */
export function useMotionControls(
  motionProperties: MotionProperties,
  { push, stop }: MotionTransitions,
): MotionControls {
  const apply = (variant: Variant) => {
    // Skip empty variants
    if (Object.keys(variant).length === 0) return

    // Stop current transitions
    stop()

    // Get transition data
    const { transition } = variant

    // Loop on each motion properties keys
    for (const key in variant) {
      if (key === 'transition') continue

      const value = variant[key]

      push(
        key as keyof MotionProperties,
        value,
        motionProperties,
        transition || getDefaultTransition(key, value),
      )
    }
  }

  return {
    apply,
    stopTransitions: stop,
  }
}
