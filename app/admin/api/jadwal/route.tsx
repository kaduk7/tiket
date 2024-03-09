import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const POST = async (request: Request) => {
    const formData = await request.formData()
    const tanggalBerangkatString = formData.get('tanggalBerangkat');

    if (tanggalBerangkatString !== null) {
        const tanggalBerangkatDate = new Date(tanggalBerangkatString.toString());
        await prisma.jadwalTb.create({
            data: {
                userId: Number(formData.get('userId')),
                mobilId: Number(formData.get('mobilId')),
                sesiId: Number(formData.get('sesiId')),
                ruteId: Number(formData.get('ruteId')),
                tanggalBerangkat: tanggalBerangkatDate,
                ongkos: Number(formData.get('ongkos')),
            }
        })
        return NextResponse.json({ pesan: 'berhasil' })
    }
}

export const GET = async () => {
    const user = await prisma.jadwalTb.findMany({
        include: {
            userTb: true,
            mobilTb: true,
            sesiTb: true,
            ruteTb:true,
        },
        orderBy: {
            id: 'asc'
        },
    });
    return NextResponse.json(user, { status: 200 })
}