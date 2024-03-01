class Validator {
  private message?: string
  private value?: Date | null

  private constructor() {}

  static fromValue(value?: string | Date | null) {
    const validator = new Validator()
    if (value) validator.value = new Date(value)
    if (value === undefined) validator.value = undefined
    if (value === null) validator.value = null
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
   * Validates if the date is valid. Null or undefine values will be ignored, please use required() to validate them.
   * @param message The custom error message to display if the date is invalid.
   * @returns The current DateValidator instance.
   */
  isValid(message = 'Invalid date') {
    if (!this.value) return this
    if (isNaN(this.value.getTime())) this.message = message
    return this
  }

  /**
   * Validates if the year of the date is a leap year. Null or undefine values will be ignored, please use required() to validate them.
   * @param message The custom error message to display if the year is not a leap year.
   * @returns The current DateValidator instance.
   */
  leapYear(message = 'Date must be leap year') {
    if (!this.value) return this
    const year = this.value.getFullYear()
    if (!((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0)) this.message = message
    return this
  }

  /**
   * Validates if the date is greater than a specified compareDate. Null or undefine values will be ignored, please use required() to validate them.
   * @param compareDate The date to compare against.
   * @param message The custom error message to display if the date is not greater than compareDate.
   * @returns The current DateValidator instance.
   */
  greaterThan(compareDate: Date, message = `Date must be greater than ${compareDate}`) {
    if (!this.value) return this
    if (this.value <= compareDate) this.message = message
    return this
  }

  /**
   * Validates if the date is less than a specified compareDate. Null or undefine values will be ignored, please use required() to validate them.
   * @param compareDate The date to compare against.
   * @param message The custom error message to display if the date is not less than compareDate.
   * @returns The current DateValidator instance.
   */
  lessThan(compareDate: Date, message = `Date must be less than ${compareDate}`) {
    if (!this.value) return this
    if (this.value >= compareDate) this.message = message
    return this
  }

  /**
   * Validates if the date is within a specified range. Null or undefine values will be ignored, please use required() to validate them.
   * @param startDate The start date of the range.
   * @param endDate The end date of the range.
   * @param message The custom error message to display if the date is not within the specified range.
   * @returns The current DateValidator instance.
   */
  range(startDate: Date, endDate: Date, message = `Date must be between ${startDate} and ${endDate}`) {
    if (!this.value) return this
    if (this.value < startDate || this.value > endDate) this.message = message
    return this
  }
}

export function date(value?: string | Date | null) {
  return Validator.fromValue(value)
}
