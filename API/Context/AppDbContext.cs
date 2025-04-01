﻿using API.Models;
using Microsoft.EntityFrameworkCore;

namespace API.Context;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    public DbSet<Tarefa> Tarefas { get; set; }
}
