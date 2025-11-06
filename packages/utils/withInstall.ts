import { App, Plugin } from "vue";

export type SFCWithInstall<T> = T & Plugin;
// export function withInstall<T>(comp: T) {
//   (comp as SFCWithInstall<T>).install = function (app) {
//     const { name } = comp as unknown as { name: string };
//     app.component(name, comp); // 将组件注册成全局组件
//   };
//   return comp as SFCWithInstall<T>;
// }
export function withInstall<T>(comp: T) {
  const c = comp as any;
  c.install = (app: App) => {
    const name = c.name || c.__name; // 取组件 name 或 __name
    if (!name) {
      console.warn("组件缺少 name，无法全局注册");
      return;
    }
    app.component(name, c); // ✅ 现在 name 一定有效
  };
  return c as SFCWithInstall<T>;
}
