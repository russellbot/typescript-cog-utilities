import * as moment from 'moment';

export function compare(
  operator: string,
  actualValue: string,
  value: string,
  field: string,
) {
  const operatorFailMessages: any = {
    be: `Expected ${field} field to be ${value}, but it was actually ${actualValue}`,
    notbe: `Expected ${field} field not to be ${value}, but it was also ${actualValue}`,
    contain: `Expected ${field} field to contain ${value}, but it is not contained in ${actualValue}`,
    notcontain: `Expected ${field} field not to contain ${value}, but it is contained in ${actualValue}`,
    begreaterthan: `${field} field is expected to be greater than ${value}, but its value was ${actualValue}`,
    belessthan: `${field} field is expected to be less than ${value}, but its value was ${actualValue}`,
  };
  const operatorSuccessMessages: any = {
    be: `The ${field} field was set to ${value}, as expected`,
    notbe: `The ${field} field was not set to ${value}, as expected`,
    contain: `The ${field} field contains ${value}, as expected`,
    notcontain: `The ${field} field does not contain ${value}, as expected`,
    begreaterthan: `The ${field} field was greater than ${value}, as expected`,
    belessthan: `The ${field} field was less than ${value}, as expected`,
  };
  try {
    return compareValues(operator, actualValue, value)
      ? {
          message:
            operatorSuccessMessages[operator.replace(/\s/g, '').toLowerCase()],
          result: true,
        }
      : {
          message:
            operatorFailMessages[operator.replace(/\s/g, '').toLowerCase()],
          result: false,
        };
  } catch (e) {
    throw new Error(e);
  }
}

function compareValues(
  operator: string,
  actualValue: string,
  value: string,
): boolean {
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
          `Couldn't check that ${actualValue} > ${value}. The ${operator} operator can only be used with numeric or date values.`,
        );
      }
    } else if (operator == 'be less than') {
      if (dateTimeFormat.test(actualValue) && dateTimeFormat.test(value)) {
        return moment(actualValue).isBefore(value);
      } else if (!isNaN(Number(actualValue)) && !isNaN(Number(value))) {
        return parseFloat(actualValue) < parseFloat(value);
      } else {
        throw new Error(
          `Couldn't check that ${actualValue} < ${value}. The ${operator} operator can only be used with numeric or date values.`,
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
