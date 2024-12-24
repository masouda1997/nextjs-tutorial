import { FakeCommentData, IFakeCommentData } from "../../data";


export async function GET(_req: Request, { params }: { params: { id: number | string } }) {

    const id = typeof params.id === "string" ? parseInt(params.id, 10) : params.id
    const comment = FakeCommentData.find((c: IFakeCommentData) => c.id === id)
    if (!comment) {
        return new Response(JSON.stringify({
            error: "Comment not found",
            paramsID: params.id

        }), { status: 404 });
    }
    return new Response(JSON.stringify(comment), {
        status: 200,
        headers: { "Content-Type": "application/json" },
    });
}

export async function PATCH(req: Request, { params }: { params: { id: number | string } }) {

    const id = typeof params.id === "string" ? parseInt(params.id, 10) : params.id
    const body = await req.json()
    const { content } = body
    const index = FakeCommentData.findIndex(comment => comment.id === id)
    if (index === -1) {
        return new Response(JSON.stringify({ error: "Comment not found", index: index }), { status: 404 });
    }
    FakeCommentData[index].content = content
    return new Response(JSON.stringify(FakeCommentData[index]), {
        status: 200,
        headers: { "Content-Type": "application/json" },
    });

}


export async function DELETE(req: Request, { params }: { params: { id: number | string } }) {
    const id = typeof params.id === "string" ? parseInt(params.id, 10) : params.id
    const index = FakeCommentData.findIndex(comment => comment.id === id)
    if (index === -1) {
        return new Response(JSON.stringify({ error: "Comment not found" }), { status: 404 });
    }
    const deletedItem = FakeCommentData[index]
    FakeCommentData.splice(index,1)
    return new Response(JSON.stringify(deletedItem), { 
        status: 200 , 
        headers: { "Content-Type": "application/json" }
    });
}

