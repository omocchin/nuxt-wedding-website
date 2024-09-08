import { type SnackBar } from '~/utils/variables/interfaces'

// controls snackbar
export const barControl = (snackBar: SnackBar, message?: string, color?: string) => {
  if (message) snackBar.message = message
  if (color) snackBar.color = color
  snackBar.model = !snackBar.model
  return snackBar
}
