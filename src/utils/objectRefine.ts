/*
Remove any key that has empty string as value (goes one level deep)
e.g. 
{
    user: {
        one: "",
        two:"2"
    }
}

will return
{
    user: {
        two:"2"
    }
}

*/

type AnyObject = Record<string, any>;

export function removeEmptyProperties(obj: AnyObject): AnyObject {
  for (const prop in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, prop)) {
      if (typeof obj[prop] === "object") {
        // Recursively remove empty properties in nested objects
        obj[prop] = removeEmptyProperties(obj[prop]);

        // If the nested object is now empty, remove the property
        if (Object.keys(obj[prop]).length === 0) {
          delete obj[prop];
        }
      } else if (
        obj[prop] === null ||
        obj[prop] === undefined ||
        obj[prop] === ""
      ) {
        // Remove null, undefined, or empty string properties
        delete obj[prop];
      }
    }
  }
  return obj;
}
