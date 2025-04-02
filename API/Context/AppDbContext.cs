using API.Models;
using Microsoft.EntityFrameworkCore;

namespace API.Context;

/** Classe de contexto do banco de dados.
 */
public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    // Define a propriedade de entidade Tarefas.
    public DbSet<Tarefa> Tarefas { get; set; }
}
