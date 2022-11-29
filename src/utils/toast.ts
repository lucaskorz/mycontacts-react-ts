import { VariantsType } from "../components/Toast/ToastMessage";
import EventManager from '../lib/EventManager'

type ToastParams = {
  type: VariantsType
  text: string
}

export const toastEventManager = new EventManager()

export default function toast({ type, text }: ToastParams) {
  toastEventManager.emit('addtoast', { type, text })
}
