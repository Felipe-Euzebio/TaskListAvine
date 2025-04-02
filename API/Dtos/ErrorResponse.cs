using System.Net;

namespace API.Dtos;

public class ErrorResponse
{
    public HttpStatusCode StatusCode { get; set; }

    public string? Message { get; set; }
}
