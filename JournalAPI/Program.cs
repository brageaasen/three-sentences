using System.Text.Json;

var builder = WebApplication.CreateBuilder(args);

// Add CORS service
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.WithOrigins("http://localhost:5173") // frontend address
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

// CORS middleware
app.UseCors();

app.MapPost("/save", async (SentenceEntry entry) =>
{
    var filePath = "entries.json";
    List<SentenceEntry> existing = [];

    if (File.Exists(filePath))
    {
        var json = await File.ReadAllTextAsync(filePath);
        existing = JsonSerializer.Deserialize<List<SentenceEntry>>(json) ?? [];
    }

    existing.Add(entry);
    await File.WriteAllTextAsync(filePath, JsonSerializer.Serialize(existing, new JsonSerializerOptions { WriteIndented = true }));

    return Results.Ok("Saved.");
});

app.Run();

record SentenceEntry(string Text, DateTime Date);

