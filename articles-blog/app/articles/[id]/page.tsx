
export default async function Article({ params }: { params: { id: string } }) {
    const { id } = params;
    return (
        <div>
            <h1>Article {id}</h1>
        </div>
    )
}