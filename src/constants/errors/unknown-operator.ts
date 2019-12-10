export class UnknownOperatorError extends Error {
  constructor(operator: string) {
    super(`"${operator}" is an invalid operator.`);
    this.name = 'UnknownOperatorError';
  }
}
