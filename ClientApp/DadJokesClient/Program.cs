using DadJokesClient.Models;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using System.Text;


var builder = WebApplication.CreateBuilder(args);
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var baseUrl = builder.Configuration.GetValue("JokesApiUrl", "");

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI();
app.UseRouting();


app.MapGet("/", context =>
{
    context.Response.Redirect("/swagger");
    return Task.CompletedTask;
});

app.MapGet("/jokes", async () =>
{
    using (var client = new HttpClient())
    {
        var response = await client.GetAsync($"{baseUrl}/jokes");
        var data = await response.Content.ReadAsStringAsync();
        return data;
    }
});

app.MapPost("/jokes", async (DadJoke data) =>
{
    var content = JsonConvert.SerializeObject(data);
    var stringContent = new StringContent(content, UnicodeEncoding.UTF8, "application/json");

    using (var client = new HttpClient())
    {
        var response = await client.PostAsync($"{baseUrl}/jokes", stringContent);
        var respData = await response.Content.ReadAsStringAsync();
        return respData;
    }
});

app.MapDelete("/jokes/{id}", async (int id) =>
{
    using (var client = new HttpClient())
    {
        var response = await client.DeleteAsync($"{baseUrl}/jokes/{id}");
        var respData = await response.Content.ReadAsStringAsync();
        return respData;
    }
});

app.Run(); 