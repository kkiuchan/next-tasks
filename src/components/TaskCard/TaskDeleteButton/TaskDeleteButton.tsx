"use client";

import { deleteTask, FormState } from "@/actions/task";
import { useActionState, useEffect } from "react";
import { FaTrashAlt } from "react-icons/fa";

interface TaskDeleteButtonProps {
  id: string;
}

const TaskDeleteButton: React.FC<TaskDeleteButtonProps> = ({ id }) => {
  const deleteTaskWithId = deleteTask.bind(null, id);

  const initialState: FormState = { error: "" };
  const [state, formAction, isPending] = useActionState(
    deleteTaskWithId,
    initialState
  );

  useEffect(() => {
    if (state && state.error !== "") {
      alert(state.error);
    }
  }, [state]);

  return (
    <form action={formAction}>
      <button
        type="submit"
        disabled={isPending}
        className="hover:text-gray-700 text-lg cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        <FaTrashAlt />
      </button>
    </form>
  );
};

export default TaskDeleteButton;
