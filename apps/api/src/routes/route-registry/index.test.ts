import { getRouterFiles } from '@routes/route-registry/get-router-files';

describe('get-router-files', () => {
  test('gets the correct files and formats', () => {
    expect(getRouterFiles([
      'route.ts',
      'meta.json',
      'router'
    ])).toEqual({
      route: 'route.ts',
      meta: 'meta.json',
    });
  });

  test('returns one file if found', () => {
    expect(getRouterFiles([
      'route.ts',
      'router.controller.ts'
    ])).toEqual({
      route: 'route.ts'
    });
  });

  test('returns an empty object if it can\'t find anything', () => {
    expect(getRouterFiles([
      'router.controller.ts'
    ])).toEqual({});
  });
});