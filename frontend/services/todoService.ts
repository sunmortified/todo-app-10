export interface Todo {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
}

export const todoService = {
  async getTodos(): Promise<Todo[]> {
    const response = await fetch(
      'https://dummyjson.com/todos?limit=10',
      {
        cache: 'force-cache',
      }
    );

    if (!response.ok) {
      const errorText = await response.text();

      throw new Error(
        `Failed to fetch todos: ${response.status} ${response.statusText} - ${errorText}`
      );
    }

    const data = await response.json();

    return data.todos;
  },
};