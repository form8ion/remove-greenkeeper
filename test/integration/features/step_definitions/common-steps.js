import {resolve} from 'node:path';

import stubbedFs from 'mock-fs';
import {After, Before, When} from '@cucumber/cucumber';

import {removeGreenkeeper} from '../../../../lib/index.cjs.js';

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
