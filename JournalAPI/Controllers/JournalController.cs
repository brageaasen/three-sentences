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
    // Auto-generate an Id if missing
    if (string.IsNullOrWhiteSpace(entry.Id))
    {
        entry.Id = Guid.NewGuid().ToString();
    }

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

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateEntry(string id, [FromBody] JournalEntry updatedEntry)
        {
            List<JournalEntry> entries;
            if (System.IO.File.Exists(FilePath))
            {
                var json = await System.IO.File.ReadAllTextAsync(FilePath);
                entries = JsonSerializer.Deserialize<List<JournalEntry>>(json) ?? new List<JournalEntry>();
            }
            else
         {
            return NotFound("No entries found.");
         }

         // Find the index of the entry with the matching id
         var index = entries.FindIndex(e => e.Id == id);
            if (index == -1)
            {
                return NotFound("Entry not found.");
            }

            // Update the entry (you could update just the text or more fields)
            entries[index] = updatedEntry;

            var updatedJson = JsonSerializer.Serialize(entries, new JsonSerializerOptions { WriteIndented = true });
            await System.IO.File.WriteAllTextAsync(FilePath, updatedJson);

            return Ok("Updated");
        }

    }
}
