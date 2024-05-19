import { PrismaClient } from "@prisma/client";
import { NextResponse } from 'next/server';


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

// 生成
export const POST = async (req: Request, res: NextResponse) => {
    const { id, task } = await req.json();
    try {
        await connect();
        const todo = await prisma.todo.create({
            data: {
                id: id,
                task: task,
            }
        });

        return NextResponse.json({ message: "投稿完了"}, { status: 200 })

    } catch (error) {
        return NextResponse.json({ messeage: "投稿失敗" }, { status: 500 })

    } finally {
        await prisma.$disconnect();
    }
}


// データベースからデータを取得する faluse
export const GET = async (req: Request) => {
    try {
        await connect();
        const todos = await prisma.todo.findMany({
            where:{isDone:false}
        });
	
        return NextResponse.json({todos},{ status: 200 })

    } catch (error) {
        return NextResponse.json({ messeage: "Error" },{ status: 500 })

    } finally {
    //必ず実行する
        await prisma.$disconnect();
    }
}