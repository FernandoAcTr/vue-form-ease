import { describe, expect, test } from 'vitest'
import { number } from '../src/lib/validators/number.validators'

describe('Number Validators', () => {
  test('required', () => {
    expect(number(120).required('X').validate()).toBeFalsy()
    expect(number(null).required('X').validate()).toBe('X')
    expect(number().required('X').validate()).toBe('X')
  })

  test('integer', () => {
    expect(number().integer('X').validate()).toBeFalsy()
    expect(number(120).integer('X').validate()).toBeFalsy()
    expect(number(125.5).integer('X').validate()).toBe('X')
  })

  test('decimal', () => {
    expect(number().decimal('X').validate()).toBeFalsy()
    expect(number(120.5).decimal('X').validate()).toBeFalsy()
    expect(number(125).decimal('X').validate()).toBe('X')
  })

  test('positive', () => {
    expect(number().positive('X').validate()).toBeFalsy()
    expect(number(120.5).positive('X').validate()).toBeFalsy()
    expect(number(0).positive('X').validate()).toBeFalsy()
    expect(number(-125).positive('X').validate()).toBe('X')
  })

  test('negative', () => {
    expect(number().negative('X').validate()).toBeFalsy()
    expect(number(-120.5).negative('X').validate()).toBeFalsy()
    expect(number(0).negative('X').validate()).toBe('X')
    expect(number(125).negative('X').validate()).toBe('X')
  })

  test('range', () => {
    expect(number().range(1, 10, 'X').validate()).toBeFalsy()
    expect(number(5).range(1, 10, 'X').validate()).toBeFalsy()
    expect(number(0).range(1, 10, 'X').validate()).toBe('X')
    expect(number(11).range(1, 10, 'X').validate()).toBe('X')
  })

  test('min', () => {
    expect(number().min(10, 'X').validate()).toBeFalsy()
    expect(number(10).min(10, 'X').validate()).toBeFalsy()
    expect(number(11).min(10, 'X').validate()).toBeFalsy()
    expect(number(9).min(10, 'X').validate()).toBe('X')
  })

  test('max', () => {
    expect(number().max(10, 'X').validate()).toBeFalsy()
    expect(number(5).max(10, 'X').validate()).toBeFalsy()
    expect(number(10).max(10, 'X').validate()).toBeFalsy()
    expect(number(11).max(10, 'X').validate()).toBe('X')
  })
})
