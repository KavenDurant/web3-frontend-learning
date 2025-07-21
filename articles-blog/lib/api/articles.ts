/**
 * 文章相关的 API 服务层
 * 
 * 这个文件提供了：
 * 1. 文章列表获取的统一接口
 * 2. 单篇文章获取的接口
 * 3. 文章创建、更新、删除的接口
 * 4. 统一的错误处理和数据转换
 * 5. 缓存策略的实现
 */

import { apiGet, apiPost, apiPut, apiDelete } from './base';
import { 
  ArticleListParams, 
  ArticleListResponse, 
  CreateArticleRequest,
  UpdateArticleRequest,
  ArticleOperationResponse,
  PaginationInfo
} from './types';
import { Article } from '../types';

/**
 * 文章 API 服务类
 * 
 * 这个类封装了所有文章相关的 API 调用，提供：
 * - 类型安全的接口
 * - 统一的错误处理
 * - 数据转换和验证
 * - 缓存策略
 */
export class ArticlesAPI {
  
  /**
   * 获取文章列表
   * 
   * @param params 查询参数
   * @returns 文章列表响应数据
   */
  static async getArticles(params: ArticleListParams = {}): Promise<ArticleListResponse> {
    // 设置默认参数
    const queryParams = {
      page: params.page || 1,
      limit: params.limit || 6,
      ...(params.tag && { tag: params.tag }),
      ...(params.search && { search: params.search }),
    };

    // 构建查询字符串
    const searchParams = new URLSearchParams();
    Object.entries(queryParams).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        searchParams.set(key, value.toString());
      }
    });

    // 发起 API 请求
    const response = await apiGet<ArticleListResponse>(
      `/api/articles?${searchParams.toString()}`
    );

    // 数据验证和转换
    return {
      articles: response.articles || [],
      total: response.total || 0,
      page: response.page || queryParams.page,
      limit: response.limit || queryParams.limit,
      hasMore: response.hasMore || false,
      totalPages: Math.ceil((response.total || 0) / queryParams.limit),
    };
  }

  /**
   * 获取单篇文章
   * 
   * @param id 文章 ID
   * @returns 文章详情
   */
  static async getArticle(id: string): Promise<Article> {
    if (!id) {
      throw new Error('文章 ID 不能为空');
    }

    const article = await apiGet<Article>(`/api/articles/${id}`);
    
    // 数据验证
    if (!article || !article.id) {
      throw new Error('文章数据格式错误');
    }

    return article;
  }

  /**
   * 创建新文章
   * 
   * @param data 文章数据
   * @returns 创建结果
   */
  static async createArticle(data: CreateArticleRequest): Promise<Article> {
    // 数据验证
    if (!data.title?.trim()) {
      throw new Error('文章标题不能为空');
    }
    if (!data.content?.trim()) {
      throw new Error('文章内容不能为空');
    }
    if (!data.author?.trim()) {
      throw new Error('作者不能为空');
    }

    const article = await apiPost<Article>('/api/articles', data);
    return article;
  }

  /**
   * 更新文章
   * 
   * @param id 文章 ID
   * @param data 更新数据
   * @returns 更新后的文章
   */
  static async updateArticle(id: string, data: UpdateArticleRequest): Promise<Article> {
    if (!id) {
      throw new Error('文章 ID 不能为空');
    }

    const article = await apiPut<Article>(`/api/articles/${id}`, data);
    return article;
  }

  /**
   * 删除文章
   * 
   * @param id 文章 ID
   * @returns 删除结果
   */
  static async deleteArticle(id: string): Promise<{ message: string }> {
    if (!id) {
      throw new Error('文章 ID 不能为空');
    }

    const result = await apiDelete<{ message: string }>(`/api/articles/${id}`);
    return result;
  }

  /**
   * 获取分页信息
   * 
   * @param total 总数量
   * @param page 当前页码
   * @param limit 每页数量
   * @returns 分页信息
   */
  static getPaginationInfo(total: number, page: number, limit: number): PaginationInfo {
    const totalPages = Math.ceil(total / limit);
    const startIndex = (page - 1) * limit + 1;
    const endIndex = Math.min(page * limit, total);

    return {
      currentPage: page,
      totalPages,
      pageSize: limit,
      total,
      hasPrevious: page > 1,
      hasNext: page < totalPages,
      startIndex,
      endIndex,
    };
  }
}

/**
 * 文章列表的便捷获取函数
 * 专门为 Server Components 设计
 */
export async function getArticlesList(params: ArticleListParams = {}): Promise<ArticleListResponse> {
  return ArticlesAPI.getArticles(params);
}

/**
 * 单篇文章的便捷获取函数
 * 专门为 Server Components 设计
 */
export async function getArticleById(id: string): Promise<Article> {
  return ArticlesAPI.getArticle(id);
}
