import { createApp } from "vue";
import App from "./App.vue";

import Icon from "@yx/components/icon";
import Tree from "@yx/components/tree";
import "@yx/theme-chalk/src/index.scss";

// console.log(Icon);
// console.log(Icon.install);

const plugins = [Icon, Tree];

const app = createApp(App);

plugins.forEach((plugin) => {
  console.log("plugin:", plugin);

  app.use(plugin);
}); // 注册为全局组件

app.mount("#app");
