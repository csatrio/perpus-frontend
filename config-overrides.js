const {disableEsLint, addDecoratorsLegacy, override, overrideDevServer, watchAll} = require('customize-cra')

module.exports = {
    webpack: override(
        disableEsLint(),
        addDecoratorsLegacy()
    ),
    devServer: overrideDevServer(
        // dev server plugin
        watchAll()
    )
}

