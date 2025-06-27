const fs = require("fs");

const inputFile = process.argv[2];
const outputFile = process.argv[3];

const issue = JSON.parse(fs.readFileSync(inputFile, "utf-8"));
const body = issue.body;

function extractField(label) {
  const regex = new RegExp(`\\*\\*${label}\\*\\*\\s*\\n([^\\n]+)`, 'i');
  const match = body.match(regex);
  return match ? match[1].trim() : '';
}

const fields = [
  "ADO Organization Name",
  "ADO Project Name",
  "ADO Repository Name",
  "GitHub Organization Name",
  "GitHub Repository Name",
  "Requested By",
  "Are there any pipelines?",
  "Additional Notes"
];

const data = fields.map(f => extractField(f)).join(',');

// write header only if new file
if (!fs.existsSync(outputFile)) {
  fs.writeFileSync(outputFile, fields.join(',') + '\n');
}

fs.appendFileSync(outputFile, data + '\n');

