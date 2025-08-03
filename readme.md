# 🛡️ CodelabS Checker

**Area:** Backend (API Development)  
**Technologies:** Node.js + Express.js  
**Status:** 🚧 In development

Welcome, Codelaber! This is the **CodelabS Checker** project — a RESTful API developed to fight the chronic misspelling of the **USP CodeLab** group's name.

## 📋 Description

Everyone knows that **USP CodeLab** is the best extension group at USP. But unfortunately, many people keep getting the name wrong:

> `CodelabS`, `Cod lab`, `Code labe`, `Codalab`, `Codeleb`...

This project was created to **monitor**, **log**, and **analyze** those name errors in a fun and structured way.

---

## 🚀 Features

| Feature | Method and Route        | Description |
|---------|-------------------------|-------------|
| ✅ Name verification | `POST /verificar` | Verifies if a submitted name is valid (present in the database). Saves incorrect entries for statistics. |
| ➕ Register valid names | `POST /nomes/validos` | Adds new valid spellings of "Codelab" to the database. |
| 🎲 Generate incorrect names | `GET /nomes/aleatorio` | Returns a randomly generated incorrect name. |
| 📊 Error statistics | `GET /estatisticas/erros` | Lists the top 5 most frequently submitted incorrect names. |

---

## 💡 How it works

The API uses local `.json` files as a simple database:

- `nomes_corretos.json`: Valid name spellings.
- `corretos.json`: Log of correct submissions.
- `incorretos.json`: Log of incorrect submissions.

---

## 🧠 Example Workflow

1. A client sends a `POST /verificar` request with a name.
2. If the name is in `nomes_corretos.json`, it’s saved as correct.
3. Otherwise, it’s logged in `incorretos.json` with a timestamp.
4. Later, `GET /estatisticas/erros` returns the most common mistakes.

---

## ⚙️ Getting Started

### 1. Prerequisites

- [Node.js](https://nodejs.org/) installed

### 2. Install dependencies

```bash
npm install
```

### 3. (Optional) Install nodemon for development

```bash
npm install -D nodemon
```

### 4. Run the server

```bash
npm run dev   # with nodemon
# or
npm start     # without nodemon
```

The server will be available at:  
📍 `http://localhost:3000`

---

## 🔁 API Endpoints

### `GET /`
Returns a simple message confirming the API is running.

### `POST /verificar`
Checks whether a submitted name is valid. Example payload:

```json
{
  "nome": "Codelab"
}
```

### `POST /nomes/validos`
Adds new valid names to the database. Example payload:

```json
{
  "nome": ["USPCodeLab", "codelab"]
}
```

### `GET /nomes/aleatorio`
Returns a randomly generated invalid name.

### `GET /estatisticas/erros`
Returns the 5 most common incorrect names and how many times each appeared.

---

## 🔧 JSON File Structures

### nomes_corretos.json
```json
{
  "nomes_corretos": ["codelab", "uspcodeLab"]
}
```

### incorretos.json
```json
{
  "incorretos": [
    { "nome": "codelabs", "data": "2025-08-01T11:21:11.562Z" }
  ],
  "qntd_incorretos": 1
}
```

---

## 🧪 API Testing Tools

We recommend using [Insomnia](https://insomnia.rest/) or [Postman](https://www.postman.com/) to test the endpoints.

---

## 📚 Learning Resources

- [USP CodeLab Node.js course](#)
- [Express documentation](https://expressjs.com/)
- [What is a REST API? (YouTube)](https://www.youtube.com/watch?v=vGuqKIRWosk)
- [How to use Insomnia](https://www.youtube.com/watch?v=EVfKyj0H8s0)

---

## 👨‍💻 Developed by

Bruno Zuffo  
[GitHub](https://github.com/BrunoZuffo) · [LinkedIn](https://www.linkedin.com/in/bruno-zuffo-10088b216/)

---

## 📎 License

This project was developed for educational purposes inside the USP CodeLab community.  
Feel free to explore and expand upon it!

---

## 📣 Final Tip

Mistakes can be valuable learning moments — and now, even spelling mistakes generate insights! 🚀