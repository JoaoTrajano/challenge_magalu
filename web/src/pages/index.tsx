import { tasksQueryOptions } from "@/api/tasks/fetch-tasks/query-options";
import { Filters } from "@/components/filters";
import { Form } from "@/components/form";
import { TaskList } from "@/components/task-list";
import {
  dehydrate,
  DehydratedState,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

type Props = {
  dehydratedState: DehydratedState;
};

export default function TasksPage({ dehydratedState }: Props) {
  return (
    <main className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Minhas Tarefas</h1>
      <Form />
      <Filters />
      <HydrationBoundary state={dehydratedState}>
        <TaskList />
      </HydrationBoundary>
    </main>
  );
}

export async function getServerSideProps() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(tasksQueryOptions({ status: null }));

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}
