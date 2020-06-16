import * as moment from 'moment';
import { parse as parseCsvString } from 'csv-string';

import { InvalidOperandError } from '../constants/errors';

export type Operator = 'be'|'not be'|'contain'|'not contain'|'be greater than'|'be less than'|'be set'|'not be set'|'be one of'|'not be one of';

// tslint:disable-next-line:interface-name
export interface AssertionResult {
  valid: boolean;
  message: string;
}

const DATE_TIME_FORMAT = /\d{4}-\d{2}-\d{2}(?:.?\d{2}:\d{2}:\d{2})?/;

const COMPARERS = {
  'be': (actual: any, expected: any) => actual == expected,
  'not be': (actual: any, expected: any) => actual != expected,
  'contain': (actual: any, expected: any) => !!actual.toLowerCase().includes(expected.toLowerCase()),
  'not contain': (actual: any, expected: any) => !actual.toLowerCase().includes(expected.toLowerCase()),
  'be greater than': (actual: any, expected: any) => {
    if (DATE_TIME_FORMAT.test(actual) && DATE_TIME_FORMAT.test(expected)) {
      return moment(actual).isAfter(expected);
    } else if (!isNaN(Number(actual)) && !isNaN(Number(expected))) {
      return parseFloat(actual) > parseFloat(expected);
    } else {
      throw new InvalidOperandError('be greater than', actual, expected);
    }
  },
  'be less than': (actual: any, expected: any) => {
    if (DATE_TIME_FORMAT.test(actual) && DATE_TIME_FORMAT.test(expected)) {
      return moment(actual).isAfter(expected);
    } else if (!isNaN(Number(actual)) && !isNaN(Number(expected))) {
      return parseFloat(actual) < parseFloat(expected);
    } else {
      throw new InvalidOperandError('be less than', actual, expected);
    }
  },
  'be set': (actual: any, expected: any) => {
    actual = [null, undefined].includes(actual) ? '' : actual;
    return actual != '';
  },
  'not be set': (actual: any, expected: any) => {
    actual = [null, undefined].includes(actual) ? '' : actual;
    return actual == '';
  },
  'be one of': (actual: any, expected: any) => !!parseCsvString(expected)[0].map(v => v.trim()).includes(actual.trim()),
  'not be one of': (actual: any, expected: any) => !parseCsvString(expected)[0].map(v => v.trim()).includes(actual.trim()),
};

const SUCCESS_MESSAGES = {
  'be': (field: string, actual: any, expected: any) => `Expected ${field} field to be ${expected}, but it was actually ${actual}`,
  'not be': (field: string, actual: any, expected: any) => `Expected ${field} field not to be ${expected}, but it was also ${actual}`,
  'contain': (field: string, actual: any, expected: any) => `Expected ${field} field to contain ${expected}, but it is not contained in ${actual}`,
  'not contain': (field: string, actual: any, expected: any) => `Expected ${field} field not to contain ${expected}, but it is contained in ${actual}`,
  'be greater than': (field: string, actual: any, expected: any) => `${field} field is expected to be greater than ${expected}, but its value was ${actual}`,
  'be less than': (field: string, actual: any, expected: any) => `${field} field is expected to be less than ${expected}, but its value was ${actual}`,
  'be set': (field: string, actual: any, expected: any) => `Expected ${field} field to be set, but it was not`,
  'not be set': (field: string, actual: any, expected: any) => `Expected ${field} field not to be set, but it was actually set to ${actual}`,
  'be one of': (field: string, actual: any, expected: any) => `Expected ${field} field to be one of these values (${expected}), but it was actually ${actual}`,
  'not be one of': (field: string, actual: any, expected: any) => `Expected ${field} field to not be one of these values (${expected}), but it was actually ${actual}`,
};

const FAIL_MESSAGES = {
  'be': (field: string, expected: any) => `The ${field} field was set to ${expected}, as expected`,
  'not be': (field: string, expected: any) => `The ${field} field was not set to ${expected}, as expected`,
  'contain': (field: string, expected: any) => `The ${field} field contains ${expected}, as expected`,
  'not contain': (field: string, expected: any) => `The ${field} field does not contain ${expected}, as expected`,
  'be greater than': (field: string, expected: any) => `The ${field} field was greater than ${expected}, as expected`,
  'be less than': (field: string, expected: any) => `The ${field} field was less than ${expected}, as expected`,
  'be set': (field: string, expected: any) => `${field} field was set, as expected`,
  'not be set': (field: string, expected: any) => `${field} field was not set, as expected`,
  'be one of': (field: string, expected: any) => `${field} field was set to one of these values (${expected}), as expected`,
  'not be one of': (field: string, expected: any) => `${field} field was not set to one of these values (${expected}), as expected`,
};

export function assert(operator: Operator, field: string, actualValue: any, expectedValue: any): AssertionResult {
  const result: AssertionResult = {
    valid: true,
    message: '',
  };

  result.valid = COMPARERS[operator](actualValue, expectedValue);
  result.message = result.valid ? SUCCESS_MESSAGES[operator](field, actualValue, expectedValue)
    : FAIL_MESSAGES[operator](field, expectedValue);

  return result;
}
