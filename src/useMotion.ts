import { watch } from 'vue-demi'
import type { MaybeRef } from '@vueuse/core'
import { tryOnUnmounted, unrefElement, watchOnce } from '@vueuse/core'
import type {
  MotionInstance,
  MotionVariants,
  PermissiveTarget,
  UseMotionOptions,
} from './types'
import { useMotionControls } from './useMotionControls'
import { useMotionFeatures } from './useMotionFeatures'
import { useMotionProperties } from './useMotionProperties'
import { useMotionVariants } from './useMotionVariants'

/**
 * A Vue Composable that put your components in motion.
 *
 * @docs https://motion.vueuse.js.org
 *
 * @param target
 * @param variants
 * @param options
 */
export function useMotion<T extends MotionVariants>(
  target: MaybeRef<PermissiveTarget>,
  variants: MaybeRef<T> = {} as MaybeRef<T>,
  options?: UseMotionOptions,
) {
  // Reactive styling and transform
  const { motionProperties, stop: stopMotionProperties }
    = useMotionProperties(target)

  // Variants manager
  const { variant, state } = useMotionVariants<T>(variants)

  // Motion controls, synchronized with motion properties and variants
  const controls = useMotionControls<T>(motionProperties, variants)

  // Create motion instance
  const instance: MotionInstance<T> = {
    target,
    variant,
    variants,
    state,
    motionProperties,
    ...controls,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    stop: (_ = false) => {},
  }

  // Bind features
  const { stop: stopMotionFeatures } = useMotionFeatures(instance, options)

  // Instance cleanup function
  instance.stop = (force = false) => {
    const _stop = () => {
      instance.stopTransitions()
      stopMotionProperties()
      stopMotionFeatures()
    }

    // Check if leave variant exist, if so wait for the animation to end before cleaning up
    if (!force && variants.value && (variants.value as MotionVariants).leave) {
      const _stopWatch = watch(instance.isAnimating, (newVal) => {
        if (!newVal) {
          _stopWatch()
          _stop()
        }
      })
    }
    else {
      _stop()
    }
  }

  tryOnUnmounted(() => instance.stop())

  // Merge instances if binding detected from directive
  watchOnce(
    () => unrefElement(target),
    (el) => {
      if (!el) return

      // @ts-expect-error - We are checking if motionInstance has be bound via directive
      if (el?.motionInstance) {
        // Stop previous instance
        instance.stop()

        // @ts-expect-error - We are checking if motionInstance has be bound via directive
        Object.assign(instance, el.motionInstance)
      }
    },
  )

  return instance
}
