// 文章相关接口
import { NextResponse } from "next/server";
import { Article } from "@/lib/types";
// 1. 全局挂载 mockArticles
const globalAny = global as any;
if (!globalAny.mockArticles) {
  globalAny.mockArticles = [
    {
      id: "1",
      title: "Next.js 15 新特性详解",
      content: "# Next.js 15 带来了许多激动人心的新特性\n\n## 1. 改进的App Router\n\n新版本的App Router提供了更好的性能和开发体验，支持嵌套路由、并行路由和拦截路由等高级功能。通过文件系统路由，开发者可以更直观地组织页面结构。\n\n## 2. Server Components优化\n\nServer Components在服务端渲染，减少了客户端JavaScript包的大小，提供更快的首屏加载速度。同时支持流式渲染，用户可以更快看到页面内容。\n\n## 3. 增强的缓存机制\n\n新的缓存策略让应用性能得到显著提升，支持更细粒度的缓存控制。",
      author: "张三",
      tags: ["Next.js", "React", "前端"],
      createdAt: "2024-01-15T10:00:00Z",
      updatedAt: "2024-01-15T10:00:00Z"
    },
    {
      id: "2",
      title: "React Server Components 实战指南",
      content: "# React Server Components 完全指南\n\n## 什么是Server Components\n\nServer Components是React的一个革命性新特性，它允许组件在服务端渲染，而不需要发送到客户端。这种架构带来了显著的性能提升和更好的用户体验。\n\n## 核心优势\n\n1. **减少包大小**: 服务端组件不会增加客户端JavaScript包的大小\n2. **更快的加载**: 直接在服务端渲染，减少网络请求\n3. **更好的SEO**: 服务端渲染的内容对搜索引擎更友好\n\n## 实际应用场景\n\n在数据获取、静态内容展示等场景中，Server Components表现尤为出色。",
      author: "李四",
      tags: ["React", "Server Components"],
      createdAt: "2024-01-14T09:30:00Z",
      updatedAt: "2024-01-14T09:30:00Z"
    },
    {
      id: "3",
      title: "TypeScript 5.0 高级特性解析",
      content: "# TypeScript 5.0 带来的重大更新\n\n## 装饰器支持\n\nTypeScript 5.0 正式支持了装饰器语法，这是一个期待已久的功能。装饰器可以用于类、方法、属性等，提供了更强大的元编程能力。\n\n## 性能优化\n\n新版本在编译速度和内存使用方面都有显著改进，特别是在大型项目中表现更加出色。增量编译和智能缓存让开发体验更加流畅。\n\n## 类型系统增强\n\n引入了更精确的类型推断和更好的错误提示，帮助开发者更快地定位和解决问题。新的工具类型让类型操作更加便捷。",
      author: "王五",
      tags: ["TypeScript", "编程语言", "前端"],
      createdAt: "2024-01-13T14:20:00Z",
      updatedAt: "2024-01-13T14:20:00Z"
    },
    {
      id: "4",
      title: "现代化CSS布局技术详解",
      content: "# 掌握现代CSS布局的核心技术\n\n## Grid布局系统\n\nCSS Grid是最强大的布局系统，它提供了二维布局能力，可以同时控制行和列。通过简洁的语法，可以创建复杂的网格布局，适用于各种设计需求。\n\n## Flexbox的最佳实践\n\nFlexbox专注于一维布局，在处理组件内部元素排列时表现出色。结合Grid使用，可以构建出既灵活又强大的布局系统。\n\n## 响应式设计策略\n\n现代CSS提供了丰富的响应式设计工具，包括媒体查询、容器查询等。合理运用这些技术，可以创建适配各种设备的优秀用户界面。",
      author: "赵六",
      tags: ["CSS", "布局", "响应式设计"],
      createdAt: "2024-01-12T16:45:00Z",
      updatedAt: "2024-01-12T16:45:00Z"
    },
    {
      id: "5",
      title: "Vue 3 Composition API 深度实践",
      content: "# Vue 3 Composition API 完全指南\n\n## 响应式系统重构\n\nVue 3的响应式系统基于Proxy重新设计，提供了更好的性能和更完整的响应式支持。新的响应式API让状态管理变得更加直观和强大。\n\n## 组合式函数的威力\n\nComposition API通过组合式函数实现逻辑复用，相比mixins更加清晰和可维护。可以将相关的逻辑组织在一起，提高代码的可读性。\n\n## 性能优化技巧\n\n利用Vue 3的新特性，如静态提升、补丁标记等，可以显著提升应用性能。合理使用ref和reactive，避免不必要的响应式开销。",
      author: "钱七",
      tags: ["Vue.js", "Composition API", "前端框架"],
      createdAt: "2024-01-11T11:15:00Z",
      updatedAt: "2024-01-11T11:15:00Z"
    },
    {
      id: "6",
      title: "Node.js 性能优化实战经验",
      content: "# Node.js 应用性能优化全攻略\n\n## 内存管理优化\n\nNode.js应用的内存泄漏是常见问题，通过合理的内存管理策略，可以显著提升应用稳定性。使用内存分析工具定位问题，优化数据结构和算法。\n\n## 异步编程最佳实践\n\n充分利用Node.js的异步特性，避免阻塞操作。合理使用Promise、async/await，以及流处理等技术，提升应用的并发处理能力。\n\n## 集群和负载均衡\n\n通过集群模式和负载均衡，可以充分利用多核CPU资源。结合PM2等进程管理工具，构建高可用的Node.js应用架构。",
      author: "孙八",
      tags: ["Node.js", "性能优化", "后端开发"],
      createdAt: "2024-01-10T13:30:00Z",
      updatedAt: "2024-01-10T13:30:00Z"
    }
  ]
}
export const mockArticles = globalAny.mockArticles;
// Mock数据 - 确保所有文章内容长度相似，保持卡片高度一致


// GET /api/articles - 获取文章列表（支持分页、标签筛选）
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");
  const tag = searchParams.get("tag");

  let filteredArticles = mockArticles;
  if (tag) {
    filteredArticles = mockArticles.filter(article =>
      article.tags.includes(tag)
    );
  }

  const startIndex = (page - 1) * limit;
  const paginatedArticles = filteredArticles.slice(startIndex, startIndex + limit);

  return NextResponse.json({
    articles: paginatedArticles,
    total: filteredArticles.length,
    page,
    limit,
    hasMore: startIndex + limit < filteredArticles.length
  });
}

// POST /api/articles - 创建文章
export async function POST(request: Request) {
  const body = await request.json();
  const newArticle: Article = {
    id: String(mockArticles.length + 1),
    ...body,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  mockArticles.unshift(newArticle);
  return NextResponse.json(newArticle, { status: 201 });
}