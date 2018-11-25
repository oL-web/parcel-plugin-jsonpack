module.exports = (bundler) => {
    bundler.addAssetType('json', require.resolve('./JSONPackerAsset'));
};