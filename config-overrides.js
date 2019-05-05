const {disableEsLint, addDecoratorsLegacy, override, overrideDevServer, watchAll, addBundleVisualizer}
= require('customize-cra');

const isProduction = process.env.NODE_ENV === 'production'

const webpackDev = override(
    disableEsLint(),
    addDecoratorsLegacy()
)

const webpackProd = override(
    disableEsLint(),
    addDecoratorsLegacy(),
    addBundleVisualizer()
)

module.exports = {
    webpack: isProduction ? webpackProd : webpackDev,
    devServer: overrideDevServer(
        // dev server plugin
        watchAll()
    )
};
