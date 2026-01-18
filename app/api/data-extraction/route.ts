import { getUser } from "@/app/api/lib/user";
import { NextResponse } from "next/server";
import {
  cardStatementsSchema,
  invoicesSchema,
  receiptsSchema,
} from "@/lib/llmSchemas";


export async function POST(req:Request) {

    const session= await getUser();

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
    
    let schema;

    switch(category){
      case 'receipts':
        schema= receiptsSchema;
        break;
      case 'invoices': 
        schema=invoicesSchema;
        break;
      case 'credit card statements':
        schema = cardStatementsSchema;
        break;
      default :
        return NextResponse.json(
          { error: "Invalid category provided" },
          { status: 400 }
        )
    };


    let res = await fetch(`${process.env.STANDALONE_API}/organized-data/json/schema`,{
      method: 'POST',
      headers: {
         "X-API-Key": process.env.X_API_KEY!,
         "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: {
          apiKey: process.env.OPENAI_API_KEY!,
          name:"gpt-3.5-turbo",
        },
        jsonSchema: schema,
        text,
      })
    });
    
   
    if(res.status === 442) {
       res = await fetch(`${process.env.STANDALONE_API}/organized-data/json/schema`,{
         method: "POST",
         headers: {
          "X-API-Key": process.env.X_API_KEY!,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
           model: {
            apiKey: process.env.OPENAI_API_KEY!,
            name:"gpt-3.5-turbo",
           },
           jsonSchema: schema,
           text,
           refine: true,
        })
       });

       if (!res.ok) {
         return NextResponse.json(
           { error: res.statusText },
           { status: res.status }
         );
       }
    } else if(!res.ok){
      return NextResponse.json({ error: res.statusText }, { status: res.status });
    };

  
    const { output } = await res.json();

    return NextResponse.json(output, { status: 201})

}; 