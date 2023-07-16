import { useEffect, useRef, useState } from "react";
import { useParams, useHistory } from "react-router";
import { ForwardedReferences } from "../../components/ContactForm";
import { Contact } from "../../models/Contacts";
import ContactsServices from "../../services/ContactsServices";
import toast from "../../utils/toast";
import useSafeAsyncAction from "../../hooks/useSafeAsyncAction";

export default function useEditContact() {
  const contactFormRef = useRef<ForwardedReferences>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [contactName, setContactName] = useState<string>("")

  const history = useHistory()
  const { id } = useParams<{ id: string }>()
  const safeAsyncAction = useSafeAsyncAction()

  useEffect(() => {
    const controller = new AbortController()

    async function loadContact() {
      try {
        const contact = await ContactsServices.getContactById(
          id,
          controller.signal
        )

        safeAsyncAction(() => {
          contactFormRef.current?.setFieldsValues!(contact)
          setIsLoading(false)
          setContactName(contact.name)
        })
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') return

        safeAsyncAction(() => {
          history.push('/')
          toast({
            type: 'danger',
            text: 'Contato não encontrado!'
          })
        })
      }
    }

    loadContact()

    return () => controller.abort();
  }, [id, history, safeAsyncAction])

  async function handleSubmit(contact: Contact): Promise<void> {
    try {
      setIsLoading(true)
      await ContactsServices.updateContact(id, contact)

      setContactName(contact.name)
      toast({
        text: 'Contato editado com sucesso!',
        type: 'success',
        duration: 3000
      })
    } catch (error) {
      toast({
        text: 'Ocorreu um erro ao editar o contato!',
        type: 'danger'
      })
    } finally {
      setIsLoading(false)
    }
  }

  return {
    isLoading,
    contactName,
    contactFormRef,
    handleSubmit
  };
}
