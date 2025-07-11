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
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 p-0 m-0 bg-gray-50 gap-6 md:p-8">
        <h1 className="text-3xl font-extrabold mb-2 p-4">Minhas Tarefas</h1>
        <section className="rounded-xl shadow-lg bg-white p-6 min-h-32 max-w-6xl mx-auto flex flex-col md:flex-row-reverse md:justify-between ">
          <header className="mb-2 w-11/12">
            <Form />
            <Filters />
          </header>
          <div className="border-t border-gray-200 my-6 md:border-t-0 md:border-l md:my-0 md:mx-6" />
          <HydrationBoundary state={dehydratedState}>
            <section className="flex flex-col justify-center items-center md:w-10/12 ">
              <TaskList />
            </section>
          </HydrationBoundary>
        </section>
      </main>
    </div>
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
