import { NextResponse } from "next/server";
import { articles } from "../route";

export async function GET(request: Request, { params }: { params: { id: string } }) {
    const { id } = params;
    const article = articles.find((article) => article.id === parseInt(id));
    return NextResponse.json(article);
}
