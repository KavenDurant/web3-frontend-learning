
import { NextResponse } from "next/server";
import { mockArticles } from "@/app/api/articles/route";

// GET /api/articles/[id] - 获取单篇文章
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const article = mockArticles.find(a => a.id === id);
  if (!article) {
    return NextResponse.json({ error: "文章未找到" }, { status: 404 });
  }
  return NextResponse.json(article);
}

// PUT /api/articles/[id] - 更新文章
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();
  const index = mockArticles.findIndex(a => a.id === id);

  if (index === -1) {
    return NextResponse.json({ error: "文章未找到" }, { status: 404 });
  }

  mockArticles[index] = {
    ...mockArticles[index],
    ...body,
    updatedAt: new Date().toISOString()
  };

  return NextResponse.json(mockArticles[index]);
}

// DELETE /api/articles/[id] - 删除文章
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const index = mockArticles.findIndex(a => a.id === id);
  if (index === -1) {
    return NextResponse.json({ error: "文章未找到" }, { status: 404 });
  }

  mockArticles.splice(index, 1);
  return NextResponse.json({ message: "删除成功" });
}
