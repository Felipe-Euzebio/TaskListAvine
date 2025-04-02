using System.Net;
using System.Text.Json.Serialization;

namespace API.Dtos;

/** Classe de resposta de erro da API.
 */
public class ErrorResponse
{
    public HttpStatusCode StatusCode { get; set; }

    public string? Message { get; set; }

    // Ignora a propriedade se o valor for nulo.
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? StackTrace { get; set; }
}
