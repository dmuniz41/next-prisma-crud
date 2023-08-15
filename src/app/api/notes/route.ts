import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

export async function GET() {
  try {
    const notes = await prisma.note.findMany();
    return NextResponse.json(notes);
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
export async function POST(request: Request) {
  try {
    const { title, content } = await request.json();

    const newNote = await prisma.note.create({
      data: {
        title,
        content,
      },
    });
    return NextResponse.json(newNote);
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
