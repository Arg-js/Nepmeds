export const imageToBase64 = async (image: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onloadend = (): void => {
      const base64String: string = (reader.result as string).split(",")[1];
      resolve(base64String);
    };
    reader.onerror = (): void => {
      console.error("Failed to convert the image to base64.");
      reject(new Error("Failed to convert the image to base64."));
    };
  });
};
