import { pickRandom } from './random';

describe('Random', () => {
  it('should return item from arguments', () => {
    const options = [1, 2, 3, 4];
    expect(options).toContain(pickRandom(...options));
  });
});
