"use server";

import { Task, TaskModel } from "@/models/task";
import { connectDb } from "@/utils/database";
import { redirect } from "next/navigation";

export interface FormState {
  error: string;
}

export const createTask = async (state: FormState, formData: FormData) => {
  const newTask: Task = {
    title: formData.get("title") as string,
    description: formData.get("description") as string,
    dueDate: formData.get("dueDate") as string,
    isCompleted: false,
  };

  try {
    await connectDb();
    await TaskModel.create(newTask);
  } catch (error) {
    state.error = "Error creating task";
    return state;
  }
  redirect("/");
};

export const updateTask = async (
  id: string,
  state: FormState,
  formData: FormData
) => {
  const updateTask: Task = {
    title: formData.get("title") as string,
    description: formData.get("description") as string,
    dueDate: formData.get("dueDate") as string,
    isCompleted: Boolean(formData.get("isCompleted")),
  };

  try {
    await connectDb();
    await TaskModel.updateOne({ _id: id }, updateTask);
  } catch (error) {
    state.error = "Error editing task";
    return state;
  }
  redirect("/");
};

export const deleteTask = async (
  id: string,
  state: FormState
  //   formData: FormData
) => {
  try {
    await connectDb();
    await TaskModel.deleteOne({ _id: id });
  } catch (error) {
    state.error = "Error deleting task";
    return state;
  }
  redirect("/");
};
