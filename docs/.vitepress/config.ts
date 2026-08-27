import { defineConfig } from 'vitepress'

export default defineConfig({
  title: '技术知识库',
  description: '.NET / Vue / 架构 / 项目实战',
  base: '/',
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '面试知识', link: '/interview/' }
    ],
    sidebar: [
      {
        text: '面试知识',
        items: [
          { text: '总览', link: '/interview/' },
          { text: 'C# 深度', link: '/interview/csharp/' }
        ]
      }
    ]
  }
})
