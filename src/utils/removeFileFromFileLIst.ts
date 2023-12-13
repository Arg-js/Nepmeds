// Removes file of desired index from the FileList,
// and returns the updated FileList
export const removeFileFromFileList = ({
  index,
  fileList,
}: {
  index: string;
  fileList: FileList;
}) => {
  const dt = new DataTransfer();
  for (let i = 0; i < fileList.length; i++) {
    const file = fileList[i];
    if (+index !== i) dt.items.add(file); // here you exclude the file. thus removing it.
  }
  return dt.files; // Assign the updates list
};
