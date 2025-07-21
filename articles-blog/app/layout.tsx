import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import React from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/**
 * 全局元数据配置
 *
 * Next.js App Router 特性说明：
 * 1. 使用 Metadata API 提供更好的 SEO 支持
 * 2. 支持动态元数据和 Open Graph 标签
 * 3. 自动生成结构化数据
 */
export const metadata: Metadata = {
  title: {
    template: '%s | Michael\'s Blog',
    default: 'Michael\'s Blog - 技术分享与编程心得'
  },
  description: '基于 Next.js 15 构建的现代化博客系统，分享前端技术、编程经验和开发心得。',
  keywords: ['Next.js', 'React', 'TypeScript', '前端开发', '技术博客', '编程'],
  authors: [{ name: 'Michael', url: 'https://github.com/michael' }],
  creator: 'Michael',
  publisher: 'Michael\'s Blog',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3002'),
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    url: '/',
    title: 'Michael\'s Blog - 技术分享与编程心得',
    description: '基于 Next.js 15 构建的现代化博客系统，分享前端技术、编程经验和开发心得。',
    siteName: 'Michael\'s Blog',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Michael\'s Blog - 技术分享与编程心得',
    description: '基于 Next.js 15 构建的现代化博客系统，分享前端技术、编程经验和开发心得。',
    creator: '@michael',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
  },
};

/**
 * 根布局组件
 *
 * Next.js App Router 特性说明：
 * 1. 这是应用的根布局，所有页面都会使用这个布局
 * 2. 在这里定义全局样式、字体和页面结构
 * 3. 支持嵌套布局，子路由可以有自己的 layout.tsx
 * 4. 布局组件是 Server Component，在服务端渲染
 * 5. 布局在路由切换时不会重新渲染，提供更好的性能
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-gray-800 flex flex-col min-h-screen`}
      >
        {/*
          页面结构说明：
          - 使用 Flexbox 布局确保页脚始终在底部
          - Header 和 Footer 是固定的，main 区域自动填充剩余空间
          - 响应式设计，在不同屏幕尺寸下都能正常显示
        */}

        {/* 页面头部 - 包含导航和品牌信息 */}
        <Header />

        {/* 主内容区域 - 使用 flex: 1 占据剩余空间 */}
        <main className="container mx-auto px-4 py-8" style={{ flex: 1 }}>
          {/*
            children 是当前路由对应的页面组件
            Next.js 会根据文件系统路由自动渲染对应的页面
          */}
          {children}
        </main>

        {/* 页面底部 - 版权信息等 */}
        <Footer />
      </body>
    </html>
  );
}
