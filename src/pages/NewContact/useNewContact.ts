import { useRef } from "react";
import { ForwardedReferences } from "../../components/ContactForm";
import { Contact } from "../../models/Contacts";
import ContactsServices from "../../services/ContactsServices";
import toast from "../../utils/toast";

export default function useNewContact() {
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

  return {
    contactFormRef,
    handleSubmit
  }
}
