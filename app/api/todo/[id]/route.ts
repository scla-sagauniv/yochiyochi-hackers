import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { NextResponse } from 'next/server';
import { PrismaClient } from "@prisma/client";


//インスタンスを作成
const prisma = new PrismaClient();

// データベースに接続する関数
export const connect = async () => {
    try {
        //prismaでデータベースに接続
        prisma.$connect();
    } catch (error) {
        return Error("DB接続失敗しました")
    }
}

//削除
export const DELETE = async (req: Request, { params }: { params: Params }) => {
    try {
        const targetId:string = String(params.id);
     
        await connect();
        const todos = await prisma.todo.delete({
            where: { id: targetId }
        });

        return NextResponse.json({ message: "削除成功", todos }, { status: 200 })

    } catch (error) {
        return NextResponse.json({ messeage: "削除失敗" }, { status: 500 })

    } finally {
        await prisma.$disconnect();
    }
}

// isDoneを変更する処理　PUT
export const PUT = async(req: Request, { params }: { params: Params }) => {
    try {
        const targetId:string = String(params.id);
        const { isdone } = await req.json();
        await connect();
        const todos = await prisma.todo.update({
            where: { id: targetId  },
            data: { isDone: isdone}
        });

        return NextResponse.json({ message: "更新成功", todos }, { status: 200 })

    } catch (error) {
        return NextResponse.json({ messeage: "更新失敗" }, { status: 500 })

    } finally {
        await prisma.$disconnect();
    }

}