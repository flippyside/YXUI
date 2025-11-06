import { createApp } from "vue";
import App from "./App.vue";
import Icon from "@yx/components/icon";
import "@yx/theme-chalk/src/index.scss";
console.log(Icon);
console.log(Icon.install);
const plugins = [Icon];
const app = createApp(App);
plugins.forEach((plugin) => {
    console.log("plugin:", plugin);
    app.use(plugin);
});
app.mount("#app");
//# sourceMappingURL=main.js.map