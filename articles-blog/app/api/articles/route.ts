import { NextResponse } from "next/server";

export interface Article {
    id: number;
    title: string;
    content: string;
}

export const articles: Article[] = [
    { id: 1, title: "Article 1", content: "Content 1" },
    { id: 2, title: "Article 2", content: "Content 2" },
    { id: 3, title: "Article 3", content: "Content 3" },
]

export async function GET(request: Request) {
    return NextResponse.json(articles);
}

export async function POST(request: Request) {
    const { title, content } = await request.json();
    const newArticle = { id: articles.length + 1, title, content };
    articles.push(newArticle);
    return NextResponse.json(newArticle, { status: 201 });
}