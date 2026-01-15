import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

const WORKER_URL = process.env.CODEX_WORKER_URL;

if (!WORKER_URL) {
  console.log("Missing CODEX_WORKER_URL in .env");
  process.exit(1);
}

const rl = readline.createInterface({ input, output });

console.log("Codex Assistant (Node.js Terminal Chat)");
console.log('Type Codex questions. Type "exit" to quit.\n');

while (true) {
  const userText = await rl.question("You: ");

  if (userText.trim().toLowerCase() === "exit") {
    console.log("Good luck with your Codex work 👋");
    break;
  }

  const response = await fetch(WORKER_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: userText })
  });

  const data = await response.json();
  console.log(`Assistant: ${data.reply}\n`);
}

rl.close();
