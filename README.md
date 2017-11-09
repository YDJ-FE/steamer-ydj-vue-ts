# STEAMER-YDJ-VUE-TS
基于steamerjs体系的vue+ts+scss项目脚手架

* 参考/基于官方脚手架[steamer-vue](https://github.com/steamerjs/steamer-vue)的改造

* 脚手架使用`vue + ts + scss`的搭配， scss上用上了`sass-bem`的包，推荐使用bem风格的样式代码，

* vuex 方面使用`vuex-typescript`，比起vuex-class代码量会稍微有点多， 但是拥有更好的类型推断

* 由于目前对vue跟ts的亲善程度还没达到理想状态，即使配合上堪称完美的`vscode`，开发体验还是有点瑕疵，故暂时还是使用多文件组件方式开发， 配合[https://github.com/YDJ-FE/steamer-plugin-ydj-add](https://github.com/YDJ-FE/steamer-plugin-ydj-add)插件快速生成基础代码文件

## 快速启动

* 推荐 >> 使用[steamerjs](https://steamerjs.github.io/docs/projectkits/Bootstrap.html)安装

```javascript

npm i -g steamerjs steamer-plugin-kit

npm i -g steamer-ydj-vue-ts

steamer kit
```


## 常用命令

```javascript
// 安装依赖
npm i

// 开发
npm start 或 npm run dev
// 打开链接
localhost:9000

// 代码规范安装  // 配合编辑器插件使用， 这里不额外使用命令行检测
npm i -g eslint
npm i -g stylelint


// 生产代码生成
npm run dist 或 npm run pub

```

###TODO: steamer插件添加生成基础源代码文件（componet/view/pages）


## 脚手架文档
[参见文档-项目脚手架](https://steamerjs.github.io/docs/projectkits/Starterkit.html)


## 文章参考

* [webpack使用优化（基本篇）](https://github.com/lcxfs1991/blog/issues/2)
* [webpack Performance: The Comprehensive Guide](https://github.com/lcxfs1991/blog/issues/15)