using System.Net;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace API.Dtos;

public class ErrorResponse
{
    public HttpStatusCode StatusCode { get; set; }

    public string? Message { get; set; }

    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? StackTrace { get; set; }
}
