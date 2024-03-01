import { describe, expect, test } from 'vitest'
import { string } from '../src/lib/validators/string.validators'

describe('String Validators', () => {
  test('required', () => {
    expect(string('').required('X').validate()).toBe('X')
    expect(string().required('X').validate()).toBe('X')
  })

  test('regex', () => {
    expect(string('A').match(/^A$/, 'X').validate()).toBeFalsy()
    expect(string('AA').match(/^A$/, 'X').validate()).toBe('X')
    expect(string('').match(/^A$/, 'X').validate()).toBeFalsy()
  })

  test('email', () => {
    expect(string('invalid.email').email('X').validate()).toBe('X')
    expect(string('').email('X').validate()).toBeFalsy()
  })

  test('integer', () => {
    expect(string('10').integer().validate()).toBeFalsy()
    expect(string('10.4').integer('X').validate()).toBe('X')
    expect(string('ABC').integer('X').validate()).toBe('X')
  })

  test('alphabetic', () => {
    expect(string('ABC').alphabetic().validate()).toBeFalsy()
    expect(string('A*<').alphabetic('X').validate()).toBe('X')
  })

  test('alphanumeric', () => {
    expect(string('ABC123').alphanumeric().validate()).toBeFalsy()
    expect(string('A*<2').alphanumeric('X').validate()).toBe('X')
  })

  test('numeric', () => {
    expect(string('123').numeric().validate()).toBeFalsy()
    expect(string('123.34').numeric().validate()).toBeFalsy()
    expect(string('123A').numeric('X').validate()).toBe('X')
    expect(string('123.4.3').numeric('X').validate()).toBe('X')
  })

  test('url', () => {
    expect(string('http://www.google.com').url().validate()).toBeFalsy()
    expect(string('invalid url').url('X').validate()).toBe('X')
  })

  test('length', () => {
    expect(string('12345').length(5).validate()).toBeFalsy()
    expect(string('1234567').length(6, 'X').validate()).toBe('X')
  })

  test('min', () => {
    expect(string('12345').min(5).validate()).toBeFalsy()
    expect(string('12345').min(6, 'X').validate()).toBe('X')
  })

  test('max', () => {
    expect(string('12345').max(5).validate()).toBeFalsy()
    expect(string('1234567').max(6, 'X').validate()).toBe('X')
  })

  test('username', () => {
    expect(string('Joe_Doe123').username().validate()).toBeFalsy()
    expect(string('Joe_Doe_123').username().validate()).toBeFalsy()
    expect(string('$JoeDoe#').username('X').validate()).toBe('X')
  })

  test('name', () => {
    expect(string('Joe Doe').name().validate()).toBeFalsy()
    expect(string('Joe_Doe123').name('X').validate()).toBe('X')
    expect(string('$JoeDoe#').name('X').validate()).toBe('X')
  })

  test('uuid', () => {
    expect(string('123e4567-e89b-12d3-a456-426655440000').uuid().validate()).toBeFalsy()
    expect(string('invalid-uuid').uuid('X').validate()).toBe('X')
  })

  test('lowercase', () => {
    expect(string('joe doe').lowercase().validate()).toBeFalsy()
    expect(string('Joe doe').lowercase('X').validate()).toBe('X')
  })

  test('uppercase', () => {
    expect(string('JOE DOE').uppercase().validate()).toBeFalsy()
    expect(string('Joe doe').uppercase('X').validate()).toBe('X')
  })
})
