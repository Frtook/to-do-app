import { useCompletedTask } from "@/hooks/useTask";
import { formatDateRange } from "@/lib/helper";
import { Checkbox, Skeleton } from "antd";
import Link from "next/link";
type Props = {
  data: Task[] | undefined;
};
export default function TaskCard({ data }: Props) {
  const { mutate: updateComplete } = useCompletedTask();
  if (!data) return <Skeleton active />;
  return (
    <div className="space-y-4">
      {data?.length === 0 && (
        <p className="text-gray-500 mt-4 text-center">No Task here!</p>
      )}
      {data?.map((task) => (
        <div key={task._id} className="rounded-2xl p-4 cursor-pointer bg-white">
          <Link href={`/task/${task._id}`}>
            <div className="flex justify-between ">
              <div className="space-y-2">
                <p className="text-xl font-bold">{task.title}</p>
                <p className="text-gray-400">{task.description}</p>
              </div>
              <Checkbox
                checked={task.is_completed}
                onChange={(e) => {
                  updateComplete({
                    id: task._id,
                    data: { is_completed: e.target.checked },
                  });
                }}
                onClick={(e) => e.preventDefault()}
              />
            </div>
            <hr className="border-gray-300 my-4" />
            <p className="text-gray-400">
              {formatDateRange(task.start_date, task.end_date)}
            </p>
          </Link>
        </div>
      ))}
    </div>
  );
}
