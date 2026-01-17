import { getUser } from "@/app/api/lib/user";
import { NextResponse } from "next/server";



export async function POST(req:Request) {

    const session=await getUser();

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    };

    const { text, category }=await req.json();

    if (!category || !text) {
    return NextResponse.json(
      { error: "No category nor text provided" },
      { status: 400 }
    )
   };

   



};