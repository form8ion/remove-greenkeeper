import {promises as fs} from 'node:fs';
import {remark} from 'remark';
import {info} from '@travi/cli-messages';
import removeBadgePlugin from 'remark-remove-greenkeeper-badge';

export default async function ({projectRoot}) {
  info('Removing Greenkeeper badge', {level: 'secondary'});

  const pathToReadme = `${projectRoot}/README.md`;

  const file = await remark()
    .use(removeBadgePlugin)
    .process(await fs.readFile(pathToReadme, 'utf8'));

  await fs.writeFile(pathToReadme, `${file}`);
}
