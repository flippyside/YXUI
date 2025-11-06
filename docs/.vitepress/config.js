// import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
module.exports = {
  title: "YX UI",
  description: "一套轻量、灵活的 Vue3 组件库",
  base: "/", // 部署到子路径时可改成 /yx-ui/

  themeConfig: {
    logo: "/logo.svg",

    // 顶部导航栏
    nav: [
      { text: "指南", link: "/guide/getting-started" },
      { text: "组件", link: "/components/button" },
      { text: "GitHub", link: "https://github.com/flippyside" },
    ],

    // 侧边栏结构
    sidebar: {
      "/guide/": [
        {
          text: "开发指南",
          items: [
            { text: "快速开始", link: "/guide/getting-started" },
            { text: "主题定制", link: "/guide/theme" },
          ],
        },
      ],
      "/components/": [
        {
          text: "基础组件",
          items: [
            { text: "Button 按钮", link: "/components/button" },
            { text: "Icon 图标", link: "/components/icon" },
          ],
        },
      ],
    },

    // 页脚
    footer: {
      message: "基于 MIT 许可发布",
      copyright: "Copyright © 2025 YX UI",
    },

    // 社交链接（右上角图标）
    socialLinks: [
      { icon: "github", link: "https://github.com/yourname/yx-ui" },
    ],
  },

  // markdown 配置
  markdown: {
    lineNumbers: true, // 显示代码行号
  },

  // Vite 相关配置（可选）
  vite: {
    server: {
      port: 5173,
    },
    resolve: {
      alias: {
        "@": "/src",
      },
    },
  },
};
