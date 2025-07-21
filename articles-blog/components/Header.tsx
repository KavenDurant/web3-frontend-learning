// components/Header.tsx
import React from "react";
import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white border-b">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-gray-800">
          Michael&apos;s Blog
        </Link>
        <nav className="space-x-6">
          <Link href="/articles" className="text-gray-600 hover:text-gray-900">
            文章列表
          </Link>
          <Link href="/create" className="text-gray-600 hover:text-gray-900">
            撰写文章
          </Link>
        </nav>
      </div>
    </header>
  );
}