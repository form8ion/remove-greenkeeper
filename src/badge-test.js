import fs from 'fs';
import removeBadgePlugin from 'remark-remove-greenkeeper-badge';
import any from '@travi/any';
import sinon from 'sinon';
import {assert} from 'chai';
import * as remark from '../thirdparty-wrappers/remark';
import removeBadge from './badge';

suite('badge removal', () => {
  let sandbox, process;
  const projectRoot = any.string();

  setup(() => {
    sandbox = sinon.createSandbox();

    sandbox.stub(remark, 'default');
    sandbox.stub(fs, 'readFileSync');
    sandbox.stub(fs, 'writeFileSync');

    const use = sinon.stub();
    process = sinon.stub();
    remark.default.returns({use});
    use.withArgs(removeBadgePlugin).returns({process});
  });

  teardown(() => sandbox.restore());

  test('that the badge is removed from the README', async () => {
    const pathToReadmeFile = `${projectRoot}/README.md`;
    const existingFileContents = any.string();
    const updatedFileContents = any.string();
    fs.readFileSync.withArgs(pathToReadmeFile, 'utf8').returns(existingFileContents);
    process.withArgs(existingFileContents).yields(null, updatedFileContents);

    await removeBadge({projectRoot});

    assert.calledWith(fs.writeFileSync, pathToReadmeFile, updatedFileContents);
  });

  test('that a processing failure rejects the promise', async () => {
    const error = new Error('from test');
    process.yields(error);

    try {
      await removeBadge({projectRoot});

      throw new Error('Calling the removal plugin should have thrown an error in this test');
    } catch (err) {
      assert.equal(err, error);
    }
  });
});
