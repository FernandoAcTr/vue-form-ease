class Validator<T> {
  private message?: string
  private value?: T[] | null

  private constructor() {}

  static fromValue<T>(value?: T[] | null) {
    const validator = new Validator<T>()
    validator.value = value
    return validator
  }

  /**
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
   * Ensures that the array is not empty.
   *
   * @param message - Custom error message to display if the validation fails.
   * @returns This validator instance for chaining additional validations.
   */
  notEmpty(message = 'Array must not be empty') {
    if (!this.value) return this
    if (this.value.length === 0) this.message = message
    return this
  }

  /**
   * Ensures that the array does not contain any duplicate elements.
   *
   * @param message - Custom error message to display if the validation fails.
   * @returns This validator instance for chaining additional validations.
   */
  hasNoDuplicates(message = 'Array must not contain duplicates') {
    if (!this.value) return this
    const set = new Set(this.value)
    if (set.size !== this.value.length) this.message = message
    return this
  }

  /**
   * Ensures that the array has at least the specified minimum length.
   *
   * @param minLength - The minimum number of elements that the array should have.
   * @param message - Custom error message to display if the validation fails.
   * @returns This validator instance for chaining additional validations.
   */
  minLength(minLength: number, message = `Array must have at least ${minLength} elements`) {
    if (!this.value) return this
    if (this.value.length < minLength) this.message = message
    return this
  }

  /**
   * Ensures that the array contains the specified element.
   *
   * @param element - The element that should be present in the array.
   * @param message - Custom error message to display if the validation fails.
   * @returns This validator instance for chaining additional validations.
   */
  contains(element: T, message = `Array must contain the element ${element}`) {
    if (!this.value) return this
    if (!this.value.includes(element)) this.message = message
    return this
  }

  /**
   * Ensures that all elements of the array match the specified predicate function.
   *
   * @param predicate - A function that takes an array element and returns a boolean.
   *                    All elements should satisfy this predicate function.
   * @param message - Custom error message to display if the validation fails.
   * @returns This validator instance for chaining additional validations.
   */
  allMatch(predicate: (element: T) => boolean, message = 'All elements must match the predicate') {
    if (!this.value) return this
    if (!this.value.every(predicate)) this.message = message
    return this
  }
}

export function array<T>(value?: T[] | null) {
  return Validator.fromValue(value)
}
