import { describe, expect, test } from 'vitest'
import { array } from '../src/lib/validators/array.validators'

describe('Array Validators', () => {
  test('required', () => {
    expect(array([]).required('X').validate()).toBeFalsy()
    expect(array(null).required('X').validate()).toBe('X')
    expect(array().required('X').validate()).toBe('X')
  })

  test('notEmpty', () => {
    expect(array().notEmpty('X').validate()).toBeFalsy()
    expect(array([]).notEmpty('X').validate()).toBe('X')
  })

  test('hasNoDuplicates', () => {
    expect(array().hasNoDuplicates('X').validate()).toBeFalsy()
    expect(array([1, 2, 3, 1]).hasNoDuplicates('X').validate()).toBe('X')
  })

  test('minLength', () => {
    expect(array().minLength(1, 'X').validate()).toBeFalsy()
    expect(array([1, 2, 3]).minLength(3, 'X').validate()).toBeFalsy()
    expect(array([1, 2, 3]).minLength(4, 'X').validate()).toBe('X')
  })

  test('contains', () => {
    expect(array().contains(1, 'X').validate()).toBeFalsy()
    expect(array([1, 2, 3]).contains(3, 'X').validate()).toBeFalsy()
    expect(array([1, 2, 3]).contains(4, 'X').validate()).toBe('X')
  })

  test('allMatch', () => {
    expect(
      array()
        .allMatch(() => true, 'X')
        .validate()
    ).toBeFalsy()
    expect(
      array([1, 2, 3])
        .allMatch((n) => n < 4, 'X')
        .validate()
    ).toBeFalsy()
    expect(
      array([1, 2, 3])
        .allMatch((n) => n < 1, 'X')
        .validate()
    ).toBe('X')
  })
})
