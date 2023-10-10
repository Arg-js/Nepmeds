export function getArray(inputString: string) {
  // Remove extra spaces and split the string into words and returns array
  return inputString.trim().split(/\s+/);
}

// Function that trims 1st 20words from string and returns the length of the 1st 20 words for maxWords = 20
export function calcMaxWordsLen({
  inputString,
  maxWords,
}: {
  inputString: string;
  maxWords: number;
}) {
  const truncatedWordsLen = getArray(inputString)
    .slice(0, maxWords)
    .join(" ").length;

  return truncatedWordsLen;
}
