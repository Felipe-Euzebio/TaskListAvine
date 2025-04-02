// Interface para requisição de tarefa
export interface TarefaRequest {
  titulo: string;
  descricao: string;
  prazoEntrega: string;
}

// Interface para resposta de tarefa
export interface TarefaResponse {
  id: number;
  titulo: string;
  descricao: string;
  prazoEntrega: string;
}

// Interface para resposta de erro
export interface ErrorResponse {
  statusCode: number;
  message: string;
}