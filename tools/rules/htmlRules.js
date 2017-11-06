// @ts-nocheck


module.exports = function (config) {
    const configWebpack = config.webpack;

    // 模板loader
    const templateRules = {
        html: {
            test: /\.html$/,
            loader: 'html-loader'
        },
        pug: {
            test: /\.pug$/,
            loader: 'pug-loader'
        },
        handlebars: {
            test: /\.handlebars$/,
            loader: 'handlebars-loader'
        },
        ejs: {
            test: /\.ejs$/,
            loader: 'ejs-compiled-loader',
            query: {
                htmlmin: true, // or enable here
                htmlminOptions: {
                    removeComments: true
                }
            }
        }
    };

    const rules = [];

    configWebpack.template.forEach(tpl => {
        const rule = templateRules[tpl] || '';
        rule && rules.push(rule);
    });

    return rules;
};
