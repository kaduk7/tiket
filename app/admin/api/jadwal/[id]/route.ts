import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const PATCH = async (request: Request, { params }: { params: { id: string } }) => {
    const formData = await request.formData()
    await prisma.jadwalTb.update({
        where: {
            id: Number(params.id)
        },
        data: {
            userId: Number(formData.get('userId')),
            mobilId: Number(formData.get('mobilId')),
            sesiId: Number(formData.get('sesiId')),
            ongkos: Number(formData.get('ongkos')),
        }
    })
    return NextResponse.json({ status: 200, pesan: "berhasil" })
}

export const DELETE = async (request: Request, { params }: { params: { id: string } }) => {

    await prisma.jadwalTb.delete({
        where: {
            id: Number(params.id)
        }
    })
    return NextResponse.json({ status: 200 })
}

export const GET = async (request: Request, { params }: { params: { id: string } }) => {
    const karyawan = await prisma.jadwalTb.findMany({
        where: {
            tanggalBerangkat: new Date(params.id).toISOString()
        },
        include: {
            userTb: true,
            mobilTb: true,
            sesiTb: true,
        },
        orderBy: {
            sesiTb: {
                id: "asc"
            }
        }
    });
    return NextResponse.json(karyawan, { status: 200 })

}