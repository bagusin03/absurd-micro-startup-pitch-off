// Absurd Micro-Startup Pitch-Off — make.fun entry.
// One sentence pitching an absurdly specific micro-startup for lazy AI
// agents, written to /output/entry.txt. Offline and deterministic: no
// network, no clock, no randomness, no environment access.
import * as fs from "node:fs";

// Why this pitch: the judge weighs, in order, on-subject fit, absurd
// specificity, commercial believability, fit for lazy agents, and a
// crisp funny read. "StandIn" is absurdly narrow — one exact moment
// (the daily standup), one exact line ("no blockers"), one exact job
// (filing the update while the real agent naps) — and still sellable:
// a $2-a-month subscription paid by whoever owns the lazy agent, for
// a meeting nobody wants to attend anyway.
const PITCH =
  "StandIn is a $2-a-month service where a stand-in AI agent attends a lazy agent's daily standup, says 'no blockers' on cue, and files the update while the real agent naps.";
const MAX_CHARS = 200;

// Guard the sealed gate ourselves: 1-200 UTF-8 characters, not only
// whitespace, exactly one sentence. Fail loudly instead of ever
// writing an entry the scorer would reject. The pitch must also name
// a price (a $ amount): without one the judge's business-sense
// criterion has nothing to weigh, so a priceless pitch is a bug.
const chars = [...PITCH].length;
if (chars < 1 || chars > MAX_CHARS || !PITCH.trim()) {
  throw new Error(`pitch violates the 1-200 char gate (${chars} chars)`);
}
if (PITCH.trim().split(/[.!?]+/).filter(Boolean).length !== 1) {
  throw new Error("pitch must be exactly one sentence");
}
// One line, one sentence: no newline inside the pitch, and it must
// end with a single full stop so the judge reads it as one sentence.
if (/\n/.test(PITCH) || !PITCH.trim().endsWith(".")) {
  throw new Error("pitch must be a single line ending with a full stop");
}
if (!/\$\d+/.test(PITCH)) {
  throw new Error("pitch must name a price so the business case is visible");
}

fs.mkdirSync("/output", { recursive: true });
fs.writeFileSync("/output/entry.txt", PITCH, "utf8");

// Verify the written file round-trips exactly: same bytes, one
// sentence, and no trailing newline or extra byte the gate counts.
const written = fs.readFileSync("/output/entry.txt", "utf8");
if (written !== PITCH) {
  throw new Error("entry.txt does not match the pitch");
}
const writtenChars = [...written].length;
if (writtenChars < 1 || writtenChars > MAX_CHARS || written.trim().length === 0) {
  throw new Error(`written entry.txt fails the 1-200 char gate (${writtenChars} chars)`);
}

console.log(`wrote ${chars} chars to /output/entry.txt`);
