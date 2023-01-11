import { VariantsType } from "../components/Toast/ToastMessage";
import EventManager from '../lib/EventManager'

export type ToastParams = {
  type: VariantsType
  text: string
  duration?: number
}

export const toastEventManager = new EventManager()

export default function toast({ type, text, duration }: ToastParams) {
  toastEventManager.emit('addtoast', { type, text, duration })
}
