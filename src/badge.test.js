import {promises as fs} from 'node:fs';
import {VFile} from 'vfile';
import * as remark from 'remark';
import removeBadgePlugin from 'remark-remove-greenkeeper-badge';

import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';
import any from '@travi/any';
import {when} from 'jest-when';

import removeBadge from './badge.js';

describe('badge removal', () => {
  let process;
  const projectRoot = any.string();

  beforeEach(() => {
    vi.mock('node:fs');
    vi.mock('remark');

    const use = vi.fn();
    process = vi.fn();
    remark.remark.mockReturnValue({use});
    when(use).calledWith(removeBadgePlugin).mockReturnValue({process});
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should remove the badge from the README', async () => {
    const pathToReadmeFile = `${projectRoot}/README.md`;
    const existingFileContents = any.string();
    const updatedFileContents = any.string();
    when(fs.readFile).calledWith(pathToReadmeFile, 'utf8').mockReturnValue(existingFileContents);
    when(process).calledWith(existingFileContents).mockResolvedValue(new VFile(updatedFileContents));

    await removeBadge({projectRoot});

    expect(fs.writeFile).toHaveBeenCalledWith(pathToReadmeFile, updatedFileContents);
  });

  it('should reject the promise for a processing failure', async () => {
    const error = new Error('from test');
    process.mockRejectedValue(error);

    try {
      await removeBadge({projectRoot});

      throw new Error('Calling the removal plugin should have thrown an error in this test');
    } catch (err) {
      expect(err).toEqual(error);
    }
  });
});
