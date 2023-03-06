import { logger } from './logger';

describe('Logger module ', () => {
  it('creates LOGGER', () => {
    expect(logger).not.toBeNull();
  });
});
