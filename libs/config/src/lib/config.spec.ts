import { getPort, PORTS } from './config';

describe('config', () => {
  it('returns the configured port for an app', () => {
    expect(getPort('web')).toEqual(PORTS.web);
    expect(getPort('api')).toEqual(8080);
  });
});
