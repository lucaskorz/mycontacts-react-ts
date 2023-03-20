import { useEffect, useRef, useState } from "react";
import { useParams, useHistory } from "react-router";
import { ForwardedReferences } from "../../components/ContactForm";
import { Contact } from "../../models/Contacts";
import ContactsServices from "../../services/ContactsServices";
import toast from "../../utils/toast";
import useSafeAsyncAction from "../../hooks/useSafeAsyncAction";
import Presentation from "./Presentation"

export default function Container() {
  const contactFormRef = useRef<ForwardedReferences>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [contactName, setContactName] = useState<string>("")

  const history = useHistory()
  const { id } = useParams<{ id: string }>()
  const safeAsyncAction = useSafeAsyncAction()

  useEffect(() => {
    async function loadContact() {
      try {
        const contact = await ContactsServices.getContactById(id)

        safeAsyncAction(() => {
          contactFormRef.current?.setFieldsValues!(contact)
          setIsLoading(false)
          setContactName(contact.name)
        })
      } catch {
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
      console.log(error)
      toast({
        text: 'Ocorreu um erro ao editar o contato!',
        type: 'danger'
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Presentation
      isLoading={isLoading}
      contactName={contactName}
      contactFormRef={contactFormRef}
      onSubmit={handleSubmit}
    />
  );
}
