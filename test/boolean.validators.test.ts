import { describe, expect, test } from 'vitest'
import { boolean } from '../src/lib/validators/boolean.validators'

describe('Boolean Validators', () => {
  test('required', () => {
    expect(boolean(true).required('X').validate()).toBeFalsy()
    expect(boolean(null).required('X').validate()).toBe('X')
    expect(boolean().required('X').validate()).toBe('X')
  })

  test('isTrue', () => {
    expect(boolean().isTrue('X').validate()).toBeFalsy()
    expect(boolean(true).isTrue('X').validate()).toBeFalsy()
    expect(boolean(false).isTrue('X').validate()).toBe('X')
  })

  test('isFalse', () => {
    expect(boolean().isFalse('X').validate()).toBeFalsy()
    expect(boolean(false).isFalse('X').validate()).toBeFalsy()
    expect(boolean(true).isFalse('X').validate()).toBe('X')
  })
})
