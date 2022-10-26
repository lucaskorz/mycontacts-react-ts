import Input from "../../components/Input";
import Select from "../../components/Select";
import Button from "../../components/Button";

import PageHeader from "../../components/PageHeader";
import ContactForm from "../../components/ContactForm";
import { Contact } from "../../models/Contacts";
import ContactsServices from "../../services/ContactsServices";

export default function NewContact() {
  async function handleSubmit(formData: Contact) {
    try {
      const contact = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        category_id: formData.category_id
      }
      console.log(contact)
      const response = await ContactsServices.createContacts(contact)

      console.log(response)
    } catch (error) {
      alert('Ocorreu um erro ao cadastrar o contato!')
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
