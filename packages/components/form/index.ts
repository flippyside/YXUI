// 用于整合组件，最终实现导出组件
import { withInstall } from "@yx/utils/withInstall";
import _FormItem from "./src/form-item.vue";
import _Form from "./src/form.vue";

const FormItem = withInstall(_FormItem);
const Form = withInstall(_Form);
export { FormItem }; // 可以通过app.use来使用，也可以通过import方式单独使用
export { Form }; // 可以通过app.use来使用，也可以通过import方式单独使用

export * from "./src/form-item";
export * from "./src/form";

export type FormInstance = InstanceType<typeof Form>;

// 这里添加的类型，可以在模板中被解析
declare module "vue" {
  export interface GlobalComponents {
    YxFormItem: typeof FormItem;
    YxForm: typeof Form;
  }
}
