export const replaceExtension = (fileName: string) => {
  const arr = fileName.split(".")
  const newFileName = [...arr.slice(0, -1), "svg"].join(".")
  if (newFileName === "svg" || newFileName === ".svg") return `${fileName}.svg` 
  return newFileName 
}
