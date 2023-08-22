export function getArray(inputString: string) {
  // Remove extra spaces and split the string into words and returns array
  return inputString.trim().split(/\s+/);
}

// Function that trims 1st 20words from string and returns the length of the 1st 20 words
export function calMaxLen(inputString: string, maxWords: number) {
  const truncatedWordsLen = getArray(inputString)
    .slice(0, maxWords)
    .join(" ").length;

  return truncatedWordsLen;
}
