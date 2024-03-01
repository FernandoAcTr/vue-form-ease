class Validator {
  private message?: string
  private value?: object | null

  private constructor() {}

  static fromValue(value?: object | null) {
    const validator = new Validator()
    validator.value = value
    return validator
  }

  /**
   *
   * @returns Error message if there is one
   */
  validate() {
    return this.message
  }

  /**
   * Validates if the value is not null or undefined.
   * @param message The custom error message to display if the value is null or undefined.
   * @returns The current Validator instance.
   */
  required(message = 'Required field') {
    if (!this.value) this.message = message
    return this
  }

  /**
   * Ensures that the object is not empty.
   * @param message - Custom error message to display if the validation fails.
   * @returns This validator instance for chaining additional validations.
   */
  notEmpty(message = 'Object must not be empty') {
    if (!this.value) return this
    if (Object.keys(this.value).length == 0) this.message = message
    return this
  }

  /**
   * Ensures that the object contains all the specified required properties.
   * @param requiredProps - An array of property names that must be present in the object.
   * @param message - Custom error message to display if the validation fails.
   * @returns This validator instance for chaining additional validations.
   */
  hasRequiredProperties(requiredProps: string[], message = `Object must contain ${requiredProps.join(',')}`) {
    if (!this.value) return this
    if (!haveProperties(this.value, requiredProps)) this.message = message
    return this
  }

  /**
   * Ensures that the object only contains allowed properties specified in the allowedProps array.
   * @param allowedProps - An array of property names that are allowed in the object.
   * @param message - Custom error message to display if the validation fails.
   * @returns This validator instance for chaining additional validations.
   */
  hasOnlyAllowedProperties(allowedProps: string[], message = `Object only can contain ${allowedProps.join(',')}`) {
    if (!this.value) return this
    for (const prop in this.value) {
      if (!allowedProps.includes(prop)) {
        this.message = message
      }
    }
    return this
  }
}

export function object(value?: object | null) {
  return Validator.fromValue(value)
}

function haveProperties(object: any, properties: string[]) {
  for (const property of properties) {
    if (property.includes('.')) {
      const parts = property.split('.')

      const current = object[parts[0]]
      if (!haveProperties(current, parts.slice(1))) return false
    } else {
      if (!object[property]) return false
    }
  }

  return true
}
