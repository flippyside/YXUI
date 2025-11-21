import { createApp } from "vue";
import App from "./App.vue";

import Icon from "@yx/components/icon";
import Tree from "@yx/components/tree";
import Checkbox from "@yx/components/checkbox";
import Button from "@yx/components/button";
import Input from "@yx/components/input";
import Upload from "@yx/components/upload";
import Calendar from "@yx/components/calendar";
import { FormItem, Form } from "@yx/components/form";
import "@yx/theme-chalk/src/index.scss";

// console.log(Icon);
// console.log(Icon.install);

const plugins = [
  Icon,
  Tree,
  Checkbox,
  Button,
  Input,
  FormItem,
  Form,
  Upload,
  Calendar,
];

const app = createApp(App);

plugins.forEach((plugin) => {
  app.use(plugin);
}); // 注册为全局组件

app.mount("#app");
