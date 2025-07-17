"use client";

import { Skeleton, Tag } from "antd";
import { CheckCircleOutlined, ClockCircleOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { useGetOneTask } from "@/hooks/useTask";
import { useParams } from "next/navigation";

export default function Page() {
  const id = useParams().id as string;
  const { data: task } = useGetOneTask(id);
  if (!task) return <Skeleton className="mt-40" active />;
  const statusColor = task.is_completed ? "green" : "orange";
  const statusText = task.is_completed ? "Completed" : "Pending";

  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-gray-50 px-4 py-10">
      <div className="w-full max-w-4xl rounded-2xl border border-gray-200 bg-white p-10 shadow-lg">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-800">{task.title}</h1>
          <Tag
            color={statusColor}
            icon={
              task.is_completed ? (
                <CheckCircleOutlined />
              ) : (
                <ClockCircleOutlined />
              )
            }
            className="text-base"
          >
            {statusText}
          </Tag>
        </div>

        <p className="mb-8 text-lg text-gray-700">{task.description}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-600">
          <div>
            <p className="text-sm font-semibold text-gray-500">Start Date</p>
            <p className="text-base text-gray-800">
              {dayjs(task.start_date).format("MMMM D, YYYY h:mm A")}
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold text-gray-500">End Date</p>
            <p className="text-base text-gray-800">
              {dayjs(task.end_date).format("MMMM D, YYYY h:mm A")}
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold text-gray-500">Created At</p>
            <p className="text-sm text-gray-600">
              {dayjs(task.createdAt).format("YYYY-MM-DD HH:mm")}
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold text-gray-500">Updated At</p>
            <p className="text-sm text-gray-600">
              {dayjs(task.updatedAt).format("YYYY-MM-DD HH:mm")}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
