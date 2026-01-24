import { headers } from "next/headers";
import { Status } from "./generated/prisma/enums";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "./db";


export async function getS3ObjectUrl(uuid:string) {
    const header = await headers();
    const res  = await fetch(`http://localhost:3000/api/signed-url?uuid=${uuid}`,{
        method:'GET',
        headers: {
            Cookie: header.get("cookie") ?? ""
        }
    });

    return res.json();
};

export async function getText(url: string){
    const res = await fetch(`${process.env.STANDALONE_API}/parsers/pdf/url`,{
        method: "POST",
        headers: {
            "X-API-KEY": process.env.X_API_KEY!,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ url })
    });

    if(res.status === 422) {
        return "";
    };

    const { content } = await res.json();
    return content;
};

export async function getExtractionData(uuid:string,status: Status){
     const session = await getServerSession(authOptions);
     if(!session){
        throw new Error("Cannot authenticate user");
     };

     const userUUID = session.user.id;
     const extractionData = await prisma.extraction.findFirst({
        where: {
            id: uuid,
            userId: userUUID,
            status
        },
        select: {
            filename: true,
            text: true,
            category: true,
            json: true
        }
     });

     if (!extractionData) {
        throw new Error("Failed to fetch data");
    };

    return {
        filename: extractionData.filename,
        text: extractionData.text as string,
        category: extractionData.category,
        json: extractionData.json
    };
};

export async function getExtractions(status: Status){
    const session = await getServerSession(authOptions);
     if(!session){
        throw new Error("Cannot authenticate user");
     };

     const userUUID = session.user.id;
     const extrcations = await prisma.extraction.findMany({
         where: {
            userId: userUUID,
            status: status
        },
        orderBy:{
            createdAt: "desc"
        }
     });

     return extrcations;
};

export async function getReceipts(){
    const session = await getServerSession(authOptions);
     if(!session){
        throw new Error("Cannot authenticate user");
     };

     const userUUID = session.user.id;
     const receipts = await prisma.receipt.findMany({
        where: {
            userId: userUUID
        },
        orderBy: {
            createdAt: "desc"
        },
        include: {
            extraction: true
        }
     });

     if(receipts.length === 0){
        return null;
     };

     const avgMonthlyExpenses = await prisma.$queryRaw`
       WITH months AS (
         SELECT generate_series(1,2) AS month
       ),
       receipts AS(
            SELECT 
              COALESCE(EXTRACT(MONTH FROM date), 0) AS month,
              AVG(total) AS average
            FROM "Receipt"
            WHERE "userId" = ${userUUID}
            GROUP BY COALESCE(EXTRACT(MONTH FROM date), 0)
       )
       SELECT
          months.month,
          COALESCE(r.average, 0) AS average
       FROM months
       LEFT JOIN receipts r ON months.month = r.month

       UNION ALL

       SELECT
         0 AS month,
         AVG(total) AS 
       FROM "Receipt"
       WHERE date IS NULL AND "userId" = ${userUUID}

       ORDER BY month     
     `;

  const categoryCounts = await prisma.receipt.groupBy({
    where: {
        userId: userUUID
    },
    by: ["category"],
    _count: {
        category: true
    }
  });

  const categoryDistribution = categoryCounts.map((item) => ({
     category: item.category,
     percentage: receipts.length === 0 ? 0 : (item._count.category / receipts.length) * 100,     
  }));

  const highestTotalAmount = await prisma.receipt.aggregate({
    where: {
        userId: userUUID
    },
    _max: {
        total: true
    }
  });

  const mostExpensiveCategory = await prisma.receipt.groupBy({
    where: {
        userId: userUUID
    },
    by: ["category"],
    _sum: {
        total: true
    },
    orderBy: {
        _sum: { total: "desc"}
    },
    take: 1
  });

  const mostRecurrentFrom = await prisma.receipt.groupBy({
    where: {
        userId: userUUID
    },
    by: ["from"],
    _count: {
        from: true
    },
    orderBy: {
        _count: { from: "desc"}
    },
    take: 1
  });

  const response = {
    receipts,
    avgMonthlyExpenses,
    categoryDistribution,
    highestTotalAmount: {
        total: highestTotalAmount._max.total
    },
    mostExpensiveCategory: {
        category: mostExpensiveCategory[0].category,
        total: mostExpensiveCategory[0]._sum.total
    },
    mostRecurrentFrom: {
        from: mostRecurrentFrom[0].from,
        count: mostRecurrentFrom[0]._count.from
    },
  };

  return response;
   
}

