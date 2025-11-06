export function withInstall(comp) {
    const c = comp;
    c.install = (app) => {
        const name = c.name || c.__name;
        if (!name) {
            console.warn("组件缺少 name，无法全局注册");
            return;
        }
        app.component(name, c);
    };
    return c;
}
//# sourceMappingURL=withInstall.js.map