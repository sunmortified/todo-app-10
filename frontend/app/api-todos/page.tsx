import { getTasks } from '@/lib/tasks';
import ApiTodoList from './components/ApiTodoList';

export default async function ApiTodosPage() {
  const todos = await getTasks();

  const tasks = todos.map((todo) => ({
    id: todo.id,
    title: todo.todo,
    completed: todo.completed,
  }));

  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Daftar Tugas (Todo List)
        </h1>

        <ApiTodoList initialTasks={tasks} />
      </div>
    </main>
  );
}