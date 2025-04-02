namespace API.Models;

/** Classe de modelo de tarefa.
 */
public class Tarefa
{
    public int Id { get; set; }

    public string? Titulo { get; set; }

    public string? Descricao { get; set; }

    public DateTime PrazoEntrega { get; set; }
}
