'use client';

import { useState } from 'react';
import { TarefaResponse } from '@/types/tarefa';
import { PencilIcon, TrashIcon, CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useForm } from 'react-hook-form';

// Propriedades do componente TaskItem
interface TaskItemProps {
  task: TarefaResponse;
  onDelete: (id: number) => void;
  onUpdate: (task: TarefaResponse) => void;
}

// Componente para exibir um item de tarefa
export default function TaskItem({ task, onDelete, onUpdate }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const { register, handleSubmit, reset, setValue } = useForm<TarefaResponse>({
    defaultValues: task,
  });

  // Função para lidar com o clique no botão de editar
  const handleEditClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsEditing(true);
  };

  // Função para lidar com o clique no botão de deletar
  // Deleta a tarefa com o ID correspondente
  const handleDeleteClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault(); // Prevent form submission
    onDelete(task.id);
  };

  // Função para lidar com o clique no botão de cancelar
  // Reseta os valores do formulário para os valores originais da tarefa
  const handleCancelClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    reset(task);
    setIsEditing(false);
  };

  // Função para lidar com o envio do formulário
  // Atualiza a tarefa com os novos valores
  const onSubmit = (data: TarefaResponse) => {
    onUpdate(data);
    setIsEditing(false);
  };

  // Função para formatar data para o format dd/MM/yyyy
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);

    const fmtDate = Intl.DateTimeFormat('pt-BR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).format(date);

    return fmtDate;
  }

  return (
    <form key={task.id} className="bg-white shadow-md rounded-md p-4 flex flex-col justify-between h-full" onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            {isEditing ? (
              <div>
                <label htmlFor={`titulo-${task.id}`} className="block text-gray-700">Título</label>
                <input
                  {...register('titulo')}
                  id={`titulo-${task.id}`}
                  type="text"
                  className="w-full border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 transition font-bold text-black"
                  autoFocus
                />
              </div>
            ) : (
              <h2 className="text-xl font-bold text-black">{task.titulo}</h2>
            )}
          </div>
          <div className="flex flex-col items-end ml-4">
            {isEditing ? (
              <div>
                <label htmlFor={`prazoEntrega-${task.id}`} className="block text-gray-700">Prazo</label>
                <input
                  {...register('prazoEntrega')}
                  id={`prazoEntrega-${task.id}`}
                  type="date"
                  className="border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 transition text-black"
                  placeholder="Deadline"
                />
              </div>
            ) : (
              <p className="text-gray-500 text-sm">{formatDate(task.prazoEntrega)}</p>
            )}
          </div>
        </div>
      </div>
      <div className="mb-2 break-words">
        {isEditing ? (
          <div>
            <label htmlFor={`descricao-${task.id}`} className="block text-gray-700">Descrição</label>
            <input
              {...register('descricao')}
              id={`descricao-${task.id}`}
              type="text"
              className="w-full border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 transition text-black"
              placeholder="Description"
            />
          </div>
        ) : (
          <p className="text-gray-600">{task.descricao}</p>
        )}
      </div>
      <div className="flex justify-end space-x-4 mt-4">
        {isEditing ? (
          <>
            <button type="submit" className="text-green-600 hover:text-green-800 cursor-pointer">
              <CheckIcon className="h-5 w-5" />
            </button>
            <button type="button" onClick={handleCancelClick} className="text-red-600 hover:text-red-800 cursor-pointer">
              <XMarkIcon className="h-5 w-5" />
            </button>
          </>
        ) : (
          <>
            <button type="button" onClick={handleEditClick} className="text-blue-600 hover:text-blue-800 cursor-pointer">
              <PencilIcon className="h-5 w-5" />
            </button>
            <button type="button" onClick={handleDeleteClick} className="text-red-600 hover:text-red-800 cursor-pointer">
              <TrashIcon className="h-5 w-5" />
            </button>
          </>
        )}
      </div>
    </form>
  );
}