import { NextResponse } from "next/server";
import { getUser } from "../lib/user";
import { prisma } from "@/lib/db";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { s3 } from "../lib/s3";



export async function GET(req: Request) {

    const session=await getUser();

    if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    };

    const { searchParams } = new URL(req.url);
    const extractionId = searchParams.get("uuid");
    const userUUID = session?.id;

    if (!extractionId) {
    return NextResponse.json(
      {
        error: "No extraction UUID provided",
      },
      { status: 400 }
    );
  };

  const extraction = await prisma.extraction.findFirst({
    where: {
        id: extractionId,
        userId: userUUID
    }
  });

  if (!extraction) {
    return NextResponse.json(
      {
        error: "Extraction not found",
      },
      {
        status: 404,
      }
    );
  };

  try {
     const command= new GetObjectCommand({
        Bucket: process.env.S3_BUCKET!,
        Key: extraction.objectPath
     });

     const url = await getSignedUrl(s3, command, { expiresIn: 60 })

     return NextResponse.json({
      uuid: extraction.id,
      filename: extraction.filename,
      url,
      }, 
      { status: 200 }
    );
    
  } catch {
    return NextResponse.json({ error: "Failed to generate signed URL" }, { status: 500 });
  }

}