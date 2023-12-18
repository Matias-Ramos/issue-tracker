
import schema from "@/app/validationSchemas";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH( request: NextRequest, { params }: { params: { id: string } }) {

    const session = await getServerSession();
    if(!session)
        return NextResponse.json({}, { status: 401 })

    const body = await request.json();
    const validation = schema.safeParse(body);
    const { assignedToUserId, title, description } = body;
    
    /***************** */
    // Input validation
    if (!validation.success)
        return NextResponse.json(
            validation.error.errors,
            { status: 400 });
    // DB validation
    if( assignedToUserId ){
        const user = prisma.user.findUnique({where: {id: assignedToUserId}})
        if(!user)
        return NextResponse.json(
            {error: "Invalid user"},
            {status: 400}
        )
    }

    /***************** */
    // Existing issue validation
    const issue = await prisma.issue.findUnique({
        where: { id: parseInt(params.id) }
    })
    if (!issue)
        return NextResponse.json(
            { error: 'Invalid issue.' },
            { status: 404 });

    /***************** */
    // Update
    const updatedIssue = await prisma.issue.update({
        where: { id: issue.id },
        data: {
            title, // title: title
            description,
            assignedToUserId
        }
    })
    return NextResponse.json(updatedIssue)
}


export async function DELETE( request: NextRequest, { params }: { params: { id: string } }) {
    const session = await getServerSession();
    if(!session)
        return NextResponse.json({}, { status: 401 })
    
    const issue = await prisma.issue.delete({
        where: { id: parseInt(params.id) }
    })
    if(!issue)
        return NextResponse.json({error: "Invalid issue"}, {status: 404})

    prisma.issue.delete({
        where: { id: parseInt(params.id) }
    })

    return NextResponse.json({})
}