/**
 * API 相关的类型定义
 * 
 * 这个文件定义了：
 * 1. API 请求参数的类型
 * 2. API 响应数据的类型
 * 3. 分页相关的类型
 * 4. 错误处理相关的类型
 */

import { Article } from '../types';

// ==================== 文章列表相关类型 ====================

/**
 * 文章列表请求参数
 */
export interface ArticleListParams {
  /** 页码，从 1 开始 */
  page?: number;
  /** 每页数量 */
  limit?: number;
  /** 标签筛选 */
  tag?: string;
  /** 搜索关键词 */
  search?: string;
}

/**
 * 文章列表响应数据
 */
export interface ArticleListResponse {
  /** 文章列表 */
  articles: Article[];
  /** 总数量 */
  total: number;
  /** 当前页码 */
  page: number;
  /** 每页数量 */
  limit: number;
  /** 是否还有更多数据 */
  hasMore: boolean;
  /** 总页数 */
  totalPages: number;
}

// ==================== 分页相关类型 ====================

/**
 * 分页信息
 */
export interface PaginationInfo {
  /** 当前页码 */
  currentPage: number;
  /** 总页数 */
  totalPages: number;
  /** 每页数量 */
  pageSize: number;
  /** 总数量 */
  total: number;
  /** 是否有上一页 */
  hasPrevious: boolean;
  /** 是否有下一页 */
  hasNext: boolean;
  /** 当前页的起始索引 */
  startIndex: number;
  /** 当前页的结束索引 */
  endIndex: number;
}

/**
 * 分页配置
 */
export interface PaginationConfig {
  /** 默认页码 */
  defaultPage?: number;
  /** 默认每页数量 */
  defaultLimit?: number;
  /** 最大每页数量 */
  maxLimit?: number;
}

// ==================== 文章操作相关类型 ====================

/**
 * 创建文章的请求数据
 */
export interface CreateArticleRequest {
  title: string;
  content: string;
  author: string;
  tags: string[];
}

/**
 * 更新文章的请求数据
 */
export interface UpdateArticleRequest {
  title?: string;
  content?: string;
  author?: string;
  tags?: string[];
}

/**
 * 文章操作响应
 */
export interface ArticleOperationResponse {
  /** 操作是否成功 */
  success: boolean;
  /** 响应消息 */
  message: string;
  /** 文章数据（创建或更新后返回） */
  article?: Article;
}

// ==================== 错误处理相关类型 ====================

/**
 * API 错误响应
 */
export interface ApiErrorResponse {
  /** 错误消息 */
  error: string;
  /** 错误代码 */
  code?: string;
  /** 详细错误信息 */
  details?: any;
  /** 时间戳 */
  timestamp?: string;
}

/**
 * 加载状态类型
 */
export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

/**
 * 数据获取状态
 */
export interface DataState<T> {
  /** 数据 */
  data: T | null;
  /** 加载状态 */
  loading: LoadingState;
  /** 错误信息 */
  error: string | null;
  /** 最后更新时间 */
  lastUpdated: Date | null;
}

// ==================== URL 构建相关类型 ====================

/**
 * URL 查询参数
 */
export interface QueryParams {
  [key: string]: string | number | boolean | undefined | null;
}

/**
 * 分页 URL 参数
 */
export interface PaginationUrlParams {
  page?: number;
  tag?: string;
  search?: string;
}
