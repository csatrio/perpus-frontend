const {disableEsLint, addDecoratorsLegacy, override, overrideDevServer, watchAll, addBundleVisualizer}
= require('customize-cra');

module.exports = {
    webpack: override(
        disableEsLint(),
        addDecoratorsLegacy(),
        addBundleVisualizer()
    ),
    devServer: overrideDevServer(
        // dev server plugin
        watchAll()
    )
};
