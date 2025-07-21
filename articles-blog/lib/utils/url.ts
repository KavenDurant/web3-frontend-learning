/**
 * URL 构建和查询参数处理工具
 * 
 * 这个文件提供了：
 * 1. 查询参数的构建和解析
 * 2. 分页 URL 的生成
 * 3. 类型安全的 URL 操作
 */

import { QueryParams, PaginationUrlParams } from '../api/types';

/**
 * 构建查询字符串
 * 
 * @param params 查询参数对象
 * @returns 查询字符串（不包含 ?）
 */
export function buildQueryString(params: QueryParams): string {
  const searchParams = new URLSearchParams();
  
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      searchParams.set(key, value.toString());
    }
  });
  
  return searchParams.toString();
}

/**
 * 构建完整的 URL
 * 
 * @param basePath 基础路径
 * @param params 查询参数
 * @returns 完整的 URL
 */
export function buildUrl(basePath: string, params: QueryParams = {}): string {
  const queryString = buildQueryString(params);
  return queryString ? `${basePath}?${queryString}` : basePath;
}

/**
 * 构建文章列表的分页 URL
 * 
 * @param page 页码
 * @param currentParams 当前的查询参数
 * @returns 分页 URL
 */
export function buildArticlesPageUrl(
  page: number, 
  currentParams: PaginationUrlParams = {}
): string {
  const params: QueryParams = {
    page: page > 1 ? page : undefined, // 第一页不显示 page 参数
    ...(currentParams.tag && { tag: currentParams.tag }),
    ...(currentParams.search && { search: currentParams.search }),
  };
  
  return buildUrl('/articles', params);
}

/**
 * 构建标签筛选的 URL
 * 
 * @param tag 标签名称
 * @param currentParams 当前的查询参数
 * @returns 标签筛选 URL
 */
export function buildTagFilterUrl(
  tag: string, 
  currentParams: PaginationUrlParams = {}
): string {
  const params: QueryParams = {
    tag: encodeURIComponent(tag),
    // 切换标签时重置到第一页
    ...(currentParams.search && { search: currentParams.search }),
  };
  
  return buildUrl('/articles', params);
}

/**
 * 解析查询参数为类型安全的对象
 * 
 * @param searchParams URLSearchParams 或查询参数对象
 * @returns 解析后的参数对象
 */
export function parseSearchParams(
  searchParams: URLSearchParams | Record<string, string | string[] | undefined>
): PaginationUrlParams {
  const getParam = (key: string): string | undefined => {
    if (searchParams instanceof URLSearchParams) {
      return searchParams.get(key) || undefined;
    } else {
      const value = searchParams[key];
      return Array.isArray(value) ? value[0] : value;
    }
  };

  const pageParam = getParam('page');
  const page = pageParam ? parseInt(pageParam, 10) : undefined;
  
  return {
    page: page && page > 0 ? page : undefined,
    tag: getParam('tag'),
    search: getParam('search'),
  };
}

/**
 * 验证页码是否有效
 * 
 * @param page 页码
 * @param totalPages 总页数
 * @returns 是否有效
 */
export function isValidPage(page: number, totalPages: number): boolean {
  return page >= 1 && page <= totalPages;
}

/**
 * 获取安全的页码（确保在有效范围内）
 * 
 * @param page 输入页码
 * @param totalPages 总页数
 * @returns 安全的页码
 */
export function getSafePage(page: number, totalPages: number): number {
  if (totalPages === 0) return 1;
  if (page < 1) return 1;
  if (page > totalPages) return totalPages;
  return page;
}

/**
 * 生成分页数字数组
 * 
 * @param currentPage 当前页码
 * @param totalPages 总页数
 * @param maxVisible 最大显示页码数量
 * @returns 页码数组
 */
export function generatePageNumbers(
  currentPage: number, 
  totalPages: number, 
  maxVisible: number = 5
): number[] {
  if (totalPages <= maxVisible) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const half = Math.floor(maxVisible / 2);
  let start = Math.max(1, currentPage - half);
  let end = Math.min(totalPages, start + maxVisible - 1);

  // 调整起始位置，确保显示足够的页码
  if (end - start + 1 < maxVisible) {
    start = Math.max(1, end - maxVisible + 1);
  }

  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}
