/**
 * 文章创建页面
 *
 * Next.js App Router 特性说明：
 * 1. 这是一个 Client Component，因为需要处理表单交互
 * 2. 使用 React Hook Form 管理表单状态和验证
 * 3. 使用 useRouter 进行页面导航
 * 4. 集成了 API 服务层进行数据提交
 */

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArticlesAPI } from '@/lib/api/articles';

/**
 * 表单数据类型
 */
interface FormData {
  title: string;
  content: string;
  author: string;
  tags: string;
}

/**
 * 文章创建页面组件
 *
 * 功能：
 * - 提供文章创建表单
 * - 表单验证和错误处理
 * - 提交后跳转到文章列表
 * - 支持标签输入和预览
 */
export default function CreateArticlePage() {
  const router = useRouter();

  // 表单状态管理
  const [formData, setFormData] = useState<FormData>({
    title: '',
    content: '',
    author: '',
    tags: ''
  });

  // 提交状态管理
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * 处理表单字段变化
   */
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // 清除错误信息
    if (error) {
      setError(null);
    }
  };

  /**
   * 处理表单提交
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 基础验证
    if (!formData.title.trim()) {
      setError('请输入文章标题');
      return;
    }

    if (!formData.content.trim()) {
      setError('请输入文章内容');
      return;
    }

    if (!formData.author.trim()) {
      setError('请输入作者姓名');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      // 处理标签数据
      const tags = formData.tags
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0);

      // 调用 API 创建文章
      await ArticlesAPI.createArticle({
        title: formData.title.trim(),
        content: formData.content.trim(),
        author: formData.author.trim(),
        tags
      });

      // 创建成功，跳转到文章列表
      router.push('/articles');

    } catch (err) {
      console.error('创建文章失败:', err);
      setError(err instanceof Error ? err.message : '创建文章失败，请重试');
    } finally {
      setIsSubmitting(false);
    }
  };

  /**
   * 解析标签预览
   */
  const getTagsPreview = (): string[] => {
    return formData.tags
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0);
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* 页面标题 */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
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

        <h1 className="text-3xl font-bold text-gray-900 mb-2">创建新文章</h1>
        <p className="text-gray-600">分享您的技术见解和编程经验</p>
      </div>

      {/* 创建表单 */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 错误提示 */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-md p-4">
            <div className="flex">
              <svg className="w-5 h-5 text-red-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <span className="text-red-800">{error}</span>
            </div>
          </div>
        )}

        {/* 文章标题 */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
            文章标题 *
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="请输入文章标题"
            required
          />
        </div>

        {/* 作者姓名 */}
        <div>
          <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-2">
            作者姓名 *
          </label>
          <input
            type="text"
            id="author"
            name="author"
            value={formData.author}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="请输入作者姓名"
            required
          />
        </div>

        {/* 文章标签 */}
        <div>
          <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-2">
            文章标签
          </label>
          <input
            type="text"
            id="tags"
            name="tags"
            value={formData.tags}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="请输入标签，用逗号分隔，如：React, TypeScript, Next.js"
          />

          {/* 标签预览 */}
          {formData.tags && (
            <div className="mt-2">
              <div className="text-sm text-gray-600 mb-1">标签预览：</div>
              <div className="flex flex-wrap gap-2">
                {getTagsPreview().map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 文章内容 */}
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
            文章内容 *
          </label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleInputChange}
            rows={12}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="请输入文章内容，支持 Markdown 格式..."
            required
          />
          <div className="mt-1 text-sm text-gray-500">
            支持 Markdown 格式，如：**粗体**、*斜体*、`代码`、# 标题 等
          </div>
        </div>

        {/* 提交按钮 */}
        <div className="flex gap-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                发布中...
              </span>
            ) : (
              '发布文章'
            )}
          </button>

          <Link
            href="/articles"
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            取消
          </Link>
        </div>
      </form>
    </div>
  );
}