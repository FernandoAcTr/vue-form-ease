import { describe, expect, test } from 'vitest'
import { object } from '../src/lib/validators/object.validators'

describe('Object Validators', () => {
  test('required', () => {
    expect(object({}).required('X').validate()).toBeFalsy()
    expect(object().required('X').validate()).toBe('X')
    expect(object(null).required('X').validate()).toBe('X')
  })

  test('notEmpty', () => {
    expect(object().notEmpty('X').validate()).toBeFalsy()
    expect(object({ hello: 'world' }).notEmpty('X').validate()).toBeFalsy()
    expect(object({}).notEmpty('X').validate()).toBe('X')
  })

  test('hasRequiredProperties', () => {
    expect(object().hasRequiredProperties([]).validate()).toBeFalsy()
    expect(object({ hello: 'world' }).hasRequiredProperties(['hello']).validate()).toBeFalsy()
    expect(object({}).hasRequiredProperties(['hello'], 'X').validate()).toBe('X')
  })

  test('hasOnlyAllowedProperties', () => {
    expect(object().hasOnlyAllowedProperties([]).validate()).toBeFalsy()
    expect(object({ hello: 'world' }).hasOnlyAllowedProperties(['hello']).validate()).toBeFalsy()
    expect(object({ a: 'A' }).hasOnlyAllowedProperties(['hello'], 'X').validate()).toBe('X')
  })
})
