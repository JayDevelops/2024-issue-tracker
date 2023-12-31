import {NextRequest, NextResponse} from "next/server";
import {issueSchema} from "@/app/validationSchemas";

export async function PATCH(
    request: NextRequest,
    {params}: {params: {id: string}}) {
    //  First get the body of the request
    const body = await request.json()

    // Next store the zod validation schema and safeParse the request body
    const validation = issueSchema.safeParse(body)

    // If the validation is not successful, then throw a response error
    if(!validation.success) {
        return NextResponse.json(validation.error.format(), {status: 400})
    }

    // Find the issue of the validation
    const issue = await prisma?.issue.findUnique({
        where: {
            id: parseInt(params.id),
        }
    })

    // If the issue is not a valid issue, then throw a response error
    if(!issue) {
        return NextResponse.json({error: 'Invalid Issue.'}, {status: 404})
    }

    //  Update the issue on the prisma database server
    const updatedIssue = await prisma?.issue.update({
        where: {
            id: issue.id,
        },
        data: {
            title: body.title,
            description: body.description,
        }
    })

    // Return the valid response
    return NextResponse.json(updatedIssue)
}

export async function DELETE(
    request: NextRequest,
    {params}: {params: {id: string}}) {

    const issue = await prisma?.issue.findUnique({
        where: {
            id: parseInt(params.id),
        }
    })

    if(!issue) {
        return NextResponse.json({error: 'Invalid Issue.'}, {status: 404})
    }

    await prisma?.issue.delete({
        where: {
            id: issue.id,
        },
    })

    return NextResponse.json({})
}