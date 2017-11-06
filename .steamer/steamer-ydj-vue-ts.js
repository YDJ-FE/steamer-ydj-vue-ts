module.exports = {
    files: [
        "src",
        "tools",
        "config",
        "README.md",
        ".eslintrc.js",
        ".eslintignore",
        ".stylelintrc.js",
        ".stylelintignore",
        "postcss.config.js",
        ".gitignore",
        "tsconfig.json",
        "tslint.json"        
    ],
    options: [
        {
            type: 'input',
            name: 'webserver',
            message: 'html url(//localhost:9000/)',
            default: "//localhost:9000/",
        },
        {
            type: 'input',
            name: 'cdn',
            message: 'common cdn url(//localhost:8000/)',
            default: "//localhost:8000/",
        },
        {
            type: 'input',
            name: 'port',
            message: 'development server port(9000)',
            default: '9000',
        }
    ]
};