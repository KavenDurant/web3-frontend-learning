/**
 * API 基础配置和工具函数
 * 
 * 这个文件提供了：
 * 1. 统一的 API 基础 URL 配置
 * 2. 通用的 fetch 封装，包含错误处理
 * 3. 响应数据的类型安全处理
 * 4. 统一的错误处理机制
 */

// API 响应的基础类型定义
export interface ApiResponse<T = any> {
  data?: T;
  error?: string;
  message?: string;
}

// API 错误类型
export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public response?: any
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

/**
 * 获取 API 基础 URL
 * 在服务端和客户端都能正确工作
 */
export function getBaseUrl(): string {
  // 在服务端环境中，使用相对路径（指向 Next.js 内置 API 路由）
  if (typeof window === 'undefined') {
    return process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  }
  
  // 在客户端环境中，使用相对路径
  return '';
}

/**
 * 统一的 fetch 封装函数
 * 
 * 功能：
 * - 自动添加基础 URL
 * - 统一的错误处理
 * - JSON 响应解析
 * - 类型安全的响应处理
 */
export async function apiFetch<T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const baseUrl = getBaseUrl();
  const url = `${baseUrl}${endpoint}`;
  
  // 默认配置
  const defaultOptions: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, defaultOptions);
    
    // 检查响应状态
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new ApiError(
        errorData.error || errorData.message || `HTTP ${response.status}`,
        response.status,
        errorData
      );
    }
    
    // 解析 JSON 响应
    const data = await response.json();
    return data;
    
  } catch (error) {
    // 重新抛出 ApiError
    if (error instanceof ApiError) {
      throw error;
    }
    
    // 处理网络错误等其他错误
    throw new ApiError(
      error instanceof Error ? error.message : '网络请求失败',
      0,
      error
    );
  }
}

/**
 * GET 请求的便捷方法
 */
export async function apiGet<T = any>(endpoint: string): Promise<T> {
  return apiFetch<T>(endpoint, { method: 'GET' });
}

/**
 * POST 请求的便捷方法
 */
export async function apiPost<T = any>(
  endpoint: string, 
  data?: any
): Promise<T> {
  return apiFetch<T>(endpoint, {
    method: 'POST',
    body: data ? JSON.stringify(data) : undefined,
  });
}

/**
 * PUT 请求的便捷方法
 */
export async function apiPut<T = any>(
  endpoint: string, 
  data?: any
): Promise<T> {
  return apiFetch<T>(endpoint, {
    method: 'PUT',
    body: data ? JSON.stringify(data) : undefined,
  });
}

/**
 * DELETE 请求的便捷方法
 */
export async function apiDelete<T = any>(endpoint: string): Promise<T> {
  return apiFetch<T>(endpoint, { method: 'DELETE' });
}
