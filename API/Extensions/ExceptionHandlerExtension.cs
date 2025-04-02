using API.Dtos;
using Microsoft.AspNetCore.Diagnostics;
using System.Net;
using System.Text.Json;

namespace API.Extensions;

/** Classe de extensão para configurar o tratamento global de exceções.
 */
public static class ExceptionHandlerExtension
{
    public static void ConfigureExceptionHandler(this IApplicationBuilder app)
    {
        // Configura o tratamento global de exceções.
        app.UseExceptionHandler(appError =>
        {
            appError.Run(async context =>
            {
                context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                context.Response.ContentType = "application/json";

                var contextFeature = context.Features.Get<IExceptionHandlerFeature>();

                if (contextFeature != null)
                {
                    // Obtém o ambiente de hospedagem.
                    var env = context.RequestServices.GetRequiredService<IWebHostEnvironment>();

                    bool isDevelopment = env.IsDevelopment();

                    // Cria um objeto de resposta de erro.
                    var response = new ErrorResponse
                    {
                        StatusCode = (HttpStatusCode)context.Response.StatusCode,
                        Message = contextFeature.Error.Message,
                        StackTrace = isDevelopment 
                            ? contextFeature.Error.StackTrace?.ToString() 
                            : null
                    };

                    // Configura as opções de serialização JSON.
                    var jsonOptions = new JsonSerializerOptions
                    {
                        PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
                    };

                    // Serializa o objeto de resposta de erro.
                    var json = JsonSerializer.Serialize(response, jsonOptions);

                    // Escreve a resposta de erro no corpo da resposta HTTP.
                    await context.Response.WriteAsync(json);
                }
            });
        });
    }
}
