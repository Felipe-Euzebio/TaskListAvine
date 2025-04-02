import { NextRequest, NextResponse } from "next/server";
import { ErrorResponse, TarefaRequest, TarefaResponse } from "@/types/tarefa";

export const baseApiUrl = process.env.BASE_API_URL!;

export async function GET() {
  try {
      const res = await fetch(`${baseApiUrl}/tarefas`);
    
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

export async function POST(request: NextRequest) {
  try {
      const task: TarefaRequest = await request.json();
    
      const res = await fetch(`${baseApiUrl}/tarefas`, {
        method: "POST",
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
