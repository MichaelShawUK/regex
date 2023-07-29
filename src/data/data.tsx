function insertIntoText(text: string, matches: string[]) {
  checkMatches(text, matches);
  for (const match of matches) {
    text = text.replace("SW@P", match);
  }
  return text;
}

function checkMatches(text: string, matches: string[]) {
  const placeholders = text.match(/SW@P/g)?.length;
  const matchCount = matches.length;
  if (placeholders !== matchCount) {
    throw new Error(
      `Expected ${placeholders} strings to match but received ${matchCount}.`
    );
  }
}

const data = [
  {
    type: "find",
    instructions:
      "UK mobile phone numbers are made up of 11 digits and begin with 07xxx xxxxxx. For international calls the first zero is replaced with +44. Find a regular expression that matches the different formats a UK mobile phone number can take.",
    matches: [
      "07123456789",
      "07123 456789",
      "+447123456789",
      "+44 7123 456789",
    ],
    get text() {
      const text = `SW@P
SW@P
SW@P
SW@P
0712345678
071234567890
07123 45678
+44712345678`;
      return insertIntoText(text, this.matches);
    },
  },
];

console.log(data[0].text);
