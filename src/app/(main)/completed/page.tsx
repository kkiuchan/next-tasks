import TaskCard from "@/components/TaskCard/TaskCard";
import { TaskDocument } from "@/models/task";

const getCompletedTasks = async (): Promise<TaskDocument[]> => {
  //fetchでAPI routesの/tasks/completedにアクセスして、completedTasksを取得
  const response = await fetch(`${process.env.API_URL}/tasks/completed`, {
    cache: "no-store",
  });
  //statusが200以外の場合はエラーをスロー
  if (response.status !== 200) {
    throw new Error();
  }
  //responseをjsonに変換してcompletedTasksを返す
  const data = await response.json();
  const completedTasks = data.tasks as TaskDocument[];
  return completedTasks;
};

const CompletedTaskPage = async () => {
  const completedTasks = await getCompletedTasks();

  return (
    <div className="text-gray-800 p-8 h-full overflow-y-auto pb-24">
      <header className="flex justify-between items-center ">
        <h1 className="text-2xl font-bold flex items-center">
          Completed Tasks
        </h1>
      </header>
      <div className="mt-8 flex flex-wrap gap-4">
        {completedTasks.map((task) => {
          return <TaskCard key={task._id} task={task} />;
        })}
      </div>
    </div>
  );
};

export default CompletedTaskPage;
