import Input from "../../components/Input";
import Select from "../../components/Select";
import Button from "../../components/Button";

import PageHeader from "../../components/PageHeader";
import ContactForm from "../../components/ContactForm";
import { Contact } from "../../models/Contacts";
import ContactsServices from "../../services/ContactsServices";
import toast from "../../utils/toast";

export default function NewContact() {
  async function handleSubmit(formData: Contact): Promise<void> {
    try {
      const contact = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        category_id: formData.category_id
      }

      await ContactsServices.createContacts(contact)

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
        buttonLabel="Cadastrar"
        onSubmit={handleSubmit}
      />
    </>
  );
}
