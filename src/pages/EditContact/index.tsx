import { useEffect, useRef, useState } from "react";
import { useParams, useHistory } from "react-router";
import ContactForm, { ForwardedReferences } from "../../components/ContactForm";
import PageHeader from "../../components/PageHeader";
import { Contact } from "../../models/Contacts";
import ContactsServices from "../../services/ContactsServices";
import Loader from '../../components/Loader'
import toast from "../../utils/toast";

export default function EditContact() {
  const contactFormRef = useRef<ForwardedReferences>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const history = useHistory()
  const { id } = useParams<{ id: string }>()

  useEffect(() => {
    async function loadContact() {
      try {
        const contact = await ContactsServices.getContactById(id)

        contactFormRef.current?.setFieldsValues(contact)
        setIsLoading(false)
      } catch {
        history.push('/')
        toast({
          type: 'danger',
          text: 'Contato não encontrado!'
        })
      }
    }

    loadContact()
  }, [id, history])

  function handleSubmit(formData?: Contact) {
    //
  }

  return (
    <>
      <Loader isLoading={isLoading} />
      <PageHeader title="Editar Lucas Korz" />

      <ContactForm
        ref={contactFormRef}
        buttonLabel="Salvar alterações"
        onSubmit={handleSubmit}
      />
    </>
  );
}
