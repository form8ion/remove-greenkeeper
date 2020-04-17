import {promises as fs} from 'fs';
import sinon from 'sinon';
import {assert} from 'chai';
import any from '@travi/any';
import removeConfigFile from './config';

suite('config', () => {
  let sandbox;
  const projectRoot = any.string();

  setup(() => {
    sandbox = sinon.createSandbox();

    sandbox.stub(fs, 'unlink');
  });

  teardown(() => sandbox.restore());

  test('that that an existing config file is removed', async () => {
    await removeConfigFile({projectRoot});

    assert.calledWith(fs.unlink, `${projectRoot}/greenkeeper.json`);
  });

  test('that no error is thrown when no config file exists', async () => {
    fs.unlink.rejects(new Error('from test'));

    await removeConfigFile({projectRoot});
  });
});
