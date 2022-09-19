import {
  ChangeEvent,
  useEffect,
  useState,
  useMemo
} from "react";
import { Link } from "react-router-dom";
import arrow from "../../assets/images/icons/arrow.svg";
import edit from "../../assets/images/icons/edit.svg";
import trash from "../../assets/images/icons/trash.svg";
import sad from "../../assets/images/sad.svg";
import { Contact } from "../../models/Contacts";
import Loader from "../../components/Loader";

import {
  Container,
  Header,
  Card,
  InputSearchContainer,
  ListHeader,
  ErrorContainer,
} from "./styles";
import ContactsServices from "../../services/ContactsServices";
import Button from "../../components/Button";

export default function Home() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [orderBy, setOrderBy] = useState<"asc" | "desc">("asc");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const filteredContacts = useMemo(
    () =>
      contacts.filter((contact) =>
        contact.name.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [contacts, searchTerm]
  );

  useEffect(() => {
    async function loadContacts() {
      try {
        setIsLoading(true);

        const contactsList = await ContactsServices.listContacts(orderBy);

        setHasError(false);
        setContacts(contactsList);
      } catch (error) {
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    }

    loadContacts();
  }, [orderBy]);

  function handleToggleOrderBy() {
    setOrderBy((prevState) => (prevState === "asc" ? "desc" : "asc"));
  }

  function handleToggleSearchTerm(event: ChangeEvent<HTMLInputElement>) {
    event?.preventDefault();
    setSearchTerm(event.target.value);
  }

  return (
    <Container>
      <Loader isLoading={isLoading} />

      <InputSearchContainer>
        <input
          type="text"
          value={searchTerm}
          placeholder="Pesquise pelo nome..."
          onChange={handleToggleSearchTerm}
        ></input>
      </InputSearchContainer>

      <Header hasError={hasError}>
        {!hasError && (
          <strong>
            {filteredContacts.length <= 0 ? "Nenhum " : contacts.length}
            {filteredContacts.length > 1 ? " contatos" : " contato"}
          </strong>
        )}
        <Link to="/new">Novo contato</Link>
      </Header>

      {filteredContacts.length > 0 && (
        <ListHeader orderBy={orderBy}>
          <button type="button" onClick={handleToggleOrderBy}>
            <span>Nome</span>
            <img src={arrow} alt="Arrow" />
          </button>
        </ListHeader>
      )}

      {hasError && (
        <ErrorContainer>
          <img src={sad} alt="Sad" />
          <div className="details">
            <strong>
              Ocorreu um erro ao obter os seus contatos!
            </strong>
            <Button type="button">
              Tentar novamente
            </Button>
          </div>
        </ErrorContainer>
      )}

      {filteredContacts.map((contact: Contact) => (
        <Card key={contact.id}>
          <div className="info">
            <div className="contact-name">
              <strong>{contact.name}</strong>
              {contact.category_name && <small>{contact.category_name}</small>}
            </div>
            <span>{contact.email}</span>
            <span>{contact.phone}</span>
          </div>

          <div className="actions">
            <Link to={`/edit/${contact.id}`}>
              <img src={edit} alt="edit" />
            </Link>
            <button type="button">
              <img src={trash} alt="edit" />
            </button>
          </div>
        </Card>
      ))}
    </Container>
  );
}
