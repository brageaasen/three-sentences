# 📝 Three Sentences

Three Sentences is a lightweight journaling app that encourages daily reflection by writing just three sentences — no more, no less.
Built with a modern React + Chakra UI frontend, a .NET backend, and wrapped in Electron for a smooth desktop experience.

Too tired to write? Just jot down a few words. Three Sentences helps you reflect without pressure, and lets you explore your mood and patterns over time through visual tools and a calming interface.

---

## Features

- Minimalist UI with light/dark mode
- Auto-growing journal input field
- Add and remove custom tags
- Saves entries locally via .NET API
- Entries are timestamped and stored as JSON
- Clean architecture with modular components

---

## Tech Stack

| Layer     | Tech                           |
|-----------|--------------------------------|
| Frontend  | React + Vite + Chakra UI       |
| Desktop   | Electron                       |
| Backend   | .NET Web API (C#)              |
| Storage   | Local file (`entries.json`)    |

---

## Development

### 1. Clone the repo

```bash
git clone https://github.com/your-username/three-sentences.git
cd three-sentences
```

### 2. Start the backend
```bash
cd JournalAPI
dotnet run
```

### 3. Start the frontend
```bash
cd electron-app
npm install
npm run dev
```

---

## Test the API
- POST http://localhost:5235/entries — Save a new journal entry
- GET http://localhost:5235/entries — Get all saved entries

Data is stored in JournalAPI/entries.json.

---

## Planned Improvements
- See github issues tab
