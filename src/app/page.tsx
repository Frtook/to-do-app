"use client";
import { Tabs } from "antd";
import "@ant-design/v5-patch-for-react-19";
import type { TabsProps } from "antd";
import TaskHeader from "@/components/TaskHeader";
import { useGetTasks } from "@/hooks/useTask";
import { filterTasksByToday } from "@/lib/helper";

export default function Home() {
  const { data: tasks } = useGetTasks();
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: <p className="font-bold text-lg px-6">Today&apos;s Task</p>,
      children: (
        <TaskHeader tasks={filterTasksByToday(tasks || [])} name={"Today's"} />
      ),
    },
    {
      key: "2",
      label: <p className="font-bold text-lg px-6">All Tasks</p>,
      children: <TaskHeader tasks={tasks} name={"All"} />,
    },
  ];

  return (
    <div className="max-w-lg bg-gray-50 p-4 rounded-2xl mx-auto mt-20">
      <Tabs defaultActiveKey="1" size="middle" items={items} />
    </div>
  );
}
