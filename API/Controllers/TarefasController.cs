using API.Context;
using API.Dtos;
using API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Net;

namespace API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class TarefasController : ControllerBase
{
    // Contexto do banco de dados.
    private readonly AppDbContext _context;

    public TarefasController(AppDbContext context)
    {
        _context = context;
    }

    // Rota para obter todas as tarefas.
    [HttpGet]
    public async Task<ActionResult<IEnumerable<TarefaResponse>>> Get()
    {
        var response = await _context.Tarefas
            .Select(tarefa => new TarefaResponse
            {
                Id = tarefa.Id,
                Titulo = tarefa.Titulo,
                Descricao = tarefa.Descricao,
                PrazoEntrega = tarefa.PrazoEntrega
            })
            .ToListAsync();

        return Ok(response);
    }

    // Rota para obter uma tarefa por ID.
    [HttpGet("{id}")]
    public async Task<ActionResult<TarefaResponse>> Get(int id)
    {
        var tarefa = await _context.Tarefas.FindAsync(id);

        // Verifica se a tarefa existe. Caso contrário, retorna um erro 404.
        if (tarefa == null) return NotFound(new ErrorResponse
        {
            StatusCode = HttpStatusCode.NotFound,
            Message = "Tarefa não encontrada"
        });

        return Ok(new TarefaResponse
        {
            Id = tarefa.Id,
            Titulo = tarefa.Titulo,
            Descricao = tarefa.Descricao,
            PrazoEntrega = tarefa.PrazoEntrega
        });
    }

    // Rota para criar uma nova tarefa.
    [HttpPost]
    public async Task<ActionResult<TarefaResponse>> Post(TarefaRequest request)
    {
        var tarefa = new Tarefa
        {
            Titulo = request.Titulo,
            Descricao = request.Descricao,
            PrazoEntrega = request.PrazoEntrega
        };

        _context.Tarefas.Add(tarefa);

        await _context.SaveChangesAsync();

        var response = new TarefaResponse
        {
            Id = tarefa.Id,
            Titulo = tarefa.Titulo,
            Descricao = tarefa.Descricao,
            PrazoEntrega = tarefa.PrazoEntrega
        };

        return CreatedAtAction(nameof(Get), new { id = tarefa.Id }, response);
    }

    // Rota para atualizar uma tarefa por ID.
    [HttpPut("{id}")]
    public async Task<ActionResult<TarefaResponse>> Put(int id, TarefaRequest request)
    {
        var tarefa = await _context.Tarefas.FindAsync(id);

        if (tarefa == null) return NotFound(new ErrorResponse
        {
            StatusCode = HttpStatusCode.NotFound,
            Message = "Tarefa não encontrada"
        });

        tarefa.Titulo = request.Titulo;
        tarefa.Descricao = request.Descricao;
        tarefa.PrazoEntrega = request.PrazoEntrega;

        await _context.SaveChangesAsync();

        var response = new TarefaResponse
        {
            Id = tarefa.Id,
            Titulo = tarefa.Titulo,
            Descricao = tarefa.Descricao,
            PrazoEntrega = tarefa.PrazoEntrega
        };

        return Ok(response);
    }

    // Rota para deletar uma tarefa por ID.
    [HttpDelete("{id}")]
    public async Task<ActionResult> Delete(int id)
    {
        var tarefa = await _context.Tarefas.FindAsync(id);

        if (tarefa == null) return NotFound(new ErrorResponse
        {
            StatusCode = HttpStatusCode.NotFound,
            Message = "Tarefa não encontrada"
        });

        _context.Tarefas.Remove(tarefa);

        await _context.SaveChangesAsync();

        return NoContent();
    }
}
