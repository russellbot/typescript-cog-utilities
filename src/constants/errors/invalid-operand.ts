export class InvalidOperandError extends Error {
  constructor(operator: string, actualValue: string, value: string) {
    super(`Couldn't check if ${actualValue} should ${operator} ${value}. The "${operator}" operator can only be used with numeric or date values.`);
    this.name = 'InvalidOperandError';
  }
}
