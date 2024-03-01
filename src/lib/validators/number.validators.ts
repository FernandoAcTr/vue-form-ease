class Validator {
  private message?: string
  private value?: number | null

  private constructor() {}

  static fromValue(value?: number | null) {
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
   * Validates if the value is an integer. Null or undefine values will be ignored, please use required() to validate them.
   * @param message The custom error message to display if the value is not an integer.
   * @returns The current NumberValidator instance.
   */
  integer(message = 'Value must be an integer') {
    if (this.value === null || this.value === undefined) return this
    if (isNaN(this.value) || !Number.isInteger(this.value)) this.message = message
    return this
  }

  /**
   * Validates if the value is a decimal number. Null or undefine values will be ignored, please use required() to validate them.
   * @param message The custom error message to display if the value is not a decimal number.
   * @returns The current NumberValidator instance.
   */
  decimal(message = 'Value must be a decimal') {
    if (this.value === null || this.value === undefined) return this
    if (isNaN(this.value) || Number.isInteger(this.value)) this.message = message
    return this
  }

  /**
   * Validates if the value is a positive number. Null or undefine values will be ignored, please use required() to validate them.
   * @param message The custom error message to display if the value is not positive.
   * @returns The current NumberValidator instance.
   */
  positive(message = 'Value must be positive') {
    if (this.value === null || this.value === undefined) return this
    if (this.value < 0) this.message = message
    return this
  }

  /**
   * Validates if the value is a negative number. Null or undefine values will be ignored, please use required() to validate them.
   * @param message The custom error message to display if the value is not negative.
   * @returns The current NumberValidator instance.
   */
  negative(message = 'Value must be negative') {
    if (this.value === null || this.value === undefined) return this
    if (this.value >= 0) this.message = message
    return this
  }

  /**
   * Validates if the value is within a specified range. Null or undefine values will be ignored, please use required() to validate them.
   * @param min The minimum value of the range.
   * @param max The maximum value of the range.
   * @param message The custom error message to display if the value is not within the specified range.
   * @returns The current NumberValidator instance.
   */
  range(min: number, max: number, message = `Value must be between ${min} and ${max}`) {
    if (this.value === null || this.value === undefined) return this
    if (this.value < min || this.value > max) this.message = message
    return this
  }

  /**
   * Validates if the value is greater than a specified minimum value. Null or undefine values will be ignored, please use required() to validate them.
   * @param min The minimum value to compare against.
   * @param message The custom error message to display if the value is not greater than the specified minimum value.
   * @returns The current NumberValidator instance.
   */
  min(min: number, message = `Value must be more than ${min}`) {
    if (this.value === null || this.value === undefined) return this
    if (this.value < min) this.message = message
    return this
  }

  /**
   * Validates if the value is less than a specified maximum value. Null or undefine values will be ignored, please use required() to validate them.
   * @param max The maximum value to compare against.
   * @param message The custom error message to display if the value is not less than the specified maximum value.
   * @returns The current NumberValidator instance.
   */
  max(max: number, message = `Value must be less than ${max}`) {
    if (this.value === null || this.value === undefined) return this
    if (this.value > max) this.message = message
    return this
  }
}

export function number(value?: number | null) {
  return Validator.fromValue(value)
}
