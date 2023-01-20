import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router";
import ContactForm from "../../components/ContactForm";
import PageHeader from "../../components/PageHeader";
import { Contact } from "../../models/Contacts";
import ContactsServices from "../../services/ContactsServices";
import Loader from '../../components/Loader'
import toast from "../../utils/toast";

export default function EditContact() {
  const [contact, setContact] = useState<Contact>()
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const history = useHistory()

  const { id } = useParams<{ id: string }>()

  useEffect(() => {
    async function loadContact() {
      try {
        const contactData = await ContactsServices.getContactById(id)
        setContact(contactData)

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
        key={contact?.id}
        buttonLabel="Salvar alterações"
        onSubmit={handleSubmit}
        contact={contact as Contact}
      />
    </>
  );
}
