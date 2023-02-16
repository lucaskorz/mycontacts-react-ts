import { useEffect, useRef, useState } from "react";
import { useParams, useHistory } from "react-router";
import ContactForm, { ForwardedReferences } from "../../components/ContactForm";
import PageHeader from "../../components/PageHeader";
import { Contact } from "../../models/Contacts";
import ContactsServices from "../../services/ContactsServices";
import Loader from '../../components/Loader'
import toast from "../../utils/toast";
import useSafeAsyncAction from "../../hooks/useSafeAsyncAction";

export default function EditContact() {
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

  async function handleSubmit(formData: Contact): Promise<void> {
    try {
      const contact = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        category_id: formData.category_id
      }

     const contactData = await ContactsServices.updateContact(id, contact)

      setContactName(formData.name)
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
    }
  }

  return (
    <>
      <Loader isLoading={isLoading} />
      <PageHeader title={isLoading ? 'Carregando... ' : `Editar ${contactName}`} />

      <ContactForm
        ref={contactFormRef}
        buttonLabel="Salvar alterações"
        onSubmit={handleSubmit}
      />
    </>
  );
}
