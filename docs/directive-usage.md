# Directive usage

**vueuse/motion** allows you to write your animations right **from the template** of your components **without** having to wrap the target elements in any **wrapper** component.

The directive is expected to work the same whether you use it on a **HTML** or **SVG** element, or on any **Vue component**.

## Your first v-motion

v-motion is the name of the **directive** from this **package**.

The **directive** usage allows you to **write** your **variants** right from the **template** of your **components**.

The **v-motion** can be **used** as **many times** you want **in** any and **on** any **HTML** or **SVG** component.

Once put on an element, the **v-motion** will allow you to **write** your **variants** as **props** of this **element**.

The supported **variants names** are the following:

- **initial**
- **enter**
- **visible**
- **hovered**
- **focused**
- **tapped**

You can also **pass** your **variants** as an **object** using the `variants` prop.

The `variants` prop will be **combined** with all the other **native variants** properties, allowing you to define **only** your **custom** variants from this **object**.

The rest of the variants properties can be found on the [Variants](/variants) page.

```vue
<template>
  <div
    v-motion
    :initial="{ opacity: 0, y: 100 }"
    :enter="{ opacity: 1, y: 0 }"
    :variants="{ custom: { scale: 2 } }"
  />
</template>
```

##### _Directives are amazing_ 😍

## Access v-motion controls

When **defined** from **template**, the **target element** might not be **assigned** to a **ref**.

As **directives** does not play well with **references**, you can access **motions controls** using [**useMotions**](/api/use-motions).

If you want to **access** a **v-motion**, you will have to give the **element** a **name** as v-motion value.

Then you can just call **useMotions**, and get **access** to that v-motion **controls** using its **name** as a **key**.

```vue
<template>
  <div
    v-motion="'custom'"
    :initial="{ opacity: 0, y: 100 }"
    :enter="{ opacity: 1, y: 0 }"
    :variants="{ custom: { scale: 2 } }"
  />
</template>

<script>
import { useMotions } from '@vueuse/motion'

// Get custom controls
const { custom } = useMotions()

const customEvent = () => {
  // Change the current variant of `custom` element
  custom.variant.value = 'custom'
}
</script>
```

In the **above** example, the **custom** object will be an **instance** of [**Motion controls**](/motion-controls).
