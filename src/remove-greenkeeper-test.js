import removeGreenkeeper from './remove-greenkeeper';

suite('removal', () => {
  test('that greenkeeper details are removed', async () => {
    await removeGreenkeeper();
  });
});
