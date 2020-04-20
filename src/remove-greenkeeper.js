import {info} from '@travi/cli-messages';
import removeConfigFile from './config';
import removeBadge from './badge';

export default async function ({projectRoot}) {
  info('Removing Greenkeeper Details');

  await Promise.all([
    removeConfigFile({projectRoot}),
    removeBadge({projectRoot})
  ]);
}
