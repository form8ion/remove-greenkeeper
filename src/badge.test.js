import fs from 'node:fs';
import removeBadgePlugin from 'remark-remove-greenkeeper-badge';

import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';
import any from '@travi/any';
import {when} from 'jest-when';

import * as remark from '../thirdparty-wrappers/remark.js';
import removeBadge from './badge.js';

describe('badge removal', () => {
  let process;
  const projectRoot = any.string();

  beforeEach(() => {
    vi.mock('node:fs');
    vi.mock('../thirdparty-wrappers/remark.js');

    const use = vi.fn();
    process = vi.fn();
    remark.default.mockReturnValue({use});
    when(use).calledWith(removeBadgePlugin).mockReturnValue({process});
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should remove the badge from the README', async () => {
    const pathToReadmeFile = `${projectRoot}/README.md`;
    const existingFileContents = any.string();
    const updatedFileContents = any.string();
    when(fs.readFileSync).calledWith(pathToReadmeFile, 'utf8').mockReturnValue(existingFileContents);
    process.mockImplementation((contents, callback) => {
      if (existingFileContents === contents) {
        return callback(null, {contents: updatedFileContents});
      }

      return undefined;
    });

    await removeBadge({projectRoot});

    expect(fs.writeFileSync).toHaveBeenCalledWith(pathToReadmeFile, updatedFileContents);
  });

  it('should reject the promise for a processing failure', async () => {
    const error = new Error('from test');
    process.mockImplementation((contents, callback) => callback(error));

    try {
      await removeBadge({projectRoot});

      throw new Error('Calling the removal plugin should have thrown an error in this test');
    } catch (err) {
      expect(err).toEqual(error);
    }
  });
});
