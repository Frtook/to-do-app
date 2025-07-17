"use client";
import { cn } from "@/lib/utils";
import { Tabs, TabsProps } from "antd";
import { useState } from "react";
import TaskCard from "./TaskCard";
import AddTask from "./modals/AddTask";
type Props = {
  tasks: Task[] | undefined;
  name: string;
};
export default function TaskHeader({ tasks, name }: Props) {
  const [key, setKey] = useState("1");
  const openTasks = tasks?.filter((task) => !task.is_completed);
  const closedTasks = tasks?.filter((task) => task.is_completed);
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: (
        <LableTab name="All" keyTab={key} count={tasks?.length} ownKey="1" />
      ),
      children: <TaskCard data={tasks} />,
    },
    {
      key: "2",
      label: (
        <LableTab
          name="Open"
          keyTab={key}
          count={openTasks?.length}
          ownKey="2"
        />
      ),
      children: <TaskCard data={openTasks} />,
    },
    {
      key: "3",
      label: (
        <LableTab
          name="Closed"
          keyTab={key}
          count={closedTasks?.length}
          ownKey="3"
        />
      ),
      children: <TaskCard data={closedTasks} />,
    },
    {
      key: "4",
      label: <LableTab name="Archived" keyTab={key} count={0} ownKey="4" />,
      children: "Content of Tab Pane 2",
      disabled: true,
    },
  ];
  const onChange = (key: string) => {
    setKey(key);
  };
  return (
    <div className="mt-6 p-6">
      <div className="flex items-center mb-3 justify-between">
        <div className="space-y-1">
          <h1 className="text-xl font-bold">{name} Task</h1>
          <p>
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              day: "numeric",
              month: "long",
            })}
          </p>
        </div>
        <AddTask />
      </div>
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
    </div>
  );
}

const LableTab = ({
  name,
  count,
  keyTab,
  ownKey,
}: {
  name: string;
  count: number | undefined;
  keyTab: string;
  ownKey: string;
}) => {
  return (
    <div className="space-x-2">
      <span>{name}</span>
      <span
        className={cn("bg-blue-500 text-white rounded-full px-2 py-1", {
          "bg-blue-400 text-white": keyTab === ownKey,
          "bg-gray-200 text-black": keyTab !== ownKey,
        })}
      >
        {count}
      </span>
    </div>
  );
};
