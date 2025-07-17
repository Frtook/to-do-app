import { format, isToday } from "date-fns";
import dayjs from "dayjs";

export function formatDateRange(start: string, end: string) {
  const dateLabel = isToday(start) ? "Today" : format(start, "MMM d, yyyy");
  const timeRange = `${format(start, "h:mm a")} - ${format(end, "h:mm a")}`;

  return `${dateLabel} ${timeRange}`;
}

export function filterTasksByToday(tasks: Task[]): Task[] {
  const today = dayjs();
  const startOfToday = today.startOf("day");
  const endOfToday = today.endOf("day");

  return tasks.filter(
    (task) =>
      dayjs(task.start_date).isBefore(endOfToday) &&
      dayjs(task.end_date).isAfter(startOfToday)
  );
}
