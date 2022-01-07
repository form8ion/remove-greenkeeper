import {promises as fs} from 'fs';
import {Given, Then} from '@cucumber/cucumber';
import any from '@travi/any';
import {assert} from 'chai';

const pathToConfigFile = `${process.cwd()}/greenkeeper.json`;

Given('a config file exists', async function () {
  await fs.writeFile(pathToConfigFile, JSON.stringify(any.simpleObject()));
});

Given('no config file exists in the project', async function () {
  return undefined;
});

Then('no config file exists', function () {
  return fs.stat(pathToConfigFile).then(
    () => {
      throw new Error(`${pathToConfigFile} should have been removed, but still exists`);
    },
    err => assert.equal(err.code, 'ENOENT', err.message)
  );
});
