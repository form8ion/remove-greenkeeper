import fs from 'fs';
import {info} from '@travi/cli-messages';
import removeBadgePlugin from 'remark-remove-greenkeeper-badge';
import remark from '../thirdparty-wrappers/remark';

export default function ({projectRoot}) {
  info('Removing Greenkeeper badge', {level: 'secondary'});

  const pathToReadme = `${projectRoot}/README.md`;

  return new Promise((resolve, reject) => {
    remark()
      .use(removeBadgePlugin)
      .process(fs.readFileSync(pathToReadme, 'utf8'), (err, file) => {
        if (err) reject(err);
        else {
          fs.writeFileSync(pathToReadme, file.contents);
          resolve();
        }
      });
  });
}
