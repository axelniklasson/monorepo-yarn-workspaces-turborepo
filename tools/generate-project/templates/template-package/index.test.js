const { sum } = require('./index');

describe('__PROJECT_NAME__', () => {
  test('it sums correctly', () => {
    expect(sum(0, 0)).toEqual(0);
    expect(sum(-1, 0)).toEqual(-1);
    expect(sum(3, 8)).toEqual(11);
  });
});
