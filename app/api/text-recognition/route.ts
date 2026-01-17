import { getUser } from "@/app/api/lib/user";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { Status } from "@/lib/generated/prisma/client"



export async function PUT(req:Request){
 
    const session = await getUser();

    if(!session){
        return NextResponse.json({ error: "Unauthorized"},{ status: 401})
    };

    const userUUId= session?.id;
    const { uuid, text}= await req.json();

     if (!uuid || !text) {
       return NextResponse.json(
         { error: "No UUID nor text provided" },
         { status: 400 }
       );
     }

     const updateExtraction=await prisma.extraction.updateMany({
        where: {
            id: uuid,
            userId: userUUId,
            status: Status.TO_RECOGNIZE,
        },
        data:{
            text,
            status: Status.TO_EXTRACT
        }
     });

     if(!updateExtraction){
        return NextResponse.json(
          { error: "Extraction not found or not updated" },
          { status: 404 }
        );
     };

    return NextResponse.json({ message: "Extraction updated" }, { status: 200 });

};