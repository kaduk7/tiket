import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import * as bcrypt from "bcrypt"

const prisma = new PrismaClient()

export const PATCH = async (request: Request, { params }: { params: { id: string } }) => {
    const formData = await request.formData()
    const newfoto = formData.get('newfoto')
    const cekplat = await prisma.mobilTb.findMany({
        where: {
            plat: String(formData.get('plat')),
            NOT: {
                id: Number(params.id)
            }
        }
    })
    if (cekplat.length > 0) {
        return NextResponse.json({ status: 555, pesan: "sudah ada plat" })
    }
    await prisma.mobilTb.update({
        where: {
            id: Number(params.id)
        },
        data: {
            nama: String(formData.get('nama')),
            plat:String(formData.get('plat')),
            merek: String(formData.get('merek')),
            jumlahBangku: Number(formData.get('jumlahBangku')),
        }
    })
    if (newfoto === 'yes') {
        await prisma.mobilTb.update({
            where: {
                id: Number(params.id)
            },
            data: {
                foto: String(formData.get('namaunik')),
            }
        })
    }
    return NextResponse.json({ status: 200, pesan: "berhasil" })
}

export const DELETE = async (request: Request, { params }: { params: { id: string } }) => {

    await prisma.mobilTb.delete({
        where: {
            id: Number(params.id)
        }
    })
    return NextResponse.json({ status: 200 })
}