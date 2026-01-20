"use client";

import { useState } from "react";

export function AIChatBox() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    if (!question.trim()) return;
    setLoading(true);
    setAnswer("");
    try {
      const res = await fetch("/api/ask-doubt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "AI failed");
      setAnswer(data.answer);
    } catch (err: any) {
      setAnswer(err.message ?? "Request failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="border rounded-lg bg-white/40 p-4">
      <h3 className="font-semibold">AI Assistant</h3>
      <p className="text-sm text-muted-foreground">Ask quick questions about your studies.</p>
      <textarea
        className="w-full mt-3 rounded border p-2 min-h-[80px]"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Type a question..."
      />
      <div className="flex gap-2 mt-2">
        <button onClick={handleSubmit} disabled={loading} className="px-3 py-1 rounded bg-slate-900 text-white">
          {loading ? 'Thinking...' : 'Ask AI'}
        </button>
        <button onClick={() => { setQuestion(''); setAnswer(''); }} className="px-3 py-1 rounded border">Clear</button>
      </div>
      {answer && (
        <div className="mt-3 rounded border p-3 bg-white/50">
          <pre className="whitespace-pre-wrap text-sm">{answer}</pre>
        </div>
      )}
    </div>
  );
}
