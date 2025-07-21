/**
 * 文章详情页面
 *
 * Next.js App Router 特性说明：
 * 1. 这是一个 Server Component，在服务端渲染，提供更好的 SEO
 * 2. 使用 ISR (Incremental Static Regeneration) 实现静态生成 + 定时更新
 * 3. 支持动态路由参数 [id]
 * 4. 通过 API 服务层获取数据，包含错误处理
 */

import Link from "next/link";
import { notFound } from "next/navigation";
import { getArticleById } from "@/lib/api/articles";
import { ArticlePageParams } from "@/lib/types";
import { formatDateTime } from "@/lib/utils/format";

// ISR 配置：每 60 秒重新验证页面内容
export const revalidate = 60;

// 文章详情页面的 Props 类型
interface ArticleDetailPageProps {
  params: Promise<ArticlePageParams>;
}

/**
 * 文章详情页面组件
 *
 * 功能：
 * - 展示完整的文章内容
 * - 显示文章元信息（作者、时间、标签）
 * - 提供返回列表的导航
 * - 支持 Markdown 内容渲染
 */
export default async function ArticleDetailPage({ params }: ArticleDetailPageProps) {
  // Next.js 15 兼容性：await params
  const { id } = await params;

  try {
    // 通过 API 服务层获取文章数据
    const article = await getArticleById(id);

    return (
      <article className="max-w-4xl mx-auto">
        {/* 返回导航 */}
        <div className="mb-6">
          <Link
            href="/articles"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            返回文章列表
          </Link>
        </div>

        {/* 文章头部 */}
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {article.title}
          </h1>

          {/* 文章元信息 */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-6">
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
              <span>作者：{article.author}</span>
            </div>

            <div className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <time dateTime={article.createdAt}>
                发布于：{formatDateTime(article.createdAt)}
              </time>
            </div>

            {article.updatedAt !== article.createdAt && (
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <time dateTime={article.updatedAt}>
                  更新于：{formatDateTime(article.updatedAt)}
                </time>
              </div>
            )}
          </div>

          {/* 标签 */}
          {article.tags && article.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/articles?tag=${encodeURIComponent(tag)}`}
                  className="px-3 py-1 bg-blue-50 text-blue-600 text-sm rounded-full hover:bg-blue-100 transition-colors"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          )}
        </header>

        {/* 文章内容 */}
        <div className="prose prose-lg max-w-none">
          {/* 简单的 Markdown 渲染 - 后续可以集成专门的 Markdown 渲染器 */}
          <div className="whitespace-pre-wrap text-gray-800 leading-relaxed">
            {article.content}
          </div>
        </div>

        {/* 文章底部操作 */}
        <footer className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <Link
              href="/articles"
              className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              返回列表
            </Link>

            <div className="text-sm text-gray-500">
              文章ID: {article.id}
            </div>
          </div>
        </footer>
      </article>
    );

  } catch (error) {
    // 如果文章不存在，返回 404 页面
    console.error('Failed to fetch article:', error);
    notFound();
  }
}