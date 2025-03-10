"use client";

import { createTask, FormState } from "@/actions/task";
import { useActionState } from "react";

const NewTaskForm = () => {
  const initialState: FormState = { error: "" };
  const [state, formAction, isPending] = useActionState(
    createTask,
    initialState
  );

  return (
    <div className="mt-10 mx-auto w-full max-w-sm">
      <form action={formAction}>
        <div>
          <label htmlFor="title" className="block text-sm font-medium">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            required
            className="block mt-2 py-1.5 px-2 w-full rounded-md border-0 shadow-sm ring-1 ring-inset ring-gray-300"
          />
        </div>
        <div className="mt-6">
          <label htmlFor="description" className="block text-sm font-medium">
            Description
          </label>
          <input
            type="text"
            id="description"
            name="description"
            required
            className="block mt-2 py-1.5 px-2 w-full rounded-md border-0 shadow-sm ring-1 ring-inset ring-gray-300"
          />
        </div>
        <div className="mt-6">
          <label htmlFor="dueDate" className="block text-sm font-medium">
            Due Date
          </label>
          <input
            type="date"
            id="dueDate"
            name="dueDate"
            min="2022-01-01"
            max="2025-12-31"
            required
            className="block mt-2 py-1.5 px-2 w-full rounded-md border-0 shadow-sm ring-1 ring-inset ring-gray-300"
          />
        </div>
        <button
          type="submit"
          disabled={isPending}
          className="mt-8 py-2 w-full rounded-md text-white bg-gray-800 hover:bg-gray-700 text-sm font-semibold shadow-sm disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Create
        </button>
        {state.error && (
          <p className="mt-2 text-red-500 text-sm">{state.error}</p>
        )}
      </form>
    </div>
  );
};

export default NewTaskForm;
