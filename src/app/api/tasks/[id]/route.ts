import { TaskModel } from "@/models/task";
import { connectDb } from "@/utils/database";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  try {
    await connectDb();
    const task = await TaskModel.findById(params.id);
    if (!task) {
      return NextResponse.json({ message: "Task not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Task fetched", task });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Error fetching task" },
      { status: 500 }
    );
  }
}

export const dynamic = "force-dynamic";
