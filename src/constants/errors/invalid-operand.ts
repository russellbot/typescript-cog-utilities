export class InvalidOperandError extends Error {
  constructor(operator: string, actualValue: string, value: string) {
    super(`Couldn't check if ${actualValue} should ${operator} ${value}. The "${operator}" operator can only be used with numeric or date values: date format: yyyy-mm-dd date time format: yyyy-mm-dd hh:mm:ss`);
    this.name = 'InvalidOperandError';
  }
}
