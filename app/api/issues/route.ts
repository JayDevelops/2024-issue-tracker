import {NextRequest, NextResponse} from "next/server"
import prisma from "@/prisma/client"
import {issueSchema} from "@/app/validationSchemas";

export async function POST(request: NextRequest) {
    const body = await request.json()
    const validation = issueSchema.safeParse(body)

    // When validation is not successful, throw 400 error stating a client posted invalid data
    if(!validation.success) {
        return NextResponse.json(validation.error.format(), {status: 400})
    }

    // If data was valid, create a new issue onto the prisma database
    const newIssue = await prisma.issue.create({
        data: {
            title: body.title,
            description: body.description
        }
    })

    //  Send the response with the new issue object and success message to the client
    return NextResponse.json(newIssue, {status: 201})
}