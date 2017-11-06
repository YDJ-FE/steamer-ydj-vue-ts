// @ts-nocheck
/* eslint-disable import/no-extraneous-dependencies */

// used for install dependencies and files to support certain kinds of features

// const path = require('path');
const project = require('../../config/project');
const pkgJson = require('../../package.json');
const merge = require('lodash.merge');
const spawnSync = require('child_process').spawnSync;
const utils = require('steamer-webpack-utils');

// 候选安装依赖项
const dependency = {
    template: {
        html: {
            'html-loader': '^0.4.5'
        },
        handlebars: {
            'handlebars-loader': '^1.5.0',
            handlebars: '^4.0.10'
        },
        pug: {
            'pug-loader': '^2.3.0',
            pug: '^2.0.0-rc.2'
        },
        ejs: {
            'ejs-compiled-loader': '^1.1.0',
            ejs: '^2.5.6'
        }

    },
    style: {
        css: {
            'style-loader': '^0.18.2',
            'css-loader': '^0.28.4'
        },
        less: {
            'style-loader': '^0.18.2',
            'css-loader': '^0.28.4',
            less: '^2.7.2',
            'less-loader': '^4.0.5'
        },
        sass: {
            'style-loader': '^0.18.2',
            'css-loader': '^0.28.4',
            'node-sass': '^4.5.3',
            'sass-loader': '^6.0.6'
        },
        scss: {
            'style-loader': '^0.18.2',
            'css-loader': '^0.28.4',
            'node-sass': '^4.5.3',
            'sass-loader': '^6.0.6'
        },
        stylus: {
            'style-loader': '^0.18.2',
            'css-loader': '^0.28.4',
            stylus: '^0.54.5',
            'stylus-loader': '^3.0.1'
        }
    }
};

const files = {
    template: {},
    style: {},
    js: {}
};

module.exports = {
    installDependency() {
        const dependencies = merge({}, pkgJson.dependencies, pkgJson.devDependencies);

        const installDep = {}; // 待安装的依赖
        const installFile = {
            template: {},
            style: {},
            js: {}
        };
        let cmd = '';

        project.webpack.template.forEach(type => {
            const dep = dependency.template[type] || {};

            Object.keys(dep).forEach(depItem => {
                if (!dependencies[depItem]) {
                    installDep[depItem] = dependency.template[type][depItem];
                    installFile.template[type] = true;
                }
            });
        });

        project.webpack.style.forEach(type => {
            const dep = dependency.style[type] || {};

            Object.keys(dep).forEach(depItem => {
                if (!dependencies[depItem]) {
                    installDep[depItem] = dependency.style[type][depItem];
                    installFile.style[type] = true;
                }
            });
        });

        Object.keys(installDep).forEach(item => {
            cmd += (`${item}@${installDep[item]} `);
        });

        if (cmd) {
            utils.info('Start installing missing dependencies. Please wait......');
            this.copyFile(installFile);
            spawnSync(project.npm, ['install', '--save-dev', '--registry=https://registry.npm.taobao.org', cmd], { stdio: 'inherit', shell: true });
            utils.info('Dependencies installation complete. Please run your command again.');
            return true;
        }

        return false;
    },
    copyFile(installFile) {
        Object.keys(installFile.template).forEach(type => {
            const fileArr = files.template[type] || [];
            fileArr.forEach(item2 => {
                utils.info(`file ${item2.src} is copyied to ${item2.dist}`);
                utils.fs.copySync(item2.src, item2.dist);
            });
        });

        Object.keys(installFile.style).forEach(type => {
            const fileArr = files.style[type] || [];
            fileArr.forEach(item2 => {
                utils.info(`file ${item2.src} is copyied to ${item2.dist}`);
                utils.fs.copySync(item2.src, item2.dist);
            });
        });
        Object.keys(installFile.js).forEach(type => {
            const fileArr = files.js[type] || [];
            fileArr.forEach(item2 => {
                utils.info(`file ${item2.src} is copyied to ${item2.dist}`);
                utils.fs.copySync(item2.src, item2.dist);
            });
        });
    }
};
