import { useRef } from "react";
import PageHeader from "../../components/PageHeader";
import ContactForm, { ForwardedReferences } from "../../components/ContactForm";
import { Contact } from "../../models/Contacts";
import ContactsServices from "../../services/ContactsServices";
import toast from "../../utils/toast";
import ContactMapper from "../../services/mappers/ContactMapper";

export default function NewContact() {
  const contactFormRef = useRef<ForwardedReferences>(null)

  async function handleSubmit(contact: Contact): Promise<void> {
    try {
      await ContactsServices.createContact(contact)

      contactFormRef.current?.resetFields!()
      toast({
        text: 'Contato cadastrado com sucesso!',
        type: 'success',
        duration: 3000
      })
    } catch (error) {
      toast({
        text: 'Ocorreu um erro ao cadastrar o contato!',
        type: 'danger'
      })
    }
  }

  return (
    <>
      <PageHeader title="Novo contato" />

      <ContactForm
        ref={contactFormRef}
        buttonLabel="Cadastrar"
        onSubmit={handleSubmit}
      />
    </>
  );
}
