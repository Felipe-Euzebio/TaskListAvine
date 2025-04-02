'use client';

import { TarefaResponse } from '@/types/tarefa';
import TaskItem from './TaskItem';

// Propriedades do componente TaskList
interface TaskListProps {
  tasks: TarefaResponse[];
  onDelete: (id: number) => void;
  onUpdate: (updatedTask: TarefaResponse) => void;
}

// Componente para exibir uma lista de tarefas
// Recebe uma lista de tarefas, função para deletar e função para atualizar
export default function TaskList({ tasks, onDelete, onUpdate }: TaskListProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} onDelete={onDelete} onUpdate={onUpdate} />
      ))}
    </div>
  );
}