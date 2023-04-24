import { Link } from "react-router-dom";
import arrow from "../../../../assets/images/icons/arrow.svg";
import edit from "../../../../assets/images/icons/edit.svg";
import trash from "../../../../assets/images/icons/trash.svg";
import { Contact } from "../../../../models/Contacts";
import Modal from "../../../../components/Modal";
import { Card, ListHeader } from "./styles";

interface ContactsListProps {
  filteredContacts: Contact[]
  orderBy: string
  onToggleOrderBy: () => void
  onDeleteContact: (contact: Contact) => void
}

export default function ContactsList({
  filteredContacts,
  orderBy,
  onToggleOrderBy,
  onDeleteContact,
}: ContactsListProps) {
  return (
    <>
      {filteredContacts.length > 0 && (
        <ListHeader orderBy={orderBy}>
          <button type="button" onClick={onToggleOrderBy}>
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
              {contact.category.name && <small>{contact.category.name}</small>}
            </div>
            <span>{contact.email}</span>
            <span>{contact.phone}</span>
          </div>

          <div className="actions">
            <Link to={`/edit/${contact.id}`}>
              <img src={edit} alt="edit" />
            </Link>
            <button onClick={() => onDeleteContact(contact)} type="button">
              <img src={trash} alt="edit" />
            </button>
          </div>
        </Card>
      ))}
    </>
  );
}
