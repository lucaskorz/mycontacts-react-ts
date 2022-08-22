import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import arrow from "../../assets/images/icons/arrow.svg";
import edit from "../../assets/images/icons/edit.svg";
import trash from "../../assets/images/icons/trash.svg";
import { Contact } from "../../models/Contacts";

import {
  Container,
  Header,
  ListContainer,
  Card,
  InputSearchContainer,
} from "./styles";

export default function Home() {
  const [contacts, setContacts] = useState<Contact[]>([]);

  useEffect(() => {
    fetch("http://localhost:3001/contacts")
      .then(async (response) => {
        const json = await response.json();
        setContacts(json);
      })
      .catch((error: any) => {
        console.log("erro: ", error);
      });
  }, []);

  return (
    <Container>
      <InputSearchContainer>
        <input type="text" placeholder="Pesquise pelo nome..."></input>
      </InputSearchContainer>

      <Header>
        <strong>
          {contacts.length <= 0 ? "Nenhum " : contacts.length}
          {contacts.length > 1 ? " contatos" : " contato"}
        </strong>
        <Link to="/new">Novo contato</Link>
      </Header>

      <ListContainer>
        <header>
          <button type="button">
            <span>Nome</span>
            <img src={arrow} alt="Arrow" />
          </button>
        </header>
      </ListContainer>
      {contacts.map((contact: Contact) => (
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
