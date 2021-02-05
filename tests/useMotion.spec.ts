import { mount } from '@vue/test-utils'
import { ref } from 'vue-demi'
import { useMotion } from '../src'

const TestComponent = {
  template: '<div>Hello world</div>',
}

const getElementRef = () => {
  const c = mount(TestComponent)

  return ref<HTMLElement>(c.element as HTMLElement)
}

describe('useMotion', () => {
  it('accepts an element', () => {
    const element = getElementRef()

    const { variant, stop } = useMotion(element)

    expect(variant).toBeDefined()
    expect(stop).toBeDefined()
  })
})
