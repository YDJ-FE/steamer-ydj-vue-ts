// @ts-nocheck
/* eslint-disable import/no-extraneous-dependencies, no-bitwise, max-len, no-console */

const path = require('path');

const SpritesmithPlugin = require('webpack-spritesmith');

module.exports = function (config, webpack) {
    const configWebpack = config.webpack;

    const plugins = [];

    configWebpack.sprites = (configWebpack.spriteMode === 'none') ? [] : configWebpack.sprites;

    configWebpack.sprites.forEach(sprites => {
        const style = configWebpack.spriteStyle;
        const extMap = {
            stylus: 'styl',
            less: 'less',
            sass: 'sass',
            scss: 'scss'
        };
        const spriteMode = (~sprites.key.indexOf('_retina')) ? 'retinaonly' : configWebpack.spriteMode;
        const retinaTplMap = {
            retinaonly: '_retinaonly',
            normal: '',
            retina: '_retina'
        };
        const retinaTpl = retinaTplMap[spriteMode] || '';

        const spritesConfig = {
            src: {
                cwd: sprites.path,
                glob: '*.png'
            },
            target: {
                image: path.join(configWebpack.path.src, `css/sprites/${sprites.key}.png`),
                css: [
                    [
                        path.join(configWebpack.path.src, `css/sprites/${sprites.key}.${extMap[style]}`),
                    ]
                ]
            },
            spritesmithOptions: {
                padding: 10
            },
            apiOptions: {
                cssImageRef: `~${sprites.key}.png`
            }
        };

        const templatePath = require.resolve(`spritesheet-templates-steamer/lib/templates/${style}${retinaTpl}.template.handlebars`);
        // path.join(__dirname, '../../node_modules/', './spritesheet-templates-steamer/lib/templates/' + style + retinaTpl + '.template.handlebars');
        console.log(templatePath);
        spritesConfig.customTemplates = {
            [`${sprites.key}${retinaTpl}`]: templatePath
        };


        if (spriteMode === 'retina') {
            spritesConfig.retina = '@2x';
            spritesConfig.target.css[0].push({
                format: `${sprites.key}`
            });
        } else {
            spritesConfig.target.css[0].push({
                format: `${sprites.key}${retinaTpl}`
            });
        }

        plugins.push(new SpritesmithPlugin(spritesConfig));
    });

    return plugins;
};
