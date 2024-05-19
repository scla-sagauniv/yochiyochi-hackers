import { PrismaClient } from "@prisma/client";
import { NextResponse } from 'next/server';
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";


//インスタンスを作成
const prisma = new PrismaClient();

// データベースに接続する関数
export const connect = async () => {
    try {
        //prismaでデータベースに接続
        prisma.$connect();
        console.log("success")
    } catch (error) {
        return Error("DB接続失敗しました")
    }
}

// isDone == trueのtaskを取得
export const GET = async (req: Request) => {
    try {
        await connect();
        const todos = await prisma.todo.findMany({
            where: { isDone: true }

        });
        
	
        return NextResponse.json({todos},{ status: 200 })

    } catch (error) {
        return NextResponse.json({ messeage: "Error" },{ status: 500 })

    } finally {
    //必ず実行する
        await prisma.$disconnect();
    }
}


