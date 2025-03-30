using Microsoft.AspNetCore.Mvc;
using JournalAPI.Models;
using System.Text.Json;

namespace JournalAPI.Controllers
{
    [ApiController]
    [Route("entries")]
    public class JournalController : ControllerBase
    {
        private const string FilePath = "entries.json";

        [HttpPost]
        public async Task<IActionResult> SaveEntry([FromBody] JournalEntry entry)
        {
            List<JournalEntry> existing = new();

            if (System.IO.File.Exists(FilePath))
            {
                var json = await System.IO.File.ReadAllTextAsync(FilePath);
                existing = JsonSerializer.Deserialize<List<JournalEntry>>(json) ?? new();
            }

            existing.Add(entry);

            var updatedJson = JsonSerializer.Serialize(existing, new JsonSerializerOptions { WriteIndented = true });
            await System.IO.File.WriteAllTextAsync(FilePath, updatedJson);

            return Ok("Saved");
        }

        [HttpGet]
        public async Task<ActionResult<List<JournalEntry>>> GetEntries()
        {
            if (!System.IO.File.Exists(FilePath))
                return new List<JournalEntry>();

            var json = await System.IO.File.ReadAllTextAsync(FilePath);
            var entries = JsonSerializer.Deserialize<List<JournalEntry>>(json) ?? new();
            return entries;
        }
    }
}
