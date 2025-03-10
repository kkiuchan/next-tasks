import { TaskDocument, TaskModel } from "@/models/task";
import { connectDb } from "@/utils/database";
import { NextResponse } from "next/server";

export const GET = async () => {
  const currentDate = new Date()
    .toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    .replace(/\//g, "-");
  try {
    await connectDb();
    const expiredTasks: TaskDocument[] = await TaskModel.find({
      isCompleted: false,
      dueDate: { $lt: currentDate },
    });
    return NextResponse.json({
      message: "Expired tasks fetched",
      tasks: expiredTasks,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Error fetching expired tasks" },
      { status: 500 }
    );
  }
};
