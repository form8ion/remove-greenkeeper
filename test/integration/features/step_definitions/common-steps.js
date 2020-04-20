import stubbedFs from 'mock-fs';
import {After, Before, When} from 'cucumber';
import {removeGreenkeeper} from '../../../../lib/index.cjs';

Before(async function () {
  stubbedFs({'README.md': '# some-project'});
});

After(() => stubbedFs.restore());

When('the tool is executed', async function () {
  await removeGreenkeeper({projectRoot: process.cwd()});
});
