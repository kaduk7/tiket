import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import * as bcrypt from "bcrypt"

const prisma = new PrismaClient()

export const POST = async (request: Request) => {
    const formData = await request.formData()
    await prisma.ruteTb.create({
        data: {
            nama: String(formData.get('nama')),
        }
    })
    return NextResponse.json({ pesan: 'berhasil' })
}

export const GET = async () => {
    const user = await prisma.ruteTb.findMany({
        orderBy: {
            id: 'asc'
        }
    });
    return NextResponse.json(user, { status: 200 })
}