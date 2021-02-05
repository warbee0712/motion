import { ref } from 'vue-demi'
import { Fn } from '@vueuse/core'
import { ResolvedValueTarget, Transition } from './types'
import { MotionProperties } from './types'
import { getAnimation } from './utils/transition'

/**
 * A Composable holding all the ongoing transitions in a local reference.
 */
export function useMotionTransitions() {
  // Local transitions reference
  const transitions = ref<Fn[]>([])

  /**
   * Stop all the ongoing transitions for the current element.
   */
  const stop = () => {
    // Check if there is ongoing transitions
    if (transitions.value?.length) {
      // Stop each transitions
      transitions.value.forEach((stop) => stop())
      // Reset value
      transitions.value = []
    }
  }

  /**
   * Start a transition, push it to the `transitions` array.
   *
   * @param transition
   * @param values
   */
  const push = (
    key: string,
    value: ResolvedValueTarget,
    target: MotionProperties,
    transition: Transition,
  ) => {
    const from = target[key]

    const animation = getAnimation(key, value, target, transition, from)

    const pushAnimation = () => {
      const { stop } = animation()

      transitions.value.push(stop)
    }

    if (transition.delay) {
      setTimeout(pushAnimation, transition.delay)
    } else {
      pushAnimation()
    }
  }

  return { transitions, stop, push }
}
