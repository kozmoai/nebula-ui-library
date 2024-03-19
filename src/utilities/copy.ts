import { showToast } from '@kozmoai/nebula-design'

export function copyToClipboard(text: string, message: string = 'Copied to clipboard!'): void {
  navigator.clipboard.writeText(text)

  showToast(message, 'success')
}