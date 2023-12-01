// Convert "hello_world" to "Hello World" and "helloWorld" to "Hello World and "ABC" to "Abc"
export function convertToTitleCase(inputString: string) {
  return inputString
    .toLowerCase()
    .split(/[_\s]/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
