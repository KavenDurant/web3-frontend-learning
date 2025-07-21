/**
 * 分页组件
 * 
 * Next.js 特性说明：
 * 1. 这是一个 Server Component，在服务端渲染
 * 2. 使用 Link 组件实现客户端路由，提供更好的用户体验
 * 3. 组件化设计提高代码复用性
 * 4. 支持 SEO 友好的 URL 结构
 */

import Link from "next/link";
import { buildArticlesPageUrl } from "@/lib/utils/url";
import { generatePageNumbers } from "@/lib/utils/url";
import { PaginationUrlParams } from "@/lib/api/types";

interface PaginationProps {
  /** 当前页码 */
  currentPage: number;
  /** 总页数 */
  totalPages: number;
  /** 总数量 */
  total: number;
  /** 每页数量 */
  pageSize: number;
  /** 当前查询参数 */
  currentParams?: PaginationUrlParams;
  /** 最大显示页码数量 */
  maxVisible?: number;
}

/**
 * 分页组件
 * 
 * 功能：
 * - 显示当前页面信息
 * - 提供上一页/下一页导航
 * - 显示页码列表
 * - 支持查询参数保持（标签筛选、搜索等）
 */
export default function Pagination({
  currentPage,
  totalPages,
  total,
  pageSize,
  currentParams = {},
  maxVisible = 5
}: PaginationProps) {
  
  // 如果只有一页或没有数据，不显示分页
  if (totalPages <= 1 || total === 0) {
    return null;
  }

  // 计算显示范围
  const startIndex = (currentPage - 1) * pageSize + 1;
  const endIndex = Math.min(currentPage * pageSize, total);
  
  // 生成页码数组
  const pageNumbers = generatePageNumbers(currentPage, totalPages, maxVisible);
  
  // 是否有上一页/下一页
  const hasPrevious = currentPage > 1;
  const hasNext = currentPage < totalPages;

  return (
    <div className="flex items-center justify-between">
      {/* 页面信息 */}
      <div className="text-sm text-gray-700">
        <span>
          显示第 <span className="font-medium">{startIndex}</span> - <span className="font-medium">{endIndex}</span> 条，
          共 <span className="font-medium">{total}</span> 条文章
        </span>
      </div>
      
      {/* 分页导航 */}
      <div className="flex gap-2">
        {/* 上一页按钮 */}
        {hasPrevious && (
          <Link
            href={buildArticlesPageUrl(currentPage - 1, currentParams)}
            className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
            aria-label="上一页"
          >
            上一页
          </Link>
        )}
        
        {/* 页码列表 */}
        <div className="flex gap-1">
          {/* 第一页（如果不在显示范围内） */}
          {pageNumbers[0] > 1 && (
            <>
              <Link
                href={buildArticlesPageUrl(1, currentParams)}
                className="px-3 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                aria-label="第1页"
              >
                1
              </Link>
              {pageNumbers[0] > 2 && (
                <span className="px-3 py-2 text-gray-500">...</span>
              )}
            </>
          )}
          
          {/* 页码数字 */}
          {pageNumbers.map((pageNum) => (
            <Link
              key={pageNum}
              href={buildArticlesPageUrl(pageNum, currentParams)}
              className={`px-3 py-2 rounded-md transition-colors ${
                pageNum === currentPage
                  ? 'bg-blue-600 text-white'
                  : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
              aria-label={`第${pageNum}页`}
              aria-current={pageNum === currentPage ? 'page' : undefined}
            >
              {pageNum}
            </Link>
          ))}
          
          {/* 最后一页（如果不在显示范围内） */}
          {pageNumbers[pageNumbers.length - 1] < totalPages && (
            <>
              {pageNumbers[pageNumbers.length - 1] < totalPages - 1 && (
                <span className="px-3 py-2 text-gray-500">...</span>
              )}
              <Link
                href={buildArticlesPageUrl(totalPages, currentParams)}
                className="px-3 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                aria-label={`第${totalPages}页`}
              >
                {totalPages}
              </Link>
            </>
          )}
        </div>

        {/* 下一页按钮 */}
        {hasNext && (
          <Link
            href={buildArticlesPageUrl(currentPage + 1, currentParams)}
            className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
            aria-label="下一页"
          >
            下一页
          </Link>
        )}
      </div>
    </div>
  );
}
