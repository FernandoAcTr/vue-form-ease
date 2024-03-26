import { reactive, ref, type Ref, type UnwrapNestedRefs } from 'vue'

type Validator<T, F> = (value: T, form: F) => string | undefined;
type AsyncValidator<T, F> = (value: T, form: F) => Promise<string | void>;

type FormOptions<T> = {
	data: T;
	validations?: { [key in keyof Partial<T>]: Validator<T[key], T> };
	asyncValidations?: { [key in keyof Partial<T>]: AsyncValidator<T[key], T> };
};

type Errors<T> = { [key in keyof Partial<T>]: string };


export function useForm<T extends Object>(options: FormOptions<T>) {
	const { data, asyncValidations, validations } = options;
    const loading: Ref<boolean> = ref(false);
    const valid: Ref<boolean> = ref(true);
    const formData: UnwrapNestedRefs<T> = reactive<T>({...data});
    const errors: UnwrapNestedRefs<Errors<T>> = reactive<Errors<T>>({} as Errors<T>);

    const resetForm = () => {
        Object.assign(formData, data);
        Object.keys(errors).forEach(key => delete ((errors as any)[key]));
        valid.value = false;
        loading.value = false;
    }

    const validateForm = (): boolean => {
        if(!validations || Object.keys(validations).length == 0) return true

        let isValid = true;
        const _errors: any = {}

        for (const key of Object.keys(validations)) {
			const validator = (validations as any)[key];
			const errorMessage = validator((formData as any)[key], formData);
            if(errorMessage) {
                isValid = false;
                _errors[key] = errorMessage;
            }            
        }

        Object.assign(errors, _errors);
        valid.value = isValid;

        return isValid
    }

    const validateFormAsync = async (): Promise<boolean> => {
        if(!asyncValidations || Object.keys(asyncValidations).length == 0) return true

        let isValid = true;
        const _errors: any = {}
        loading.value = true;

        for await (const key of Object.keys(asyncValidations)) {
            const validator = (asyncValidations as any)[key];
			let errorMessage: string | null = null;

            try {
				errorMessage = await validator((formData as any)[key], formData);
			} catch (error) {
				errorMessage = `An exception occurred while the validator [${key}] was running`;
			}

            if (errorMessage) {
				isValid = false;
				_errors[key] = errorMessage;
			}
        }

        Object.assign(errors, _errors);
        valid.value = isValid;
        loading.value = false;

        return isValid
    }

    const validateInput = (field: keyof T) => {
		if (!validations || Object.keys(validations).length == 0) return true;

        const validator = (validations as any)[field];
		if (!validator) return true;

        const errorMessage = validator((formData as any)[field], formData);

        if(errorMessage){
            (errors as any)[field] = errorMessage;
        }

		return errorMessage ? false : true;
    }

    const validateInputAsync = async (field: keyof T) => {
		if (!asyncValidations || Object.keys(asyncValidations).length == 0) return true;
		const validator = (asyncValidations as any)[field];
		if (!validator) return true;

        let errorMessage: string | null = null;
		try {
			errorMessage = await validator((formData as any)[field], formData);
		} catch (error) {
			errorMessage = `An exception occurred while the validator [${field as string}] was running`;
		}

        if(errorMessage){
            (errors as any)[field] = errorMessage;
        }

		return errorMessage ? false : true;
    }

    return {
		loading,
		formData,
		errors,
		resetForm,
		validateForm,
		validateFormAsync,
		validateInput,
		validateInputAsync
	};
}