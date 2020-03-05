import { compare } from '../src/utils/compare';

describe('testing compare function', () => {
  describe('testing be and not be operator', () => {
    test('compare be should return true', () => {
      const operator = 'be';
      const actualValue = 'value';
      const value = 'value';
      expect(compare(operator, actualValue, value)).toBe(true);
    });
    test('compare be should return false', () => {
      const operator = 'be';
      const actualValue = 'notValue';
      const value = 'value';
      expect(compare(operator, actualValue, value)).toBe(false);
    });
    test('compare not be should return false', () => {
      const operator = 'not be';
      const actualValue = 'value';
      const value = 'value';
      expect(compare(operator, actualValue, value)).toBe(false);
    });
    test('compare not be should return true', () => {
      const operator = 'not be';
      const actualValue = 'notValue';
      const value = 'value';
      expect(compare(operator, actualValue, value)).toBe(true);
    });
    describe('with boolean', () => {
      test('compare be with boolean value should return true', () => {
        const operator = 'be';
        const actualValue = true;
        const value = 'true';
        expect(compare(operator, actualValue, value)).toBe(true);
      });
      test('compare be with boolean value should return false', () => {
        const operator = 'be';
        const actualValue = false;
        const value = 'true';
        expect(compare(operator, actualValue, value)).toBe(false);
      });
    });

    describe('with null', () => {
      test('compare be with null value should return true', () => {
        const operator = 'be';
        const value = 'null';
        expect(compare(operator, null, value)).toBe(true);
      });
      test('compare be with null value should return false', () => {
        const operator = 'be';
        const value = 'anyValue';
        expect(compare(operator, null, value)).toBe(false);
      });
    });
  });

  describe('testing contain and not contain operator', () => {
    test('compare contain should return true', () => {
      const operator = 'contain';
      const actualValue = 'value';
      const value = 'val';
      expect(compare(operator, actualValue, value)).toBe(true);
    });
    test('compare contain should return false', () => {
      const operator = 'contain';
      const actualValue = 'volue';
      const value = 'val';
      expect(compare(operator, actualValue, value)).toBe(false);
    });
    test('compare not contain should return false', () => {
      const operator = 'not contain';
      const actualValue = 'value';
      const value = 'val';
      expect(compare(operator, actualValue, value)).toBe(false);
    });
    test('compare not contain should return true', () => {
      const operator = 'not contain';
      const actualValue = 'volue';
      const value = 'val';
      expect(compare(operator, actualValue, value)).toBe(true);
    });
    test('compare contain with object type value should return true', () => {
      const operator = 'contain';
      const actualValue = { anyKey: 'anyValue' };
      const value = 'val';
      expect(compare(operator, actualValue, value)).toBe(true);
    });
  });
  describe('testing be greater than and be less than operator', () => {
    describe('with numbers', () => {
      test('compare be greater than should return true', () => {
        const operator = 'be greater than';
        const actualValue = '2';
        const value = '1';
        expect(compare(operator, actualValue, value)).toBe(true);
      });
      test('compare be greater than should return false', () => {
        const operator = 'be greater than';
        const actualValue = '1';
        const value = '2';
        expect(compare(operator, actualValue, value)).toBe(false);
      });
      test('compare be less than should return false', () => {
        const operator = 'be less than';
        const actualValue = '2';
        const value = '1';
        expect(compare(operator, actualValue, value)).toBe(false);
      });
      test('compare be less than should return true', () => {
        const operator = 'be less than';
        const actualValue = '1';
        const value = '2';
        expect(compare(operator, actualValue, value)).toBe(true);
      });
    });
    describe('with dates', () => {
      test('compare be greater than should return true', () => {
        const operator = 'be greater than';
        const actualValue = '1999-01-02';
        const value = '1999-01-01';
        expect(compare(operator, actualValue, value)).toBe(true);
      });
      test('compare be greater than should return false', () => {
        const operator = 'be greater than';
        const actualValue = '1999-01-01';
        const value = '1999-01-02';
        expect(compare(operator, actualValue, value)).toBe(false);
      });
      test('compare be less than should return false', () => {
        const operator = 'be less than';
        const actualValue = '1999-01-02';
        const value = '1999-01-01';
        expect(compare(operator, actualValue, value)).toBe(false);
      });
      test('compare be less than should return true', () => {
        const operator = 'be less than';
        const actualValue = '1999-01-01';
        const value = '1999-01-02';
        expect(compare(operator, actualValue, value)).toBe(true);
      });
    });
  });
});
