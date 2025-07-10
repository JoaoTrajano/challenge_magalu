import { tasksQueryOptions } from "@/api/tasks/fetch-tasks/query-options";
import { Filters } from "@/components/filters";
import { Form } from "@/components/form";
import { TaskList } from "@/components/task-list";
import { queryClient } from "@/lib/react-query";
import {
  dehydrate,
  DehydratedState,
  HydrationBoundary,
} from "@tanstack/react-query";

type Props = {
  dehydratedState: DehydratedState;
};

export default function TasksPage({ dehydratedState }: Props) {
  return (
    <main className="max-w-lg mx-auto p-8 bg-gray-50 rounded-xl shadow-lg min-h-screen flex flex-col gap-6">
      <h1 className="text-3xl font-extrabold  mb-2">Minhas Tarefas</h1>
      <header className="mb-2">
        <Form />
        <Filters />
      </header>
      <section className="flex flex-col gap-4">
        <HydrationBoundary state={dehydratedState}>
          <TaskList />
        </HydrationBoundary>
      </section>
    </main>
  );
}

export async function getServerSideProps() {
  await queryClient.prefetchQuery(tasksQueryOptions({ status: null }));

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}
