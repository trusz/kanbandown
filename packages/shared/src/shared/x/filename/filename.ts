


export function convertToFileName(str: string, extension?: string): string {

	const filename = str
		.replace(/\s+/g, " ") 			  // Replace all spaces with a single space
		.replace(/[!@#$%^&=*()']+/g, "")  // Remove special characters
		.replace(/[^a-zA-Z0-9.]+/g, "-")  // Replace all non-alphanumeric characters with an underscore
		.replace(/^\.+|\.+(?!\w+$)/g, "") // Remove leading and trailing periods
		.replace(/^-|-$/g, "") 			  // Remove leading and trailing underscores
		.trim()
  
	const ext = extension || ".md";

	// Convert the string to lowercase and add the .md extension
	return filename.toLowerCase() + ext;
  }
  

export function removeDuplicateSpaces(str: string): string{
	return str.replace(/\s+/g, ' ').trim();
}