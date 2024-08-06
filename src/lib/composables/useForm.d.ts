import { Ref, UnwrapNestedRefs } from 'vue'

type Validator<T, F> = (value: T, form: F) => string | undefined
type AsyncValidator<T, F> = (value: T, form: F) => Promise<string | void>
type FormOptions<T> = {
    data: T
    validations?: {
        [key in keyof Partial<T>]: Validator<T[key], T>
    }
    asyncValidations?: {
        [key in keyof Partial<T>]: AsyncValidator<T[key], T>
    }
}
type Errors<T> = {
    [key in keyof Partial<T>]: string
}
export declare function useForm<T extends Object>(
    options: FormOptions<T>
): {
    loading: Ref<boolean>
    formData: UnwrapNestedRefs<T>
    errors: UnwrapNestedRefs<Errors<T>>
    resetForm: () => void
    validateForm: () => boolean
    validateFormAsync: () => Promise<boolean>
    validateInput: (field: keyof T) => boolean
    validateInputAsync: (field: keyof T) => Promise<boolean>
}

export declare function execValidators<T>(
    data: unknown,
    validations: { [K in keyof Partial<T>]: Validator<T[K], T> }
): { errors: Errors<T>; valid: boolean; data: T }

export declare function execAsyncValidators<T>(
    data: unknown,
    asyncValidations: { [K in keyof Partial<T>]: AsyncValidator<T[K], T> }
): Promise<{ errors: Errors<T>; valid: boolean; data: T }>

export {}
