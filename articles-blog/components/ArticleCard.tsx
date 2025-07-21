/**
 * 文章卡片组件
 * 
 * Next.js 特性说明：
 * 1. 这是一个 Server Component，在服务端渲染，提供更好的性能
 * 2. 使用 Link 组件实现客户端路由，提供更好的用户体验
 * 3. 组件化设计提高代码复用性和可维护性
 */

import Link from "next/link";
import { Article } from "@/lib/types";
import { buildTagFilterUrl } from "@/lib/utils/url";
import { extractTextPreview, formatDate } from "@/lib/utils/format";

interface ArticleCardProps {
  /** 文章数据 */
  article: Article;
  /** 当前搜索参数，用于构建标签链接 */
  currentSearch?: string;
  /** 是否显示删除按钮 */
  showDeleteButton?: boolean;
  /** 删除按钮点击回调 */
  onDelete?: (articleId: string) => void;
}

/**
 * 文章卡片组件
 * 
 * 功能：
 * - 展示文章基本信息（标题、内容预览、作者、时间）
 * - 显示文章标签，点击可筛选
 * - 提供阅读全文和删除操作
 * - 响应式设计，适配不同屏幕尺寸
 */
export default function ArticleCard({ 
  article, 
  currentSearch,
  showDeleteButton = false,
  onDelete 
}: ArticleCardProps) {
  
  // 使用工具函数处理内容预览和日期格式化

  return (
    <article className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-gray-200 flex flex-col h-full">
      {/* 文章内容 */}
      <div className="p-6 flex flex-col flex-1">
        {/* 文章标题 - 固定高度 */}
        <h2 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2 hover:text-blue-600 transition-colors min-h-[3.5rem]">
          <Link href={`/articles/${article.id}`}>
            {article.title}
          </Link>
        </h2>

        {/* 内容预览 - 固定高度 */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-3 min-h-[4.5rem]">
          {extractTextPreview(article.content, 150)}
        </p>

        {/* 标签 */}
        {article.tags && article.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {article.tags.slice(0, 3).map((tag) => (
              <Link
                key={tag}
                href={buildTagFilterUrl(tag, { search: currentSearch })}
                className="px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded-full hover:bg-blue-100 transition-colors"
                title={`筛选标签: ${tag}`}
              >
                {tag}
              </Link>
            ))}
            {article.tags.length > 3 && (
              <span className="px-2 py-1 bg-gray-50 text-gray-500 text-xs rounded-full">
                +{article.tags.length - 3}
              </span>
            )}
          </div>
        )}

        {/* 中间区域 - 自动填充剩余空间 */}
        <div className="flex-1">
          {/* 作者和时间 */}
          <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
            <span className="flex items-center">
              {/* 作者图标 */}
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
              {article.author}
            </span>
            <time dateTime={article.createdAt} title={`发布时间: ${article.createdAt}`}>
              {formatDate(article.createdAt)}
            </time>
          </div>
        </div>

        {/* 操作按钮 - 固定在底部 */}
        <div className="flex gap-2 mt-auto">
          {/* 阅读全文按钮 */}
          <Link
            href={`/articles/${article.id}`}
            className="flex-1 bg-blue-600 text-white text-center py-2 px-4 rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
          >
            阅读全文
          </Link>

          {/* 删除按钮（可选） */}
          {showDeleteButton && onDelete && (
            <button
              onClick={() => onDelete(article.id)}
              className="px-3 py-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
              title="删除文章"
              aria-label={`删除文章: ${article.title}`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
