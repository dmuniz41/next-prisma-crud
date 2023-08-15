

import { NextResponse } from "next/server";


export function GET(){
  return NextResponse.json({
    message: 'List single note'
  })
}
export function PUT(){
  return NextResponse.json({
    message: 'Update single note'
  })
}

export function DELETE(){
  return NextResponse.json({
    message: 'Delete single note'
  })
}