'use client';

import React, { useState } from 'react';
import { TaskItem } from '@/types/api-todo';
import { todoService } from '@/services/todoService';

type ApiTodoListProps = {
  initialTasks: TaskItem[];
};

export default function ApiTodoList({
  initialTasks,
}: ApiTodoListProps) {
  const [tasks, setTasks] = useState<TaskItem[]>(initialTasks);

  const handleToggleTask = async (
    id: number,
    currentCompleted: boolean
  ) => {
    const targetStatus = !currentCompleted;

    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? { ...task, completed: targetStatus }
          : task
      )
    );

    try {
      await todoService.updateTodoStatus(
        id,
        targetStatus
      );
    } catch (error) {
      console.warn(
        'Simulasi update ke API DummyJSON gagal:',
        error
      );
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-white rounded-2xl border border-gray-200 shadow-sm p-6">

      {/* Garis */}
      <div className="border-t border-gray-200 mb-5"></div>

      {/* Header tabel */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-medium text-slate-600">
          Daftar Tugas
        </h2>

        <span className="text-xs bg-gray-200 text-gray-600 px-3 py-1 rounded-full">
          {tasks.length} Item
        </span>
      </div>

      {/* Daftar */}
      <div className="space-y-2">

        {tasks.map((task) => (
          <div
            key={task.id}
            className={`flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl border ${
              task.completed
                ? 'bg-green-50 border-green-200'
                : 'bg-white border-gray-200'
            }`}
          >

            {/* Bagian kiri */}
            <div className="flex items-center gap-3 min-w-0">

              <input
                type="checkbox"
                checked={task.completed}
                onChange={() =>
                  handleToggleTask(
                    task.id,
                    task.completed
                  )
                }
                className="w-4 h-4 accent-pink-500 cursor-pointer shrink-0"
              />

              <span
                className={`text-sm ${
                  task.completed
                    ? 'line-through text-gray-400'
                    : 'text-slate-700'
                }`}
              >
                {task.title}
              </span>

            </div>

            {/* Bagian kanan */}
            <div className="flex items-center gap-1.5 shrink-0">

              {/* ID */}
              <span className="text-[10px] font-medium bg-pink-100 text-pink-700 px-2 py-1 rounded-full">
                ID: {task.id}
              </span>

              {/* User */}
              <span className="text-[10px] font-medium bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                User: {task.userId}
              </span>

              {/* Status */}
              {task.completed ? (
                <span className="text-[10px] font-medium bg-green-100 text-green-700 px-2 py-1 rounded-full">
                  Selesai
                </span>
              ) : (
                <span className="text-[10px] font-medium bg-orange-100 text-orange-700 px-2 py-1 rounded-full">
                  Pending
                </span>
              )}

            </div>
          </div>
        ))}

      </div>
    </div>
  );
}