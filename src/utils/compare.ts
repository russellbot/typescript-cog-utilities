import * as moment from 'moment';

export const operatorFailMessages: any = {
  be: 'Expected %s field to be %s, but it was actually %s',
  notbe: 'Expected %s field not to be %s, but it was also %s',
  contain: 'Expected %s field to contain %s, but it is not contained in %s',
  notcontain: 'Expected %s field not to contain %s, but it is contained in %s',
  begreaterthan:
    '%s field is expected to be greater than %s, but its value was %s',
  belessthan: '%s field is expected to be less than %s, but its value was %s',
};

export const operatorSuccessMessages: any = {
  be: 'The %s field was set to %s, as expected',
  notbe: 'The %s field was not set to %s, as expected',
  contain: 'The %s field contains %s, as expected',
  notcontain: 'The %s field does not contain %s, as expected',
  begreaterthan: 'The %s field was greater than %s, as expected',
  belessthan: 'The %s field was less than %s, as expected',
};

export function compare(operator: string, actualValue: string, value: string) {
  const validOperators = [
    'be',
    'not be',
    'contain',
    'not contain',
    'be greater than',
    'be less than',
  ];
  const dateTimeFormat = /\d{4}-\d{2}-\d{2}(?:.?\d{2}:\d{2}:\d{2})?/;

  if (validOperators.includes(operator.toLowerCase())) {
    if (operator == 'be') {
      return actualValue == value;
    } else if (operator == 'not be') {
      return actualValue != value;
    } else if (operator == 'contain') {
      return actualValue.toLowerCase().includes(value.toLowerCase());
    } else if (operator == 'not contain') {
      return !actualValue.toLowerCase().includes(value.toLowerCase());
    } else if (operator == 'be greater than') {
      if (dateTimeFormat.test(actualValue) && dateTimeFormat.test(value)) {
        return moment(actualValue).isAfter(value);
      } else if (!isNaN(Number(actualValue)) && !isNaN(Number(value))) {
        return parseFloat(actualValue) > parseFloat(value);
      } else {
        throw new Error(
          `Couldn't check that %s > %s. The ${operator} operator can only be used with numeric or date values.'`,
        );
      }
    } else if (operator == 'be less than') {
      if (dateTimeFormat.test(actualValue) && dateTimeFormat.test(value)) {
        return moment(actualValue).isBefore(value);
      } else if (!isNaN(Number(actualValue)) && !isNaN(Number(value))) {
        return parseFloat(actualValue) < parseFloat(value);
      } else {
        throw new Error(
          `Couldn't check that %s < %s. The ${operator} operator can only be used with numeric or date values.`,
        );
      }
    }
  } else {
    throw new Error(
      `${operator}" is an invalid operator. Please provide one of: ${validOperators.join(
        ', ',
      )}`,
    );
  }
}
