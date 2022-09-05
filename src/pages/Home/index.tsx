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
import { Contact } from "../../models/Contacts";

import {
  Container,
  Header,
  Card,
  InputSearchContainer,
  ListHeader,
} from "./styles";

export default function Home() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [orderBy, setOrderBy] = useState<string>("asc");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const filteredContacts = useMemo(() =>
      contacts.filter((contact) =>
        contact.name.toLowerCase().includes(searchTerm.toLowerCase())
      ), [contacts, searchTerm]
  );

  useEffect(() => {
    fetch(`http://localhost:3001/contacts?orderBy=${orderBy}`)
      .then(async (response) => {
        const json = await response.json();
        setContacts(json);
      })
      .catch((error: Error) => {
        console.log("error: ", error);
      });
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
      <InputSearchContainer>
        <input
          type="text"
          value={searchTerm}
          placeholder="Pesquise pelo nome..."
          onChange={handleToggleSearchTerm}
        ></input>
      </InputSearchContainer>

      <Header>
        <strong>
          {filteredContacts.length <= 0 ? "Nenhum " : contacts.length}
          {filteredContacts.length > 1 ? " contatos" : " contato"}
        </strong>
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
