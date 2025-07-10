import { beforeEach, expect, Mock, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { TaskList } from "../../task-list";

vi.mock("@/components/filters/hooks/useFilters", () => ({
  useTaskFilter: vi.fn(),
}));

vi.mock("@/api/tasks", () => ({
  useFetchTasks: vi.fn(),
}));

import * as apiTasks from "@/api/tasks";
import * as useFilters from "@/components/filters/hooks/useFilters";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Tasks } from "@/api/tasks/@types";

const mockTaskFilter = vi.fn();

const mockUseTaskFilter = useFilters.useTaskFilter as unknown as Mock;
const mockUseFetchTasks = apiTasks.useFetchTasks as unknown as Mock;

beforeEach(() => {
  mockUseTaskFilter.mockReturnValue({
    status: null,
    setStatus: mockTaskFilter,
  });

  mockUseFetchTasks.mockReturnValue({
    data: {
      value: [],
    },
    isLoading: false,
  });

  vi.mock("@/components/task", () => ({
    Task: ({ data }: { data: Tasks }) => (
      <div data-testid="task">{data.title}</div>
    ),
  }));
});

const renderWithClient = (ui: React.ReactElement) => {
  const testQueryClient = new QueryClient();
  return render(
    <QueryClientProvider client={testQueryClient}>{ui}</QueryClientProvider>
  );
};

test("should render empty state when no tasks are present", () => {
  render(<TaskList />);
  expect(screen.getByText("Nenhuma tarefa adicionada.")).toBeInTheDocument();
});

test("should render task list", () => {
  mockUseFetchTasks.mockReturnValue({
    data: {
      value: [
        { id: "1", title: "Task 1", date: "2025-07-10" },
        { id: "2", title: "Task 2", date: "2025-07-11" },
      ],
    },
    isLoading: false,
  });

  renderWithClient(<TaskList />);

  const tasks = screen.getAllByTestId("task");
  expect(tasks).toHaveLength(2);
  expect(tasks[0]).toHaveTextContent("Task 1");
  expect(tasks[1]).toHaveTextContent("Task 2");
});
