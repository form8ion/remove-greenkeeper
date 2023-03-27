import {info} from '@travi/cli-messages';

import removeConfigFile from './config.js';
import removeBadge from './badge.js';

export default async function ({projectRoot}) {
  info('Removing Greenkeeper Details');

  await Promise.all([
    removeConfigFile({projectRoot}),
    removeBadge({projectRoot})
  ]);

  return {
    nextSteps: [
      {summary: 'Remove the project from the list managed by the Greenkeeper GitHub App'},
      {summary: 'Remove the greenkeeper-keeper webhook'},
      {summary: 'Remove open PRs and branches that were opened by Greenkeeper'}
    ]
  };
}
