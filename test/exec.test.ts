import { describe, expect, test } from 'vitest'
import { boolean } from '../src/lib/validators/boolean.validators'
import { string } from '../src/lib/validators/string.validators'
import { number } from '../src/lib/validators/number.validators'
import { execAsyncValidators, execValidators } from '../src/lib/composables/useForm'

describe('Exec Validators', () => {
    test('is possible validate a correct object', () => {
        const validators = {
            name: (value: string) => string(value).required('X').validate(),
            age: (value: number) => number(value).required('X').validate(),
            sex: (value: boolean) => boolean(value).required('X').validate()
        }
        const targetObject = {
            name: 'John',
            age: 25,
            sex: true
        }
        const { data, errors, valid } = execValidators(targetObject, validators)
        expect(valid).toBeTruthy()
        expect(errors).toEqual({})
        expect(data).toEqual(targetObject)
    })

    test('is possible validate a incorrect object', () => {
        const validators = {
            name: (value: string) => string(value).required('X').validate(),
            lastName: (value: string) => string(value).required('X').validate(),
            age: (value: number) => number(value).required('X').validate(),
            sex: (value: boolean) => boolean(value).required('X').validate()
        }
        const targetObject = {
            name: 'John',
            age: 25
        }
        const { data, errors, valid } = execValidators(targetObject, validators)
        expect(valid).toBeFalsy()
        expect(errors).toEqual({
            lastName: 'X',
            sex: 'X'
        })
        expect(data).toEqual({
            name: 'John',
            age: 25
        })
    })

    test('is possible validate a correct object in async way', async () => {
        const validators = {
            name: async (value: string) => string(value).required('X').validate(),
            age: async (value: number) => number(value).required('X').validate(),
            sex: async (value: boolean) => boolean(value).required('X').validate()
        }
        const targetObject = {
            name: 'John',
            age: 25,
            sex: true
        }
        const { data, errors, valid } = await execAsyncValidators(targetObject, validators)
        expect(valid).toBeTruthy()
        expect(errors).toEqual({})
        expect(data).toEqual(targetObject)
    })

    test('is possible validate a incorrect object in an async way', async () => {
        const validators = {
            name: async (value: string) => string(value).required('X').validate(),
            lastName: async (value: string) => string(value).required('X').validate(),
            age: async (value: number) => number(value).required('X').validate(),
            sex: async (value: boolean) => boolean(value).required('X').validate()
        }
        const targetObject = {
            name: 'John',
            age: 25
        }
        const { data, errors, valid } = await execAsyncValidators(targetObject, validators)
        expect(valid).toBeFalsy()
        expect(errors).toEqual({
            lastName: 'X',
            sex: 'X'
        })
        expect(data).toEqual({
            name: 'John',
            age: 25
        })
    })
})
