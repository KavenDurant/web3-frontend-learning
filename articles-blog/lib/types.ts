/**
 * 文章数据类型
 *
 * 这个接口定义了文章的完整数据结构，
 * 确保在整个应用中保持一致的类型安全
 */
export interface Article {
  /** 文章唯一标识符 */
  id: string;
  /** 文章标题 */
  title: string;
  /** 文章内容（支持 Markdown 格式） */
  content: string;
  /** 文章作者 */
  author: string;
  /** 文章标签列表 */
  tags: string[];
  /** 创建时间（ISO 8601 格式） */
  createdAt: string;
  /** 最后更新时间（ISO 8601 格式） */
  updatedAt: string;
}

/**
 * 评论数据类型
 */
export interface Comment {
  /** 评论唯一标识符 */
  id: string;
  /** 所属文章ID */
  articleId: string;
  /** 评论作者 */
  author: string;
  /** 评论内容 */
  content: string;
  /** 创建时间（ISO 8601 格式） */
  createdAt: string;
}

/**
 * 标签统计类型
 */
export interface Tag {
  /** 标签名称 */
  name: string;
  /** 使用该标签的文章数量 */
  count: number;
}

/**
 * 通用分页响应类型
 *
 * @template T 数据项的类型
 */
export interface PaginatedResponse<T> {
  /** 数据列表 */
  data: T[];
  /** 总数量 */
  total: number;
  /** 当前页码 */
  page: number;
  /** 每页数量 */
  limit: number;
  /** 是否还有更多数据 */
  hasMore: boolean;
}

/**
 * Next.js 页面组件的通用 Props 类型
 */
export interface PageProps<T = Record<string, never>> {
  /** 路由参数 */
  params: Promise<T>;
  /** 查询参数 */
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

/**
 * 文章页面的路由参数类型
 */
export interface ArticlePageParams {
  /** 文章ID */
  id: string;
}

/**
 * 文章列表页面的查询参数类型
 */
export interface ArticleListSearchParams {
  /** 页码 */
  page?: string;
  /** 标签筛选 */
  tag?: string;
  /** 搜索关键词 */
  search?: string;
}
