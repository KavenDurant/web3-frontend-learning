# Michael's Blog - Next.js 15 现代化博客系统

基于 Next.js 15 App Router 构建的现代化博客系统，展示了最新的 React 和 Next.js 特性的最佳实践。

## 🎯 项目特性

### ✅ 已完成功能

#### 核心功能
- [x] **文章列表页面** - 支持分页、标签筛选、响应式设计
- [x] **文章详情页面** - 完整的文章展示，包含元信息和导航
- [x] **API 接口层** - 统一的数据获取、错误处理、类型安全
- [x] **组件化设计** - 可复用的 UI 组件，提高开发效率

#### Next.js 15 特性
- [x] **App Router** - 使用最新的文件系统路由
- [x] **Server Components** - 服务端渲染，提供更好的性能和 SEO
- [x] **ISR (增量静态再生)** - 静态生成 + 定时更新
- [x] **TypeScript 支持** - 完整的类型安全和开发体验
- [x] **异步 searchParams** - 兼容 Next.js 15 的新 API

#### 性能优化
- [x] **代码分割** - 组件级别的代码分割
- [x] **懒加载** - 按需加载组件和资源
- [x] **缓存策略** - 合理的数据缓存和重新验证
- [x] **SEO 优化** - 完整的元数据和 Open Graph 支持

#### 开发体验
- [x] **TypeScript** - 完整的类型定义和类型安全
- [x] **ESLint** - 代码质量检查和规范
- [x] **Tailwind CSS** - 现代化的样式系统
- [x] **教育性注释** - 详细的中文注释解释 Next.js 特性

### 🚀 技术栈

- **框架**: Next.js 15.3.5
- **运行时**: React 19.0.0
- **语言**: TypeScript 5
- **样式**: Tailwind CSS 4
- **字体**: Geist Sans & Geist Mono
- **开发工具**: ESLint, Turbopack

### 📁 项目结构

```
articles-blog/
├── app/                          # Next.js App Router 目录
│   ├── api/                      # API 路由
│   │   └── articles/             # 文章相关 API
│   ├── articles/                 # 文章页面
│   │   ├── [id]/                 # 动态路由 - 文章详情
│   │   └── page.tsx              # 文章列表页
│   ├── layout.tsx                # 根布局
│   ├── page.tsx                  # 首页
│   └── globals.css               # 全局样式
├── components/                   # 可复用组件
│   ├── ArticleCard.tsx           # 文章卡片组件
│   ├── Pagination.tsx            # 分页组件
│   ├── EmptyState.tsx            # 空状态组件
│   ├── Header.tsx                # 页面头部
│   └── Footer.tsx                # 页面底部
├── lib/                          # 工具库和配置
│   ├── api/                      # API 服务层
│   │   ├── base.ts               # 基础 API 配置
│   │   ├── articles.ts           # 文章 API 服务
│   │   └── types.ts              # API 类型定义
│   ├── utils/                    # 工具函数
│   │   ├── url.ts                # URL 构建工具
│   │   └── format.ts             # 格式化工具
│   └── types.ts                  # 全局类型定义
└── public/                       # 静态资源
```

## 🏗️ 架构设计

### API 服务层架构

项目采用分层架构，将数据获取逻辑从页面组件中分离：

```typescript
// API 服务层 - 统一的数据获取和错误处理
export class ArticlesAPI {
  static async getArticles(params: ArticleListParams): Promise<ArticleListResponse> {
    // 统一的数据获取、错误处理、缓存逻辑
  }
}

// 页面组件 - 只负责 UI 渲染
export default async function ArticlesPage({ searchParams }: Props) {
  const data = await ArticlesAPI.getArticles(params);
  return <ArticlesList data={data} />;
}
```

### 组件设计原则

1. **单一职责** - 每个组件只负责一个功能
2. **可复用性** - 组件设计考虑复用场景
3. **类型安全** - 完整的 TypeScript 类型定义
4. **性能优化** - 合理使用 Server/Client Components

## 🎓 Next.js 特性说明

### Server Components vs Client Components

```typescript
// Server Component - 在服务端渲染，提供更好的性能和 SEO
export default async function ArticlesPage() {
  const data = await getArticlesList(); // 可以直接调用 API
  return <div>{/* 渲染内容 */}</div>;
}

// Client Component - 在客户端渲染，支持交互和状态管理
'use client';
export default function InteractiveComponent() {
  const [state, setState] = useState();
  return <div>{/* 交互内容 */}</div>;
}
```

### ISR (增量静态再生)

```typescript
// 每 60 秒重新验证页面内容
export const revalidate = 60;

export default async function Page() {
  // 页面会在构建时静态生成，然后每 60 秒重新验证
}
```

### 动态路由和类型安全

```typescript
// app/articles/[id]/page.tsx
interface Props {
  params: Promise<{ id: string }>; // Next.js 15 中 params 是 Promise
}

export default async function ArticlePage({ params }: Props) {
  const { id } = await params; // 需要 await params
}
```

## 🚀 快速开始

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

访问 [http://localhost:3002](http://localhost:3002) 查看应用。

### 构建生产版本

```bash
npm run build
npm start
```

## 📝 开发指南

### 添加新页面

1. 在 `app/` 目录下创建新的文件夹和 `page.tsx`
2. 使用 TypeScript 定义 Props 类型
3. 添加适当的元数据和 ISR 配置

### 创建新组件

1. 在 `components/` 目录下创建组件文件
2. 添加详细的 TypeScript 类型定义
3. 包含教育性注释说明组件用途

### API 开发

1. 在 `app/api/` 目录下创建路由文件
2. 使用 `lib/api/` 中的服务层调用 API
3. 确保类型安全和错误处理

## 🎯 考核目标完成情况

### 基础功能（60分）
- [x] 文章列表页（含分页）- ✅ 完成
- [x] 文章详情页 - ✅ 完成
- [ ] 文章创建页面 - 🚧 待开发
- [x] 基础 SEO 优化 - ✅ 完成
- [x] 实现 ISR 增量静态再生 - ✅ 完成

### 进阶功能（40分）
- [ ] 文章编辑/删除功能 - 🚧 待开发
- [ ] Markdown 内容渲染 - 🚧 待开发
- [x] 标签分类系统 - ✅ 完成
- [ ] 评论功能集成 - 🚧 待开发
- [ ] 部署到 Vercel - 🚧 待开发

## 📚 学习资源

- [Next.js 15 文档](https://nextjs.org/docs)
- [React 19 文档](https://react.dev/)
- [TypeScript 文档](https://www.typescriptlang.org/docs/)
- [Tailwind CSS 文档](https://tailwindcss.com/docs)

## 🤝 贡献指南

1. Fork 项目
2. 创建功能分支
3. 提交更改
4. 推送到分支
5. 创建 Pull Request

## 📄 许可证

MIT License
 