import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';
import any from '@travi/any';

import * as configRemover from './config.js';
import * as badgeRemover from './badge.js';
import removeGreenkeeper from './remove-greenkeeper.js';

describe('removal', () => {
  beforeEach(() => {
    vi.mock('./config');
    vi.mock('./badge');
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should remove greenkeeper details', async () => {
    const projectRoot = any.string();

    expect(await removeGreenkeeper({projectRoot})).toEqual({
      nextSteps: [
        {summary: 'Remove the project from the list managed by the Greenkeeper GitHub App'},
        {summary: 'Remove the greenkeeper-keeper webhook'},
        {summary: 'Remove open PRs and branches that were opened by Greenkeeper'}
      ]
    });
    expect(configRemover.default).toHaveBeenCalledWith({projectRoot});
    expect(badgeRemover.default).toHaveBeenCalledWith({projectRoot});
  });
});
