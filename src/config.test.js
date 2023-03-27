import {promises as fs} from 'node:fs';

import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';
import any from '@travi/any';

import removeConfigFile from './config.js';

describe('config', () => {
  const projectRoot = any.string();

  beforeEach(() => {
    vi.mock('node:fs');
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should remove and existing config file', async () => {
    await removeConfigFile({projectRoot});

    expect(fs.unlink).toHaveBeenCalledWith(`${projectRoot}/greenkeeper.json`);
  });

  it('should not throw an error when no config file exists', async () => {
    fs.unlink.mockRejectedValue(new Error('from test'));

    await removeConfigFile({projectRoot});
  });
});
