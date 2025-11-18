import { withInstall } from "@yx/utils/withInstall";
import _Virtual from "./src/virtual";

const VirtualList = withInstall(_Virtual);

export default VirtualList;

// export * from "./src/virtual";

declare module "vue" {
  export interface GlobalComponents {
    YxVirtualList: typeof _Virtual;
  }
}
