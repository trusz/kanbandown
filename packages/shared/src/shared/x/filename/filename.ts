  
export function convertToFileName(str: string): string {
	str = str
	.replace(/\s+/g, ' ') 			  // Replace all spaces with a single space
	.replace(/[!@#$%^&=*()']+/g, '')  // Remove special characters
	.replace(/[^a-zA-Z0-9.]+/g, '_')  // Replace all non-alphanumeric characters with an underscore
	.replace(/^\.+|\.+(?!\w+$)/g, '') // Remove leading and trailing periods
	.replace(/^_|_$/g, '') 			  // Remove leading and trailing underscores
	.trim()
  
	// Convert the string to lowercase and add the .md extension
	return str.toLowerCase() + '.md';
  }
  

export function removeDuplicateSpaces(str: string): string{
	return str.replace(/\s+/g, ' ').trim();
}