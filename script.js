// ---------- Starting data ----------
let notes = [
  { id: 1, text: "Buy milk and bread", category: "personal" },
  { id: 2, text: "Finish the Day 3 assignment", category: "study" },
  { id: 3, text: "Email the project report to Grace", category: "work" },
  { id: 4, text: "Revise JavaScript arrays", category: "study" },
  { id: 5, text: "Call mum", category: "personal" },
];

const CATEGORIES = ["personal", "work", "study"];

// ---------- Functions ----------

// Returns notes whose text contains the word, ignoring case.
function searchNotes(word) {
  const search = word.toLowerCase();
  return notes.filter((note) => note.text.toLowerCase().includes(search));
}

// Returns the note with the most characters, or null if there are none.
function longestNote() {
  if (notes.length === 0) {
    return null;
  }
  let longest = notes[0];
  for (const note of notes) {
    if (note.text.length > longest.text.length) {
      longest = note;
    }
  }
  return longest;
}

// Returns an object counting notes per category.
function countByCategory() {
  const counts = {};
  for (const note of notes) {
    if (counts[note.category] === undefined) {
      counts[note.category] = 0;
    }
    counts[note.category]++;
  }
  return counts;
}

// Returns a sentence such as "5 notes: 2 personal, 1 work, 2 study."
function getSummary() {
  const total = notes.length;
  const noun = total === 1 ? "note" : "notes";
  if (total === 0) {
    return `0 ${noun}.`;
  }
  const counts = countByCategory();
  const parts = [];
  for (const category of CATEGORIES) {
    if (counts[category]) {
      parts.push(`${counts[category]} ${category}`);
    }
  }
  return `${total} ${noun}: ${parts.join(", ")}.`;
}

// Lower-cases, trims and collapses repeated spaces so texts can be compared.
function normalise(text) {
  return text.trim().replace(/\s+/g, " ").toLowerCase();
}

// Returns true if a note with the same text already exists.
function isDuplicate(text) {
  const wanted = normalise(text);
  return notes.some((note) => normalise(note.text) === wanted);
}

// Adds a note if valid. Returns true when added, false otherwise.
function addNote(text, category) {
  const cleaned = typeof text === "string" ? text.trim() : "";

  if (cleaned.length < 1 || cleaned.length > 200) {
    console.log("Not added: text must be 1 to 200 characters.");
    return false;
  }
  if (isDuplicate(cleaned)) {
    console.log("Not added: a note with that text already exists.");
    return false;
  }
  if (!CATEGORIES.includes(category)) {
    console.log("Not added: category must be personal, work or study.");
    return false;
  }

  const newId = notes.length > 0 ? Math.max(...notes.map((n) => n.id)) + 1 : 1;
  notes.push({ id: newId, text: cleaned, category: category });
  console.log(`Added note ${newId}.`);
  return true;
}

// ---------- Tests ----------

// searchNotes
console.log("searchNotes('MILK'):", searchNotes("MILK"));
// [ { id: 1, text: "Buy milk and bread", category: "personal" } ]
console.log("searchNotes('the'):", searchNotes("the"));
// 2 notes: id 2 ("Finish the Day 3 assignment") and id 3 ("Email the project report to Grace")
console.log("searchNotes('holiday'):", searchNotes("holiday"));
// [] (no matches)

// longestNote
console.log("longestNote():", longestNote());
// { id: 3, text: "Email the project report to Grace", category: "work" }
const savedNotes = notes;
notes = [];
console.log("longestNote() with no notes:", longestNote());
// null
notes = savedNotes;

// countByCategory
console.log("countByCategory():", countByCategory());
// { personal: 2, study: 2, work: 1 }
notes = [];
console.log("countByCategory() with no notes:", countByCategory());
// {}
notes = savedNotes;

// getSummary
console.log("getSummary():", getSummary());
// 5 notes: 2 personal, 1 work, 2 study.
notes = [{ id: 1, text: "Only note", category: "work" }];
console.log("getSummary() with one note:", getSummary());
// 1 note: 1 work.
notes = savedNotes;

// isDuplicate
console.log("isDuplicate('  call   MUM '):", isDuplicate("  call   MUM "));
// true (ignores case and extra spaces)
console.log("isDuplicate('Walk the dog'):", isDuplicate("Walk the dog"));
// false

// addNote
console.log("addNote('Walk the dog', 'personal'):", addNote("Walk the dog", "personal"));
// Added note 6.  then  true
console.log("addNote('walk the dog', 'personal'):", addNote("walk the dog", "personal"));
// Not added: a note with that text already exists.  then  false
console.log("addNote('', 'work'):", addNote("", "work"));
// Not added: text must be 1 to 200 characters.  then  false
console.log("addNote(201 characters, 'work'):", addNote("a".repeat(201), "work"));
// Not added: text must be 1 to 200 characters.  then  false
console.log("addNote('Plan holiday', 'fun'):", addNote("Plan holiday", "fun"));
// Not added: category must be personal, work or study.  then  false
console.log("addNote('Read chapter 4', 'study'):", addNote("Read chapter 4", "study"));
// Added note 7.  then  true

// Summary after the two successful additions
console.log("getSummary() after adding:", getSummary());
// 7 notes: 3 personal, 1 work, 3 study.
