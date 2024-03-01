class Validator {
  private message?: string
  private value?: boolean | null

  private constructor() {}

  static fromValue(value?: boolean | null) {
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
    if (this.value === null || this.value === undefined) this.message = message
    return this
  }

  /**
   * Validates if the value is true. Null or undefined values will be ignored
   * @param message The custom error message to display if the value is false.
   * @returns The current Validator instance.
   */
  isTrue(message = 'Required field to be true') {
    if (this.value === null || this.value === undefined) return this 
    if (this.value === false) this.message = message
    return this
  }

  /**
   * Validates if the value is false. Null or undefined values will be ignored
   * @param message The custom error message to display if the value is true.
   * @returns The current Validator instance.
   */
  isFalse(message = 'Required field to be false') {
    if (this.value === null || this.value === undefined) return this 
    if (this.value === true) this.message = message
    return this
  }
}

export function boolean(value?: boolean | null) {
  return Validator.fromValue(value)
}
