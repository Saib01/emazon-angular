import { RangePipe } from './range.pipe';

describe('RangePipe', () => {
  let pipe: RangePipe;

  beforeEach(() => {
    pipe = new RangePipe();
  });

  test('should be created successfully', () => {
    expect(pipe).toBeTruthy();
  });

  test('should generate a range from 1 to 5 with a step of 1', () => {
    const result = pipe.transform(1, 5);
    expect(result).toEqual([1, 2, 3, 4, 5]);
  });

  test('should generate a range from 0 to 10 with a step of 2', () => {
    const result = pipe.transform(0, 10, 2);
    expect(result).toEqual([0, 2, 4, 6, 8, 10]);
  });

  test('should generate a range from -5 to 5 with a step of 5', () => {
    const result = pipe.transform(-5, 5, 5);
    expect(result).toEqual([-5, 0, 5]);
  });

  test('should return an empty array if start is greater than end', () => {
    const result = pipe.transform(5, 1);
    expect(result).toEqual([]);
  });

  test('should return a single element if start is equal to end', () => {
    const result = pipe.transform(3, 3);
    expect(result).toEqual([3]);
  });
});