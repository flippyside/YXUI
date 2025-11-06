## 搭建 monorepo 环境

monorepo 是什么？
一个产品会有多个项目，每个项目之间会存在版本同步的问题，如何在其中一个项目发布上线后，保证每个项目版本升级后的版本同步问题，提出的解决方案就是 monorepo 策略。

monorepo 是一种将多个项目代码存储在一个仓库里的软件开发策略（mono 意为单一，repo 意为 仓库）。与之相对的是另一种流行的代码管理方式 MultiRepo，即每个项目对应一个单独的仓库来分散管理。

使用 pnpm 建立 monorepo。

## create.ts 实现 BEM 规范

BEM 命名规范：

- block 代码块、element 元素、modifier 装饰、state 状态
- `z-button` 、`z-button__element` 、`z-button__element--disable`、`is-checked`
- `:class=[bem.b('button')]`

通过 BEM 命名方式，模块层级关系简单清晰，而且 css 书写上也不必作过多的层级选择。

## SFC：单文件组件

使用 .vue 扩展名，将组件的模板、逻辑和样式封装在同一个文件中

## 组件命名

如果希望在使用组件时用<yx-icon></yx-icon>，那么注册时需要使用`YxIcon`

```ts
defineOptions({
  name: "YxIcon",
});
```

```ts
// 这里添加的类型，可以在模板中被解析
declare module "vue" {
  export interface GlobalComponents {
    YxIcon: typeof Icon;
  }
}
```

## 样式

Sass：是 CSS 扩展语言，可以帮助我们减少 CSS 重复的代码，节省开发时间

文件后缀为 .scss。

浏览器并不支持 Sass 代码。因此，你需要使用一个 Sass 预处理器将 Sass 代码转换为 CSS 代码。

## 静态代码分析

ESLint 是一款用于静态代码分析的工具，可以检查 JavaScript 代码中的语法错误、风格不一致以及潜在问题

使用 Prettier 插件可以实现代码的自动格式化

## 文档

使用 vitepress
