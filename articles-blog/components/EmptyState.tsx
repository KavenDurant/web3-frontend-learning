/**
 * 空状态组件
 * 
 * Next.js 特性说明：
 * 1. 这是一个 Server Component，在服务端渲染
 * 2. 使用 Link 组件实现客户端路由
 * 3. 提供用户友好的空状态提示
 */

import Link from "next/link";

interface EmptyStateProps {
  /** 空状态类型 */
  type?: 'no-articles' | 'no-search-results' | 'no-tag-results';
  /** 当前搜索关键词 */
  searchTerm?: string;
  /** 当前标签 */
  tag?: string;
}

/**
 * 空状态组件
 * 
 * 功能：
 * - 根据不同场景显示相应的空状态提示
 * - 提供相关的操作建议
 * - 保持良好的用户体验
 */
export default function EmptyState({ 
  type = 'no-articles', 
  searchTerm, 
  tag 
}: EmptyStateProps) {
  
  // 根据类型返回不同的内容
  const getEmptyStateContent = () => {
    switch (type) {
      case 'no-search-results':
        return {
          icon: (
            <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          ),
          title: '未找到相关文章',
          description: searchTerm 
            ? `没有找到包含 "${searchTerm}" 的文章` 
            : '没有找到符合条件的文章',
          actions: (
            <div className="space-y-2">
              <Link
                href="/articles"
                className="inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                查看所有文章
              </Link>
              <div className="text-sm text-gray-500">
                或者尝试其他搜索关键词
              </div>
            </div>
          )
        };
        
      case 'no-tag-results':
        return {
          icon: (
            <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
          ),
          title: '该标签下暂无文章',
          description: tag 
            ? `标签 "${tag}" 下还没有文章` 
            : '该标签下还没有文章',
          actions: (
            <div className="space-y-2">
              <Link
                href="/articles"
                className="inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                查看所有文章
              </Link>
              <div className="text-sm text-gray-500">
                或者尝试其他标签
              </div>
            </div>
          )
        };
        
      default: // 'no-articles'
        return {
          icon: (
            <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          ),
          title: '暂无文章',
          description: '还没有发布任何文章',
          actions: (
            <Link
              href="/create"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              写第一篇文章
            </Link>
          )
        };
    }
  };

  const content = getEmptyStateContent();

  return (
    <div className="text-center py-12">
      {content.icon}
      <h3 className="text-lg font-medium text-gray-900 mb-2">
        {content.title}
      </h3>
      <p className="text-gray-500 mb-4">
        {content.description}
      </p>
      {content.actions}
    </div>
  );
}
