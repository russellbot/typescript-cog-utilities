import { UnknownOperatorError, InvalidOperandError } from '../constants/errors';
import * as moment from 'moment';

export const operatorFailMessages: any = {
  'be': 'Expected %s field to be %s, but it was actually %s',
  'not be': 'Expected %s field not to be %s, but it was also %s',
  'contain': 'Expected %s field to contain %s, but it is not contained in %s',
  'not contain': 'Expected %s field not to contain %s, but it is contained in %s',
  'be greater than': '%s field is expected to be greater than %s, but its value was %s',
  'be less than': '%s field is expected to be less than %s, but its value was %s',
};

export const operatorSuccessMessages: any = {
  'be': 'The %s field was set to %s, as expected',
  'not be': 'The %s field was not set to %s, as expected',
  'contain': 'The %s field contains %s, as expected',
  'not contain': 'The %s field does not contain %s, as expected',
  'be greater than': 'The %s field was greater than %s, as expected',
  'be less than': 'The %s field was less than %s, as expected',
};

export function compare(operator: string, actualValue: any, value: string) {
  const validOperators = ['be', 'not be', 'contain', 'not contain', 'be greater than', 'be less than'];
  const dateTimeFormat = /\d{4}-\d{2}-\d{2}(?:.?\d{2}:\d{2}:\d{2})?/;

  operator = operator || '';
  actualValue = this.stringifyValue(actualValue);
  value = this.stringifyValue(value);

  if (validOperators.includes(operator.toLowerCase())) {
    if (operator.toLowerCase() == 'be') {
      return actualValue == value;
    } else if (operator.toLowerCase() == 'not be') {
      return actualValue != value;
    } else if (operator.toLowerCase() == 'contain') {
      return actualValue.toLowerCase().includes(value.toLowerCase());
    } else if (operator.toLowerCase() == 'not contain') {
      return !actualValue.toLowerCase().includes(value.toLowerCase());
    } else if (operator.toLowerCase() == 'be greater than') {
      if (dateTimeFormat.test(actualValue) && dateTimeFormat.test(value)) {
        return moment(actualValue).isAfter(value);
      } else if (!isNaN(Number(actualValue)) && !isNaN(Number(value))) {
        return parseFloat(actualValue) > parseFloat(value);
      } else {
        throw new InvalidOperandError(operator, actualValue, value);
      }
    } else if (operator.toLowerCase() == 'be less than') {
      if (dateTimeFormat.test(actualValue) && dateTimeFormat.test(value)) {
        return moment(actualValue).isBefore(value);
      } else if (!isNaN(Number(actualValue)) && !isNaN(Number(value))) {
        return parseFloat(actualValue) < parseFloat(value);
      } else {
        throw new InvalidOperandError(operator, actualValue, value);
      }
    }
  } else {
    throw new UnknownOperatorError(operator);
  }
}

export function stringifyValue(object: any) {
  if (object === null || object === undefined) {
    return '';
  } else if (typeof object === 'object') {
    return JSON.stringify(object);
  } else {
    return String(object);
  }
}
