import { useRef } from "react";
import PageHeader from "../../components/PageHeader";
import ContactForm, { ForwardedReferences } from "../../components/ContactForm";
import { Contact } from "../../models/Contacts";
import ContactsServices from "../../services/ContactsServices";
import toast from "../../utils/toast";

export default function NewContact() {
  const contactFormRef = useRef<ForwardedReferences>(null)

  async function handleSubmit(formData: Contact): Promise<void> {
    try {
      const contact = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        category_id: formData.category_id
      }

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
