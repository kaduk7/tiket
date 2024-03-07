import { NextAuth } from 'next-auth';

declare module "next-auth"{
    interface Session {
        id: Number;
        hp: String,
        nama: String,
        jenis: string;
    }
}

