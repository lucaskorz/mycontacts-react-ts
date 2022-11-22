import { VariantsType } from "../components/Toast/ToastMessage";

type ToastParams = {
  type: VariantsType
  text: string
}

export default function toast({ type, text }: ToastParams) {
  const event = new CustomEvent('addtoast', {
    detail: {
      type,
      text
    }
  });

  document.dispatchEvent(event)
}
