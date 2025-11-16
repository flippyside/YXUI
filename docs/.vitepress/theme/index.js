import DefaultTheme from "vitepress/theme";
import YXIcon from "@yx/components/icon";
import "@yx/theme-chalk/src/index.scss";

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.use(YXIcon); // 在vitepress中注册全局组件
  },
};
