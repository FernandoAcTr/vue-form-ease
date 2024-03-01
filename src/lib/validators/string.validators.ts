class Validator {
  private message?: string
  private value?: string | null

  private constructor() {}

  static fromValue(value?: string | null) {
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
   * Validates if the value is not null, undefined or an empty string.
   * @param message The custom error message to display if the value is null or undefined.
   * @returns The current Validator instance.
   */
  required(message = 'Required field') {
    if (!this.value) this.message = message
    return this
  }

  /**
   * Validates if the string matches a specified regular expression. Null or undefine values will be ignored, please use required() to validate them.
   * @param regex The regular expression to match against.
   * @param message The custom error message to display if the string does not match the regular expression.
   * @returns The current StringValidator instance.
   */
  match(regex: RegExp, message = 'Invalid value') {
    if (!this.value) return this
    if (!regex.test(this.value)) this.message = message
    return this
  }

  /**
   * Validates if the string is a valid email address.
   * @param message The custom error message to display if the string is not a valid email address.
   * @returns The current StringValidator instance.
   */
  email(message = 'Invalid email') {
    return this.match(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/, message)
  }

  /**
   * Validates if the string is an integer (contains only digits).
   * @param message The custom error message to display if the string is not an integer.
   * @returns The current StringValidator instance.
   */
  integer(message = 'Value must be a integer') {
    return this.match(/^\d+$/, message)
  }

  /**
   * Validates if the string contains only alphabetic characters (no digits or special characters).
   * @param message The custom error message to display if the string contains non-alphabetic characters.
   * @returns The current StringValidator instance.
   */
  alphabetic(message = 'Value must be alphabetic') {
    return this.match(/^[A-Za-z]+$/, message)
  }

  /**
   * Validates if the string contains only alphanumeric characters (letters and digits).
   * @param message The custom error message to display if the string contains non-alphanumeric characters.
   * @returns The current StringValidator instance.
   */
  alphanumeric(message = 'Value must be alphanumeric') {
    return this.match(/^[A-Za-z0-9]+$/, message)
  }

  /**
   * Validates if the string is a numeric value (integer or decimal).
   * @param message The custom error message to display if the string is not a numeric value.
   * @returns The current StringValidator instance.
   */
  numeric(message = 'Value must be a number') {
    return this.match(/^[-+]?\d*\.?\d+$/, message)
  }

  /**
   * Validates if the string is a valid URL.
   * @param message The custom error message to display if the string is not a valid URL.
   * @returns The current StringValidator instance.
   */
  url(message = 'Invalid URL') {
    if (!this.value) return this
    try {
      new URL(this.value)
    } catch (error) {
      this.message = message
    }
    return this
  }

  /**
   * Validates if the string has a specific length.
   * @param length The expected length of the string.
   * @param message The custom error message to display if the string length does not match the expected length.
   * @returns The current StringValidator instance.
   */
  length(length: number, message: string = `Value must contain exact ${length} chars`) {
    if (!this.value) return this
    if (this.value.length != length) this.message = message

    return this
  }

  /**
   * Validates if the string has a minimum length.
   * @param minLength The minimum length the string must have.
   * @param message The custom error message to display if the string length is less than the minimum.
   * @returns The current StringValidator instance.
   */
  min(minLength: number, message: string = `Value must contain at least ${minLength} chars`) {
    if (!this.value) return this
    if (this.value.length < minLength) this.message = message
    return this
  }

  /**
   * Validates if the string has a maximum length.
   * @param maxLength The maximum length the string can have.
   * @param message The custom error message to display if the string length exceeds the maximum.
   * @returns The current StringValidator instance.
   */
  max(maxLength: number, message: string = `Value must contain less than ${maxLength} chars`) {
    if (!this.value) return this
    if (this.value.length > maxLength) this.message = message
    return this
  }

  /**
   * Validates if the string contains only valid characters for a username.
   * @param message The custom error message to display if the string contains invalid characters.
   * @returns The current StringValidator instance.
   */
  username(message = 'Value contains invalid characters') {
    return this.match(/^[A-Za-z0-9_]+$/, message)
  }

  /**
   * Validates if the string contains only valid characters for a name (letters and spaces).
   * @param message The custom error message to display if the string contains invalid characters.
   * @returns The current StringValidator instance.
   */
  name(message = 'Value contains invalid characters') {
    return this.match(/^[A-Za-z\s]+$/, message)
  }

  /**
   * Validates if the string is a valid UUID (Universally Unique Identifier).
   * @param message The custom error message to display if the string is not a valid UUID.
   * @returns The current StringValidator instance.
   */
  uuid(message = 'Invalid UUID') {
    return this.match(/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/, message)
  }

  /**
   * Validates if the string contains only lowercase characters.
   * @param message The custom error message to display if the string contains uppercase characters.
   * @returns The current StringValidator instance.
   */
  lowercase(message = 'Value must be lowercase') {
    if (!this.value) return this
    if (this.value !== this.value.toLowerCase()) this.message = message
    return this
  }

  /**
   * Validates if the string contains only uppercase characters.
   * @param message The custom error message to display if the string contains lowercase characters.
   * @returns The current StringValidator instance.
   */
  uppercase(message = 'Value must be uppercase') {
    if (!this.value) return this
    if (this.value !== this.value.toUpperCase()) this.message = message
    return this
  }
}

export function string(value?: string) {
  return Validator.fromValue(value)
}
