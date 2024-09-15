import { type SnackBar } from '~/utils/variables/interfaces'

// controls snackbar
export const barControl = (snackBar: SnackBar, message?: string, color?: string) => {
  if (message) snackBar.message = message
  if (color) snackBar.color = color
  snackBar.model = !snackBar.model
  return snackBar
}

// Reorders the object accordingly to the array string
export const reorderObject = <T>(obj: T, order: (keyof T)[]): T => {
  const reordered: Partial<T> = {};
  order.forEach((key) => {
    if (obj.hasOwnProperty(key)) {
      reordered[key] = obj[key];
    }
  });
  return reordered as T;
};

// Convert camel case to lawercase with space between words
export const camelCaseToLowerWithSpaces = (str: string): string => {
  return str.replace(/([A-Z])/g, ' $1').toLowerCase().trim();
}

// Convert boolean to yes no
export const booleanToYesNo = (value: any): string => {
  if (typeof value === "boolean") {
    return value ? "yes" : "no";
  }
  return value
}