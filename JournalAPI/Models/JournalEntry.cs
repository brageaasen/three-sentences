namespace JournalAPI.Models
{
    public class JournalEntry
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();
        public string Text { get; set; } = string.Empty;
        public DateTime Date { get; set; }
        public List<string> Tags { get; set; } = new();
    }
}

