import {info} from '@travi/cli-messages';
import removeConfigFile from './config';

export default async function ({projectRoot}) {
  info('Removing Greenkeeper Details');

  await removeConfigFile({projectRoot});
}
