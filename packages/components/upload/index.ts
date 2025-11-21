// 用于整合组件，最终实现导出组件
import { withInstall } from "@yx/utils/withInstall";
import _Upload from "./src/upload.vue";

const Upload = withInstall(_Upload);

export default Upload; // 可以通过app.use来使用，也可以通过import方式单独使用

export * from "./src/upload";

// 这里添加的类型，可以在模板中被解析
declare module "vue" {
  export interface GlobalComponents {
    YxUpload: typeof Upload;
  }
}
