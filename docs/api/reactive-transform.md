# reactiveTransform

reactiveTransform is an helper function creating a reactive object compatible with an HTML `style` attribute.

## Parameters

### `props`

Default [**TransformProperties**](https://github.com/vueuse/motion/tree/main/src/types/variants.ts#L21) object to create the reactive one from.

## Exposed

### `state`

The reactive [**TransformProperties**](https://github.com/vueuse/motion/tree/main/src/types/variants.ts#L21) object to manipulate.

### `style`

A reactive [**transform attribute**](https://developer.mozilla.org/en-US/docs/Web/CSS/transform) compatible string.

#### Example

```vue
<template>
  <div :style="{transform}" @click="shift" />
</template>

<script setup>
const { state, transform } = reactiveTransform({
  x: 100,
  y: 25,
  rotate: 25,
})

const shift = () => {
  state.x += 100
}
</script>
```
