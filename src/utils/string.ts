// Convert "hello_world" to "Hello World" and "helloWorld" to "Hello World
export function convertToTitleCase(inputString: string) {
  return inputString
    .split("_")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
