// src/utils/regex.ts
/**
 * A regular expression for validating email addresses.
 *
 * This pattern matches strings that are structured like standard email addresses.
 * For example, it matches "example@domain.com", but not "example".
 *
 * @example
 * import { EMAIL_REGEX } from '$utils/regex';
 * let isValidEmail = EMAIL_REGEX.test(someString);  // true or false
 */
export const EMAIL_REGEX = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
