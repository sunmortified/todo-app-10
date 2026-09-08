import { todoService } from '@/services/todoService';

export async function getTasks() {
  return todoService.getTodos();
}