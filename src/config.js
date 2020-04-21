import {info, warn} from '@travi/cli-messages';
import {promises as fs} from 'fs';

export default async function removeConfigFile({projectRoot}) {
  try {
    info('Removing greenkeeper.json config file', {level: 'secondary'});

    await fs.unlink(`${projectRoot}/greenkeeper.json`);
  } catch (err) {
    warn('No greenkeeper.json file found, so skipping removal');
  }
}
