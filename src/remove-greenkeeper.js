import {info} from '@travi/cli-messages';
import removeConfigFile from './config';
import removeBadge from './badge';

export default async function ({projectRoot}) {
  info('Removing Greenkeeper Details');

  await Promise.all([
    removeConfigFile({projectRoot}),
    removeBadge({projectRoot})
  ]);

  return {
    nextSteps: [
      'Remove the project from the list managed by the Greenkeeper GitHub App',
      'Remove the greenkeeper-keeper webhook',
      'Remove open PRs and branches that were opened by Greenkeeper'
    ]
  };
}
