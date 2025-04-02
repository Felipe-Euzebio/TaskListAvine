'use client';

import { useForm } from 'react-hook-form';
import { TarefaRequest } from '@/types/tarefa';

interface AddTaskDialogProps {
  onAddTask: (task: TarefaRequest) => void;
  onClose: () => void;
}

export default function AddTaskDialog({ onAddTask, onClose }: AddTaskDialogProps) {
  const { register, handleSubmit, reset } = useForm<TarefaRequest>();

  const onSubmit = (data: TarefaRequest) => {
    onAddTask(data);
    reset();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center">
      <div className="fixed inset-0 bg-gray-500 opacity-75"></div>
      <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:w-full sm:max-w-lg">
        <form onSubmit={handleSubmit(onSubmit)} className="p-6">
          <h2 className="text-lg font-bold mb-4 text-black">Adicionar Tarefa</h2>
          <div className="mb-4">
            <label htmlFor="titulo" className="block text-gray-700">Título</label>
            <input
              {...register('titulo')}
              id="titulo"
              type="text"
              className="w-full border border-gray-300 rounded-md p-2 mt-1 text-black"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="descricao" className="block text-gray-700">Descrição</label>
            <input
              {...register('descricao')}
              id="descricao"
              type="text"
              className="w-full border border-gray-300 rounded-md p-2 mt-1 text-black"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="prazoEntrega" className="block text-gray-700">Prazo</label>
            <input
              {...register('prazoEntrega')}
              id="prazoEntrega"
              type="date"
              className="w-full border border-gray-300 rounded-md p-2 mt-1 text-black"
              required
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button type="button" onClick={onClose} className="bg-red-600 text-white px-4 py-2 rounded-md cursor-pointer">Cancelar</button>
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md cursor-pointer">Adicionar</button>
          </div>
        </form>
      </div>
    </div>
  );
}