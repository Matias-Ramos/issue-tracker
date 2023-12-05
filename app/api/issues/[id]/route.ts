
import schema from "@/app/validationSchemas";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import delay from "delay";

export async function PATCH( request: NextRequest, { params }: { params: { id: string } }) {
    const body = await request.json();
    const validation = schema.safeParse(body);
    
    /***************** */
    // Input validation
    if (!validation.success)
        return NextResponse.json(
            validation.error.errors,
            { status: 400 });

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
            title: body.title,
            description: body.description
        }
    })
    return NextResponse.json(updatedIssue)
}


export async function DELETE( request: NextRequest, { params }: { params: { id: string } }) {
    
    await delay(2000);
    
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