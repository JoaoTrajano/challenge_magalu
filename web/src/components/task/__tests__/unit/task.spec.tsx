import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Tasks, TaskStatus } from "@/api/tasks/@types";
import { beforeEach, expect, Mock, test, vi } from "vitest";
import { Task } from "../../task";

vi.mock("@/api/tasks", () => ({
  useDeleteTask: vi.fn(),
  useUpdateTaskStatus: vi.fn(),
}));

vi.mock("@tanstack/react-query", () => ({
  useQueryClient: vi.fn(),
}));

vi.mock("sonner", () => ({
  toast: {
    error: vi.fn(),
  },
}));

import * as apiTasks from "@/api/tasks";
import * as reactQuery from "@tanstack/react-query";

const mockDelete = vi.fn();
const mockUpdate = vi.fn();
const mockInvalidateQueries = vi.fn();

const mockUseDeleteTask = apiTasks.useDeleteTask as unknown as Mock;
const mockUseUpdateTaskStatus = apiTasks.useUpdateTaskStatus as unknown as Mock;
const mockUseQueryClient = reactQuery.useQueryClient as unknown as Mock;

beforeEach(() => {
  mockUseDeleteTask.mockReturnValue({
    mutateAsync: mockDelete,
    isPending: false,
  });

  mockUseUpdateTaskStatus.mockReturnValue({
    mutateAsync: mockUpdate,
    isPending: false,
  });

  mockUseQueryClient.mockReturnValue({
    invalidateQueries: mockInvalidateQueries,
    getQueryData: vi.fn(() => ({
      value: [],
    })),
    setQueryData: vi.fn(),
  });
});

const taskMock: Tasks = {
  id: "123",
  title: "Some task title",
  status: TaskStatus.PENDING,
  createdAt: new Date("2023-10-01T12:00:00Z"),
  updatedAt: new Date("2023-10-01T12:00:00Z"),
};

test("should render the task title and creation date", () => {
  render(<Task data={taskMock} />);

  expect(screen.getByText("Some task title")).toBeInTheDocument();
  expect(screen.getByText(/Criado em:/)).toBeInTheDocument();
});

test("should be able to delete the task", async () => {
  render(<Task data={taskMock} />);
  const deleteButton = screen.getByRole("button");

  fireEvent.click(deleteButton);

  await waitFor(() => {
    expect(mockDelete).toHaveBeenCalledWith({ id: taskMock.id });
  });
});

test("should be able to toggle the task status", async () => {
  render(<Task data={taskMock} />);

  const checkbox = screen.getByRole("checkbox");

  fireEvent.click(checkbox);

  await waitFor(() => {
    expect(mockUpdate).toHaveBeenCalledWith({
      id: taskMock.id,
      newStatus: TaskStatus.COMPLETED,
    });
  });
});
