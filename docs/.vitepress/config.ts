import { defineConfig } from 'vitepress'

export default defineConfig({
  title: '技术知识库',
  description: '.NET / Vue / 架构 / 项目实战 - 面试备战 & 日常沉淀',
  themeConfig: {
    nav: [
      { text: '面试知识', link: '/interview/' },
      { text: '前端 Vue', link: '/frontend/' },
      { text: '项目实战', link: '/project/' },
      { text: '高频面试题', link: '/qa/' }
    ],
    sidebar: {
      '/interview/': [
        {
          text: '.NET 高级开发',
          items: [
            { text: 'C# 语言深度', link: '/interview/csharp/value-reference-types/' },
            { text: 'async/await 异步编程', link: '/interview/csharp/async-await/' },
            { text: 'ASP.NET Core', link: '/interview/aspnet/' },
            { text: '架构与分布式', link: '/interview/arch/' }
          ]
        }
      ],
      '/frontend/': [
        {
          text: 'Vue 前端',
          items: [
            { text: 'Vue 2 响应式原理', link: '/frontend/vue/vue2-reactivity/' },
            { text: 'Vue 3 Composition API', link: '/frontend/vue/vue3-composition-api/' }
          ]
        }
      ],
      '/project/': [
        {
          text: 'PIVAS 静配系统',
          items: [
            { text: '批次标签双签规则', link: '/project/pivas/dual-sign/' },
            { text: '医嘱状态机设计', link: '/project/pivas/order-state-machine/' }
          ]
        }
      ]
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/berrcharles008-hash' }
    ],
    footer: {
      message: '持续更新中...',
      copyright: 'Copyright © 2026'
    }
  }
})
