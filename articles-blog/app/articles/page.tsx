/**
 * 文章列表页面
 *
 * Next.js App Router 特性说明：
 * 1. 这是一个 Server Component，在服务端渲染，提供更好的 SEO 和首屏性能
 * 2. 使用 ISR (Incremental Static Regeneration) 实现静态生成 + 定时更新
 * 3. searchParams 在 Next.js 15 中需要被 await（异步访问）
 * 4. 数据获取逻辑已分离到专门的 API 服务层
 */

import Link from "next/link";
import { getArticlesList } from "@/lib/api/articles";
import { parseSearchParams } from "@/lib/utils/url";
import { Article, ArticleListSearchParams } from "@/lib/types";
import ArticleCard from "@/components/ArticleCard";
import Pagination from "@/components/Pagination";
import EmptyState from "@/components/EmptyState";

// ISR 配置：每 60 秒重新验证页面内容
export const revalidate = 60;

// 文章列表页面的 Props 类型
interface ArticlesPageProps {
  searchParams: Promise<ArticleListSearchParams>;
}

/**
 * 文章列表页面组件
 *
 * 功能：
 * - 展示分页的文章列表
 * - 支持标签筛选
 * - 支持搜索功能
 * - 响应式设计
 */
export default async function ArticlesPage({ searchParams }: ArticlesPageProps) {
  // Next.js 15 兼容性：await searchParams
  const params = await searchParams;

  // 解析查询参数，提供类型安全和默认值
  const parsedParams = parseSearchParams(params as Record<string, string | undefined>);
  const currentPage = parsedParams.page || 1;
  const currentTag = parsedParams.tag;
  const currentSearch = parsedParams.search;
  const limit = 6;

  // 通过 API 服务层获取数据，包含错误处理和数据验证
  const data = await getArticlesList({
    page: currentPage,
    limit,
    tag: currentTag,
    search: currentSearch,
  });

  return (
    <div className="max-w-6xl mx-auto">
      {/* 页面标题和筛选信息 */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {currentTag ? `标签: ${currentTag}` : '文章列表'}
        </h1>
        <p className="text-gray-600">
          {currentTag
            ? `筛选标签为 "${currentTag}" 的文章`
            : '发现优质技术文章，分享编程心得'
          }
        </p>
        {currentTag && (
          <div className="mt-2">
            <Link
              href="/articles"
              className="text-blue-600 hover:text-blue-800 text-sm"
            >
              ← 返回所有文章
            </Link>
          </div>
        )}
      </div>

      {/* 文章网格布局 - 确保所有卡片高度一致 */}
      {data.articles && data.articles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 auto-rows-fr">
          {data.articles.map((article: Article) => (
            <ArticleCard
              key={article.id}
              article={article}
              currentSearch={currentSearch}
              showDeleteButton={false}
            />
          ))}
        </div>
      ) : null}

      {/* 分页组件 */}
      {data.articles && data.articles.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={data.totalPages}
          total={data.total}
          pageSize={limit}
          currentParams={{ tag: currentTag, search: currentSearch }}
        />
      )}

      {/* 空状态 */}
      {(!data.articles || data.articles.length === 0) && (
        <EmptyState
          type={currentTag ? 'no-tag-results' : 'no-articles'}
          tag={currentTag}
          searchTerm={currentSearch}
        />
      )}
    </div>
  );
}
