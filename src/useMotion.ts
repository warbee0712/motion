import { MaybeRef } from '@vueuse/core'
import { Ref, ref } from 'vue-demi'
import { MotionInstance, TargetType } from './types'
import { MotionVariants } from './types'
import { useMotionControls } from './useMotionControls'
import { useMotionFeatures } from './useMotionFeatures'
import { useMotionProperties } from './useMotionProperties'
import { useMotionTransitions } from './useMotionTransitions'
import { useMotionVariants } from './useMotionVariants'

export type UseMotionOptions = {
  syncVariants?: boolean
  lifeCycleHooks?: boolean
  visibilityHooks?: boolean
  eventListeners?: boolean
}

/**
 * A Vue Composable that put your components in motion.
 *
 * @docs https://vue-use-sound.netlify.app
 *
 * @param target
 * @param variants
 * @param options
 */
export function useMotion<T extends MotionVariants>(
  target: MaybeRef<TargetType>,
  variants: MaybeRef<T> = {} as MaybeRef<T>,
  options: UseMotionOptions = {
    syncVariants: true,
    lifeCycleHooks: true,
    visibilityHooks: true,
    eventListeners: true,
  },
) {
  // Base references
  const variantsRef = ref(variants) as Ref<T>
  const targetRef = ref(target)

  // Motion transitions instance
  const transitions = useMotionTransitions()

  // Reactive styling and transform
  const { motionProperties } = useMotionProperties(targetRef)

  // Variants manager
  const { variant, state } = useMotionVariants<T>(variantsRef)

  // Motion controls, synchronized with styling and variants
  const controls = useMotionControls(motionProperties, transitions)

  const instance: MotionInstance<T> = {
    target: targetRef,
    variant,
    variants: variantsRef,
    state,
    ...controls,
  }

  // Bind features
  useMotionFeatures(instance, options)

  return instance
}
