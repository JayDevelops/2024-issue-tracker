import {NextRequest, NextResponse} from "next/server"
import prisma from "@/prisma/client"
import {issueSchema} from "@/app/validationSchemas"
import {getServerSession} from "next-auth";
import authOptions from "@/app/api/auth/authOptions"

export async function POST(request: NextRequest) {
    //  Get server session, if user isn't authenticated then return 401 status code
    const session = await getServerSession(authOptions)
    if(!session) {
        return NextResponse.json({}, {status: 401})
    }

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