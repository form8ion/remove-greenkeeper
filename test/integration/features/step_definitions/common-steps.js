import {dirname, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';

import stubbedFs from 'mock-fs';
import {After, Before, When} from '@cucumber/cucumber';

// eslint-disable-next-line import/no-extraneous-dependencies,import/no-unresolved
import {removeGreenkeeper} from '@form8ion/remove-greenkeeper';

const __dirname = dirname(fileURLToPath(import.meta.url));        // eslint-disable-line no-underscore-dangle

Before(async function () {
  stubbedFs({
    node_modules: stubbedFs.load(resolve(__dirname, '../../../../', 'node_modules')),
    'README.md': '# some-project'
  });
});

After(() => stubbedFs.restore());

When('the tool is executed', async function () {
  await removeGreenkeeper({projectRoot: process.cwd()});
});
