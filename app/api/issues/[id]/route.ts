import {NextRequest, NextResponse} from "next/server";
import {issueSchema} from "@/app/validationSchemas";
import {getServerSession} from "next-auth";
import authOptions from "@/app/api/auth/authOptions";

export async function PATCH(
    request: NextRequest,
    {params}: {params: {id: string}}) {

    //  Get server session, if user isn't authenticated then return 401 status code
    const session = await getServerSession(authOptions)
    if(!session) {
        return NextResponse.json({}, {status: 401})
    }

    //   Get the body of the request
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

    //  Get server session, if user isn't authenticated then return 401 status code
    const session = await getServerSession(authOptions)
    if(!session) {
        return NextResponse.json({}, {status: 401})
    }

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