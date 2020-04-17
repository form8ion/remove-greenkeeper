import any from '@travi/any';
import sinon from 'sinon';
import {assert} from 'chai';
import * as configRemover from './config';
import removeGreenkeeper from './remove-greenkeeper';

suite('removal', () => {
  let sandbox;

  setup(() => {
    sandbox = sinon.createSandbox();

    sandbox.stub(configRemover, 'default');
  });

  teardown(() => sandbox.restore());

  test('that greenkeeper details are removed', async () => {
    const projectRoot = any.string();

    await removeGreenkeeper({projectRoot});

    assert.calledWith(configRemover.default, {projectRoot});
  });
});
