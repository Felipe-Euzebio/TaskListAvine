import { NextRequest, NextResponse } from "next/server";
import { baseApiUrl } from "../route";
import { ErrorResponse, TarefaResponse } from "@/types/tarefa";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const res = await fetch(`${baseApiUrl}/tarefas/${id}`);

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
