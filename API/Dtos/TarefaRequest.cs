namespace API.Dtos;

/** Classe de requisição de tarefa da API.
 */
public class TarefaRequest
{
    public string? Titulo { get; set; }

    public string? Descricao { get; set; }

    public DateTime PrazoEntrega { get; set; }
}
