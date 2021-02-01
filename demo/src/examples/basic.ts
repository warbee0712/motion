export default `
<template>
  <div
    v-motion="'block'"
    :initial="{
      y: 200,
      opacity: 0.25,
    }"
    :enter="{
      y: 0,
      x: 0,
      opacity: 1,
    }"
  />
</template>
`
