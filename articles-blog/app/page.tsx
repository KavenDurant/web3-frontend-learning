import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MyBlog – 技术分享社区",
  description:
    "基于 Next.js + Supabase 的博客示例，涵盖文章列表、详情、CRUD、Markdown 渲染等功能。",
  openGraph: {
    title: "MyBlog – 技术分享社区",
    description: "基于 Next.js + Supabase 的全功能博客示例。",
    url: "https://your-domain.vercel.app/",
  },
};
export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-20 text-center">
      <h1 className="text-4xl font-bold mb-4">欢迎来到 Michael&apos;s Blog</h1>
      <p className="text-lg text-gray-600 mb-8">
        在这里，你可以浏览最新技术文章、撰写自己的心得，并与社区成员交流。
      </p>
      <Link
        href="/articles"
        className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        查看文章列表 →
      </Link>
    </div>
  );
}
