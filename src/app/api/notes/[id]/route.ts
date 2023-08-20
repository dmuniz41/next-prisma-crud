import { NextResponse } from "next/server";
import { prisma } from "../../../../libs/prisma";

interface Params {
  params: { id: String };
}

export async function GET(request: Request, { params }: Params) {
  try {
    const note = await prisma.note.findFirst({
      where: {
        id: Number(params.id),
      },
    });

    if (!note) {
      return NextResponse.json({
        ok: false,
        message: "Note not found",
      });
    }

    return NextResponse.json({
      ok: true,
      note,
    });
  } catch (error) {
    return NextResponse.json(error);
  }
}
export async function PUT(request: Request, { params }: Params) {
  try {
    const { title, content } = await request.json();
    const updatedNote = await prisma.note.update({
      where: {
        id: Number(params.id),
      },
      data: {
        title,
        content,
      },
    });

    if (!updatedNote) {
      return NextResponse.json({
        ok: false,
        message: "Note not found",
      });
    }
    return NextResponse.json({
      ...updatedNote,
    });
  } catch (error) {
    return NextResponse.json(error);
  }
}

export async function DELETE(request: Request, { params }: Params) {
  try {
    const deletedNote = await prisma.note.delete({
      where: {
        id: Number(params.id),
      },
    });

    if (!deletedNote) {
      return NextResponse.json({
        ok: false,
        message: "Note not found",
      });
    }

    return NextResponse.json({
      ok: true,
      deletedNote,
    });
  } catch (error) {
    return NextResponse.json(error);
  }
}
