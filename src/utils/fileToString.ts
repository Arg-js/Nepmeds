import { ChangeEvent } from "react";

export const fileToString = (
  e: ChangeEvent<HTMLInputElement>
): Promise<string | null> => {
  const file = e.target.files?.[0];
  if (file) {
    return new Promise<string | null>(resolve => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result as string | null);
      };
      reader.readAsDataURL(file);
    });
  }

  return Promise.resolve(null);
};
