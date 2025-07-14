import Link from "next/link";
import { Article } from "../api/articles/route";


export default async function Articles() {
    const articles = await fetch("http://localhost:3000/api/articles");
    const data = await articles.json();
    console.log(data);
    return (
        <div>
            <h1>这是一个文章列表</h1>
            <div className="flex justify-center items-center flex-col gap-4">
                {data.map((item: Article, index: number) => (
                    <div key={index} className="flex justify-center">
                        <h2>{item.title}</h2>&nbsp;&nbsp;
                        <p>{item.content}</p>&nbsp;&nbsp;
                        <Link href={`/articles/${item.id}`} className="text-blue-500">Read More</Link>
                    </div>
                ))}
            </div>
        </div>
    )
}