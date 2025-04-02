'use client';

import { useState, useEffect } from 'react';
import TaskList from '@/components/TaskList';
import AddTaskDialog from '@/components/AddTaskDialog';
import { TarefaResponse, TarefaRequest } from '@/types/tarefa';
import { toast } from 'react-toastify';

// Componente principal da página Home
export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar a abertura do modal
  const [tasks, setTasks] = useState<TarefaResponse[]>([]); // Estado para armazenar as tarefas
  const [loading, setLoading] = useState(true); // Estado para controlar o carregamento

  // useEffect para buscar as tarefas ao carregar a página
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await fetch('/api/tarefas');

        // Verifica se a API retornou um erro (4xx ou 5xx)
        // Se sim, exibe uma mensagem de erro
        if (!res.ok) {
          const error = await res.json();

          toast.error(error.message);

          setLoading(false);

          return;
        }

        const data = await res.json();

        // Atualiza o estado com as tarefas recebidas
        setTasks(data);
      } catch (error) { // Captura de erro para caso o fetch falhe (ex.: rede inacessível)
        const errorMessage = error instanceof Error 
          ? error.message 
          : 'Ops! Ocorreu um erro inesperado. Tente novamente mais tarde.';	

        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  // Função para adicionar uma nova tarefa
  const handleAddTask = async (task: TarefaRequest) => {
    try {
      const res = await fetch('/api/tarefas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task),
      });

      if (!res.ok) {
        const error = await res.json();

        toast.error(error.message);

        return;
      }

      const newTask: TarefaResponse = await res.json();

      // Atualiza o estado com a nova tarefa recebida
      setTasks([...tasks, newTask]);

      toast.success('Tarefa adicionada com sucesso!');
    } catch (error) {
      const errorMessage = error instanceof Error 
        ? error.message 
        : 'Ops! Ocorreu um erro inesperado. Tente novamente mais tarde.';

      toast.error(errorMessage);
    }
  };

  // Função para deletar uma tarefa existente
  const handleDeleteTask = async (id: number) => {
    try {
      const res = await fetch(`/api/tarefas/${id}`, { method: 'DELETE' });

      if (!res.ok) {
        const error = await res.json();

        toast.error(error.message);

        return;
      }

      // Atualiza o estado removendo a tarefa deletada
      setTasks(tasks.filter((task) => task.id !== id));

      toast.success('Tarefa excluída com sucesso!');
    } catch (error) {
      const errorMessage = error instanceof Error 
        ? error.message 
        : 'Ops! Ocorreu um erro inesperado. Tente novamente mais tarde.';

      toast.error(errorMessage);
    }
  };

   // Função para atualizar uma tarefa existente
  const handleUpdateTask = async (updatedTask: TarefaResponse) => {
    try {
      const res = await fetch(`/api/tarefas/${updatedTask.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedTask),
      });

      if (!res.ok) {
        const error = await res.json();

        toast.error(error.message);

        return;
      }

      // Atualiza o estado com a tarefa atualizada
      setTasks(tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)));

      toast.success('Tarefa atualizada com sucesso!');
    } catch (error) {
      const errorMessage = error instanceof Error 
        ? error.message 
        : 'Ops! Ocorreu um erro inesperado. Tente novamente mais tarde.';

      toast.error(errorMessage);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Lista de Tarefas</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white rounded-full p-2 cursor-pointer"
        >
          <span className="sr-only">Adicionar Tarefa</span>
          <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
      {loading ? (
        <p>Loading tasks...</p>
      ) : tasks.length === 0 ? (
        <p>No tasks to display.</p>
      ) : (
        <TaskList tasks={tasks} onDelete={handleDeleteTask} onUpdate={handleUpdateTask} />
      )}
      {isModalOpen && (
        <AddTaskDialog
          onAddTask={handleAddTask}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}