import {promises as fs} from 'fs';
import {Given, Then} from 'cucumber';
import {assert} from 'chai';
import any from '@travi/any';

const pathToReadme = `${process.cwd()}/README.md`;

Given('an inline greenkeeper badge exists', async function () {
  await fs.writeFile(
    pathToReadme,
    `# some-project

[![Greenkeeper badge](https://badges.greenkeeper.io/${any.word()}/${any.word()}.svg)](https://greenkeeper.io/)
`
  );
});

Given('a greenkeeper badge exists with references', async function () {
  await fs.writeFile(
    pathToReadme,
    `# some-project

[![Greenkeeper][greenkeeper-badge]][greenkeeper-link]

[greenkeeper-link]: https://greenkeeper.io/
[greenkeeper-badge]: https://badges.greenkeeper.io/${any.word()}/${any.word()}.svg
`
  );
});

Then('the greenkeeper badge is removed from the README', async function () {
  assert.equal(
    await fs.readFile(pathToReadme, 'utf8'),
    `# some-project
`
  );
});
