import { NextResponse } from "next/server";
import { PutObjectCommand } from "@aws-sdk/client-s3"
import { randomUUID } from "crypto";
import { s3 } from '@/app/api/lib/s3'
import { prisma } from "@/lib/db";
import { getUser } from "@/app/api/lib/user";



export async function POST(req: Request){

    const session= await getUser();
 
    if(!session){
        return NextResponse.json({error: 'Unauthorized'}, {status: 401})
    };

    const contentType= req.headers.get('content-type');
    if(!contentType?.includes("multipart/form-data")) {
        return NextResponse.json({error: "Content type must be multipart/form-data"}, {status: 400})
    };

    try {
      const formData= await req.formData();
      const file= formData.get('file') as File | null;
      if(!file){
        return NextResponse.json({error: "No file provided"},{status: 400})
      };

      if (file.type !== "application/pdf") {
      return NextResponse.json(
        { error: "Only PDF files allowed" },
        { status: 400 }
      );
    };

      const buffer= Buffer.from(await file.arrayBuffer());

     
      const userUUID = session?.id;
      const fileUUID = randomUUID();
      const key = `${userUUID}/${fileUUID}`;

      await s3.send(
        new PutObjectCommand({
            Bucket: process.env.S3_BUCKET!,
            Key: key,
            Body: buffer,
            ContentType: file.type
        })
      );

      
      const extraction = await prisma.extraction.create({
        data: {
          filename: file.name,
          objectPath: key,
          user: {
            connect:  { id: userUUID }
          },
        }
      });

      return NextResponse.json(
        {
          message: {id: extraction.id , filename: file.name}
        },
        { status: 201 }
      );

    } catch (error) {
        return NextResponse.json(
            {
                 error: `Upload failed ,${error}`,
            },
            {
                status: 500
            }
        )
    }
};