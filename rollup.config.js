import uglify from 'rollup-plugin-uglify';
import { minify } from 'uglify-es';

export default {
    entry: 'bundles/index.js',
    dest: 'bundles/ng2-completer.umd.js',
    format: 'umd',
    treeshake: true,
    moduleName: 'ng2Completer',
    sourceMap: true,
    exports: 'named',
    onwarn: function (warning) {
        // Suppress this error message... there are hundreds of them. Angular team says to ignore it.
        // https://github.com/rollup/rollup/wiki/Troubleshooting#this-is-undefined
        if (warning.code === 'THIS_IS_UNDEFINED')
            return;
        },
    plugins: [
        uglify({},minify)
    ],
    globals: {
        '@angular/core': 'ng.core',
        '@angular/common': 'ng.common',
        '@angular/compiler': 'ng.compiler',
        '@angular/forms': 'ng.forms',
        '@angular/platform-browser': 'ng.platformBrowser',
        '@angular/platform-browser-dynamic': 'ng.platformBrowserDynamic',
        'rxjs/Observable': 'Rx',
        'rxjs/Rx': 'Rx'
    },
    external: [
        '@angular/core',
        '@angular/common',
        '@angular/compiler',
        '@angular/forms',
        '@angular/platform-browser',
        '@angular/platform-browser-dynamic',
        'rxjs/Observable'
    ]
}