import { computed, reactive } from 'vue'
import { StyleProperties } from './types/variants'
import { getValueAsType, getValueType } from './utils/style'

export function reactiveStyle(props: StyleProperties = {}) {
  const state = reactive<StyleProperties>({
    ...props,
  })

  const style = computed<StyleProperties>(() => {
    const result: StyleProperties = {}

    for (const [key, value] of Object.entries(state)) {
      const valueType = getValueType(key)
      const valueAsType = getValueAsType(value, valueType)
      result[key] = valueAsType
    }

    return result
  })

  return {
    state,
    style,
  }
}
