export interface TarefaRequest {
    titulo: string;
    descricao: string;
    prazoEntrega: string;
}

export interface TarefaResponse {
    id: number;
    titulo: string;
    descricao: string;
    prazoEntrega: string;
}

export interface ErrorResponse {
    statusCode: number;
    message: string;
}