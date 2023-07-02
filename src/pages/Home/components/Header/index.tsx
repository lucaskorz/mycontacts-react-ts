import { Link } from "react-router-dom";
import { Container } from "./styles";
import { Contact } from "../../../../models/Contacts";

interface HeaderProps {
  hasError: boolean;
  qtyOfContacts: number;
  qtyOfFilteredContacts: number;
}

export default function Header({
  hasError,
  qtyOfContacts,
  qtyOfFilteredContacts,
}: HeaderProps) {
  const alignment = hasError
    ? "flex-end"
    : qtyOfContacts > 0
    ? "space-between"
    : "center";

  return (
    <Container justifyContent={alignment}>
      {!hasError && qtyOfContacts > 0 && (
        <strong>
          {qtyOfFilteredContacts <= 0 ? "Nenhum " : qtyOfContacts}
          {qtyOfFilteredContacts > 1 ? " contatos" : " contato"}
        </strong>
      )}

      {!hasError && <Link to="/new">Novo contato</Link>}
    </Container>
  );
}
