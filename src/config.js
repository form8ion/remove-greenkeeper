import {promises as fs} from 'node:fs';
import {info, success, warn} from '@travi/cli-messages';

export default async function removeConfigFile({projectRoot}) {
  try {
    info('Removing greenkeeper.json config file', {level: 'secondary'});

    await fs.unlink(`${projectRoot}/greenkeeper.json`);

    success('greenkeeper.json file removed successfully');
  } catch (err) {
    warn('No greenkeeper.json file found, so skipping removal');
  }
}
