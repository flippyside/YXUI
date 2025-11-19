// 用于整合组件，最终实现导出组件
import { withInstall } from "@yx/utils/withInstall";
import _Input from "./src/input.vue";

const Input = withInstall(_Input);

export default Input; // 可以通过app.use来使用，也可以通过import方式单独使用

export * from "./src/input";

// 这里添加的类型，可以在模板中被解析
declare module "vue" {
  export interface GlobalComponents {
    YxInput: typeof Input;
  }
}
