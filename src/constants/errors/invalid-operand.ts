export class InvalidOperandError extends Error {
  constructor(operator: string) {
    super(`Couldn't check if %s should ${operator} %s. The "${operator}" operator can only be used with numeric or date values.`);
    this.name = 'InvalidOperandError';
  }
}
