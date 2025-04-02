import { NextRequest, NextResponse } from "next/server";
import { baseApiUrl } from "../route";
import { ErrorResponse, TarefaResponse } from "@/types/tarefa";

// Função para obter uma tarefa específica por ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Extrai o ID da tarefa dos parâmetros presentes na URL da requisição
    const { id } = await params;

    const res = await fetch(`${baseApiUrl}/tarefas/${id}`);

    // Verifica se a API retornou um erro (4xx ou 5xx)
    // Se sim, retorna um erro com o status e a mensagem
    if (!res.ok) {
      const error = await res.json();
  
      const { statusCode, message } = error;
  
      return NextResponse.json<ErrorResponse>(
        { statusCode, message },
        { status: statusCode }
      );
    }

    const data: TarefaResponse = await res.json();

    // Retorna os dados da resposta da API
    return NextResponse.json(data, { status: res.status });
  } catch (error: any) {
    return NextResponse.json<ErrorResponse>(
      { statusCode: 500, message: error.message },
      { status: 500 }
    );
  }
}

// Função para atualizar uma tarefa específica por ID
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
      const { id } = await params;
    
      const task: TarefaResponse = await request.json();
    
      const res = await fetch(`${baseApiUrl}/tarefas/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task),
      });
    
      if (!res.ok) {
        const error = await res.json();
    
        const { statusCode, message } = error;
    
        return NextResponse.json<ErrorResponse>(
          { statusCode, message },
          { status: statusCode }
        );
      }
    
      const data: TarefaResponse = await res.json();
    
      return NextResponse.json(data, { status: res.status });
  } catch (error: any) {
    return NextResponse.json<ErrorResponse>(
      { statusCode: 500, message: error.message },
      { status: 500 }
    );
  }
}

// Função para deletar uma tarefa específica por ID
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
  
    const res = await fetch(`${baseApiUrl}/tarefas/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      const error = await res.json();
  
      const { statusCode, message } = error;
  
      return NextResponse.json<ErrorResponse>(
        { statusCode, message },
        { status: statusCode }
      );
    }
  
    return new NextResponse(null, { status: 204 });
  } catch (error: any) {
    return NextResponse.json<ErrorResponse>(
      { statusCode: 500, message: error.message },
      { status: 500 }
    );
  }
}