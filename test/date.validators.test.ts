import { describe, expect, test } from 'vitest'
import { date } from '../src/lib/validators/date.validators'

describe('Date Validators', () => {
  test('required', () => {
    expect(date(new Date()).required('X').validate()).toBeFalsy()
    expect(date(new Date().toString()).required('X').validate()).toBeFalsy()
    expect(date(null).required('X').validate()).toBe('X')
    expect(date().required('X').validate()).toBe('X')
  })

  test('isValid', () => {
    expect(date().isValid('X').validate()).toBeFalsy()
    expect(date(new Date()).isValid('X').validate()).toBeFalsy()
    expect(date(new Date().toString()).isValid('X').validate()).toBeFalsy()
    expect(date('Invalid date').isValid('X').validate()).toBe('X')
  })

  test('leapYear', () => {
    expect(date().leapYear('X').validate()).toBeFalsy()
    expect(date(new Date(2020, 0, 1)).leapYear('X').validate()).toBeFalsy()
    expect(date('2020-02-01').leapYear('X').validate()).toBeFalsy()
    expect(date('2022-02-01').leapYear('X').validate()).toBe('X')
  })

  test('greaterThan', () => {
    expect(date().greaterThan(new Date(), 'X').validate()).toBeFalsy()
    expect(date(new Date(2020, 1, 1)).greaterThan(new Date(2019, 0, 1), 'X').validate()).toBeFalsy()
    expect(date('2020-02-01').greaterThan(new Date(2019, 0, 1), 'X').validate()).toBeFalsy()
    expect(date('2022-02-01').greaterThan(new Date(2023, 0, 1), 'X').validate()).toBe('X')
  })

  test('lessThan', () => {
    expect(date().lessThan(new Date(), 'X').validate()).toBeFalsy()
    expect(date(new Date(2020, 1, 1)).lessThan(new Date(2022, 0, 1), 'X').validate()).toBeFalsy()
    expect(date('2020-02-01').lessThan(new Date(2022, 0, 1), 'X').validate()).toBeFalsy()
    expect(date('2022-02-01').lessThan(new Date(2018, 0, 1), 'X').validate()).toBe('X')
  })

  test('range', () => {
    expect(date().range(new Date(), new Date(), 'X').validate()).toBeFalsy()
    expect(date(new Date(2020, 1, 1)).range(new Date(2019, 0, 1), new Date(2021, 0, 1), 'X').validate()).toBeFalsy()
    expect(date("2020-02-05").range(new Date(2019, 0, 1), new Date(2021, 0, 1), 'X').validate()).toBeFalsy()
    expect(date("2020-02-05").range(new Date(2022, 0, 1), new Date(2023, 0, 1), 'X').validate()).toBe("X")
    expect(date("2025-02-05").range(new Date(2022, 0, 1), new Date(2023, 0, 1), 'X').validate()).toBe("X")
  })
})
