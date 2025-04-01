namespace API.Models;

public class Tarefa
{
    public int Id { get; set; }

    public string? Titulo { get; set; }

    public string? Descricao { get; set; }

    public DateTime PrazoEntrega { get; set; }
}
