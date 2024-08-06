import { reactive, ref, type Ref, type UnwrapNestedRefs } from 'vue'

type Validator<T, F> = (value: T, form: F) => string | undefined
type AsyncValidator<T, F> = (value: T, form: F) => Promise<string | void>

type FormOptions<T> = {
    data: T
    validations?: { [key in keyof Partial<T>]: Validator<T[key], T> }
    asyncValidations?: { [key in keyof Partial<T>]: AsyncValidator<T[key], T> }
}

type Errors<T> = { [key in keyof Partial<T>]: string }

export function useForm<T extends Object>(options: FormOptions<T>) {
    const { data, asyncValidations, validations } = options
    const loading: Ref<boolean> = ref(false)
    const valid: Ref<boolean> = ref(true)
    const formData: UnwrapNestedRefs<T> = reactive<T>({ ...data })
    const errors: UnwrapNestedRefs<Errors<T>> = reactive<Errors<T>>({} as Errors<T>)

    const resetForm = () => {
        Object.assign(formData, data)
        Object.keys(errors).forEach((key) => delete (errors as any)[key])
        valid.value = true
        loading.value = false
    }

    const validateForm = (): boolean => {
        if (!validations || Object.keys(validations).length == 0) return true
        let isValid = true
        const _errors: any = {}

        for (const key of Object.keys(validations)) {
            const validator = (validations as any)[key]
            const errorMessage = validator((formData as any)[key], formData)
            if (errorMessage) {
                isValid = false
                _errors[key] = errorMessage
            }
        }

        Object.keys(errors).forEach((key) => delete (errors as any)[key])
        Object.assign(errors, _errors)
        valid.value = isValid

        return isValid
    }

    const validateFormAsync = async (): Promise<boolean> => {
        if (!asyncValidations || Object.keys(asyncValidations).length == 0) return true

        let isValid = true
        const _errors: any = {}
        loading.value = true

        const validationPromises = Object.keys(asyncValidations).map(async (key) => {
            const validator = (asyncValidations as any)[key]
            try {
                const errorMessage = await validator((formData as any)[key], formData)
                if (errorMessage) {
                    isValid = false
                    _errors[key] = errorMessage
                }
            } catch (error) {
                isValid = false
                _errors[key] = `An exception occurred while the validator [${key}] was running`
            }
        })
        await Promise.all(validationPromises)

        Object.assign(errors, _errors)
        valid.value = isValid
        loading.value = false

        return isValid
    }

    const validateInput = (field: keyof T) => {
        if (!validations || Object.keys(validations).length == 0) return true

        const validator = (validations as any)[field]
        if (!validator) return true

        const errorMessage = validator((formData as any)[field], formData)

        if (errorMessage) {
            //@ts-ignore
            errors[field] = errorMessage
            valid.value = false
        }

        return errorMessage ? false : true
    }

    const validateInputAsync = async (field: keyof T) => {
        if (!asyncValidations || Object.keys(asyncValidations).length == 0) return true
        const validator = (asyncValidations as any)[field]
        if (!validator) return true

        let errorMessage: string | null = null
        try {
            errorMessage = await validator((formData as any)[field], formData)
        } catch (error) {
            errorMessage = `An exception occurred while the validator [${field as string}] was running`
        }

        if (errorMessage) {
            //@ts-ignore
            errors[field] = errorMessage
        }

        return errorMessage ? false : true
    }

    return {
        loading,
        valid,
        formData,
        errors,
        resetForm,
        validateForm,
        validateFormAsync,
        validateInput,
        validateInputAsync
    }
}

export function execValidators<T>(
    data: unknown,
    validations: { [K in keyof Partial<T>]: Validator<T[K], T> }
): { errors: Errors<T>; valid: boolean; data: T } {
    if (Object.keys(validations).length === 0) return { errors: {} as Errors<T>, valid: true, data: data as T }

    let isValid = true
    const _errors: Errors<T> = {} as Errors<T>

    for (const key of Object.keys(validations) as (keyof T)[]) {
        const validator = validations[key] as Validator<T[typeof key], T>
        const field = (data as T)[key]
        const errorMessage = validator(field, data as T)
        if (errorMessage) {
            isValid = false
            _errors[key] = errorMessage
        }
    }

    return {
        errors: _errors,
        valid: isValid,
        data: data as T
    }
}

export async function execAsyncValidators<T>(
    data: unknown,
    asyncValidations: { [K in keyof Partial<T>]: AsyncValidator<T[K], T> }
): Promise<{ errors: Errors<T>; valid: boolean; data: T }> {
    if (Object.keys(asyncValidations).length === 0)
        return Promise.resolve({ errors: {} as Errors<T>, valid: true, data: data as T })

    let isValid = true
    const _errors: Errors<T> = {} as Errors<T>

    const validationPromises = (Object.keys(asyncValidations) as (keyof T)[]).map(async (key) => {
        const validator = asyncValidations[key] as AsyncValidator<T[typeof key], T>
        try {
            const errorMessage = await validator((data as T)[key], data as T)
            if (errorMessage) {
                isValid = false
                _errors[key] = errorMessage
            }
        } catch (error) {
            isValid = false
            _errors[key] = `An exception occurred while the validator [${String(key)}] was running`
        }
    })

    await Promise.all(validationPromises)

    return {
        errors: _errors,
        valid: isValid,
        data: data as T
    }
}
