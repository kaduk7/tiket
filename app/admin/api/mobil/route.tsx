import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import * as bcrypt from "bcrypt"

const prisma = new PrismaClient()

export const POST = async (request: Request) => {
    const formData = await request.formData()
    const cekplat = await prisma.mobilTb.findUnique({
        where: {
            plat: String(formData.get('hp')),
        }
    })
    if (cekplat) {
        return NextResponse.json({ pesan: "plat sudah ada" })
    }
    await prisma.mobilTb.create({
        data: {
            nama: String(formData.get('nama')),
            plat:String(formData.get('plat')),
            merek: String(formData.get('merek')),
            jumlahBangku: Number(formData.get('jumlahBangku')),
            foto: String(formData.get('namaunik')),
        }
    })
    return NextResponse.json({ pesan: 'berhasil' })
}

export const GET = async () => {
    const user = await prisma.mobilTb.findMany({
        orderBy: {
            id: 'asc'
        }
    });
    return NextResponse.json(user, { status: 200 })
}