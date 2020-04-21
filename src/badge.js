import fs from 'fs';
import removeBadgePlugin from 'remark-remove-greenkeeper-badge';
import remark from '../thirdparty-wrappers/remark';

export default function ({projectRoot}) {
  const pathToReadme = `${projectRoot}/README.md`;

  return new Promise((resolve, reject) => {
    remark()
      .use(removeBadgePlugin)
      .process(fs.readFileSync(pathToReadme, 'utf8'), (err, file) => {
        if (err) reject(err);
        else {
          fs.writeFileSync(pathToReadme, file);
          resolve();
        }
      });
  });
}
