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
            { text: 'C# 语言深度', link: '/interview/csharp/' },
            { text: 'ASP.NET Core', link: '/interview/aspnet/' },
            { text: '架构与分布式', link: '/interview/arch/' },
            { text: '测试与 DevOps', link: '/interview/testing-devops/' }
          ]
        }
      ],
      '/frontend/': [
        {
          text: 'Vue 前端',
          items: [
            { text: 'Vue 2 核心', link: '/frontend/vue2/' },
            { text: 'Vue 3 新特性', link: '/frontend/vue3/' },
            { text: 'TypeScript', link: '/frontend/ts/' },
            { text: '工程化与性能', link: '/frontend/engineering/' }
          ]
        }
      ],
      '/project/': [
        {
          text: 'PIVAS 静配系统',
          items: [
            { text: '批次标签双签规则', link: '/project/pivas/dual-sign/' },
            { text: '医嘱状态机设计', link: '/project/pivas/order-state-machine/' },
            { text: '主药溶媒识别', link: '/project/pivas/main-drug-identify/' },
            { text: '数据对账机制', link: '/project/pivas/reconciliation/' }
          ]
        },
        {
          text: '技术难点复盘',
          items: [
            { text: '内存泄漏定位', link: '/project/troubleshoot/memory-leak/' },
            { text: 'SQL 慢查询优化', link: '/project/troubleshoot/slow-sql/' }
          ]
        }
      ],
      '/qa/': [
        {
          text: '面试高频 Q&A',
          items: [
            { text: 'C# 基础与进阶', link: '/qa/csharp-basics/' },
            { text: '异步编程专题', link: '/qa/async-topics/' },
            { text: 'Vue 原理与设计', link: '/qa/vue-topics/' },
            { text: '架构设计题', link: '/qa/architecture-questions/' }
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
