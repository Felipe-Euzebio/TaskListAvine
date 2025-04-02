using API.Dtos;
using Microsoft.AspNetCore.Diagnostics;
using System.Net;
using System.Text.Json;

namespace API.Extensions;

public static class ExceptionHandlerExtension
{
    public static void ConfigureExceptionHandler(this IApplicationBuilder app)
    {
        app.UseExceptionHandler(appError =>
        {
            appError.Run(async context =>
            {
                context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                context.Response.ContentType = "application/json";

                var contextFeature = context.Features.Get<IExceptionHandlerFeature>();

                if (contextFeature != null)
                {
                    var env = context.RequestServices.GetRequiredService<IWebHostEnvironment>();

                    bool isDevelopment = env.IsDevelopment();

                    var response = new ErrorResponse
                    {
                        StatusCode = (HttpStatusCode)context.Response.StatusCode,
                        Message = contextFeature.Error.Message,
                        StackTrace = isDevelopment ? contextFeature.Error.StackTrace?.ToString() : null
                    };

                    var jsonOptions = new JsonSerializerOptions
                    {
                        PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
                    };

                    var json = JsonSerializer.Serialize(response, jsonOptions);

                    await context.Response.WriteAsync(json);
                }
            });
        });
    }
}
