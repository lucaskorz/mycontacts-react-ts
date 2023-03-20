import ContactForm, { ForwardedReferences } from "../../components/ContactForm";
import PageHeader from "../../components/PageHeader";
import Loader from '../../components/Loader'
import { Contact } from "../../models/Contacts";

interface PresentationProps {
  isLoading: boolean
  contactName: string
  contactFormRef: React.RefObject<ForwardedReferences>
  onSubmit: (contact: Contact) => Promise<void>
}

export default function Presentation({
  isLoading,
  contactName,
  contactFormRef,
  onSubmit
}: PresentationProps) {
  return (
    <>
      <Loader isLoading={isLoading} />
      <PageHeader title={isLoading ? 'Carregando... ' : `Editar ${contactName}`} />

      <ContactForm
        ref={contactFormRef}
        buttonLabel="Salvar alterações"
        onSubmit={onSubmit}
      />
    </>
  );
}
