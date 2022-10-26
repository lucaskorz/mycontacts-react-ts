import ContactForm from "../../components/ContactForm";
import PageHeader from "../../components/PageHeader";
import { Contact } from "../../models/Contacts";

export default function EditContact() {
  return (
    <>
      <PageHeader title="Editar Lucas Korz" />

      <ContactForm
        buttonLabel="Salvar alterações"
        onSubmit={function (formData: Contact): Promise<void> {
          throw new Error("Function not implemented.");
        }}
      />
    </>
  );
}
