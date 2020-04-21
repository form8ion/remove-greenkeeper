import any from '@travi/any';
import sinon from 'sinon';
import {assert} from 'chai';
import * as configRemover from './config';
import * as badgeRemover from './badge';
import removeGreenkeeper from './remove-greenkeeper';

suite('removal', () => {
  let sandbox;

  setup(() => {
    sandbox = sinon.createSandbox();

    sandbox.stub(configRemover, 'default');
    sandbox.stub(badgeRemover, 'default');
  });

  teardown(() => sandbox.restore());

  test('that greenkeeper details are removed', async () => {
    const projectRoot = any.string();

    assert.deepEqual(
      await removeGreenkeeper({projectRoot}),
      {
        nextSteps: [
          {summary: 'Remove the project from the list managed by the Greenkeeper GitHub App'},
          {summary: 'Remove the greenkeeper-keeper webhook'},
          {summary: 'Remove open PRs and branches that were opened by Greenkeeper'}
        ]
      }
    );

    assert.calledWith(configRemover.default, {projectRoot});
    assert.calledWith(badgeRemover.default, {projectRoot});
  });
});
