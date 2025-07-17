"use client";

import { Button, Modal, DatePicker, Form, Input, message } from "antd";
import { useEffect, useState } from "react";
import { z } from "zod/v4";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateTask } from "@/hooks/useTask";

const schema = z.object({
  title: z.string().min(2, "Title is too short"),
  description: z.string().min(5, "Description is too short"),
  start_date: z.string("Start date is required"),
  end_date: z.string("End date is required"),
});

export type TaskType = z.infer<typeof schema>;

export default function AddTask() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { mutate: createTask, isPending, isSuccess, isError } = useCreateTask();
  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<TaskType>({
    resolver: zodResolver(schema),
  });
  const { RangePicker } = DatePicker;

  const onSubmit = (data: TaskType) => {
    createTask(data);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (isSuccess) {
      message.success("Add Task successfully!");
      setIsModalOpen(false);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      message.error("Not add try alter");
    }
  }, [isError]);
  return (
    <>
      <Button color="primary" variant="outlined" icon="+" onClick={showModal}>
        New Task
      </Button>
      <Modal
        title="Basic Modal"
        footer=""
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          layout="vertical"
          onFinish={handleSubmit(onSubmit)}
          className="max-w-xl mx-auto mt-10"
        >
          <Form.Item
            label="Title"
            validateStatus={errors.title ? "error" : ""}
            help={errors.title?.message}
          >
            <Controller
              name="title"
              control={control}
              render={({ field }) => <Input {...field} />}
            />
          </Form.Item>

          <Form.Item
            label="Description"
            validateStatus={errors.description ? "error" : ""}
            help={errors.description?.message}
          >
            <Controller
              name="description"
              control={control}
              render={({ field }) => <Input.TextArea {...field} rows={4} />}
            />
          </Form.Item>

          <Form.Item
            label="Date"
            validateStatus={errors.end_date ? "error" : ""}
            help={errors.end_date?.message}
          >
            <RangePicker
              showTime={{ format: "HH:mm" }}
              className="w-full"
              format="YYYY-MM-DD HH:mm"
              onChange={(_, dateString) => {
                setValue("start_date", dateString[0]);
                setValue("end_date", dateString[1]);
              }}
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              loading={isPending}
              disabled={isPending}
              htmlType="submit"
            >
              Add Task
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
