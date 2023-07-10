import {
  ChangeEvent,
  useEffect,
  useState,
  useMemo,
  useCallback,
  useTransition
} from "react";
import ContactsServices from "../../services/ContactsServices";
import { Contact } from "../../models/Contacts";

export default function useHome() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [orderBy, setOrderBy] = useState<"asc" | "desc">("asc");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState<boolean>(false);
  const [contactBeingDeleted, setContactBeingDeleted] = useState<Contact | null>(null);
  const [filteredContacts, setFilteredContacts] = useState<Contact[]>([])

  const [isPending, startTransition] = useTransition()

  // const filteredContacts = useMemo(
  //   () =>
  //     contacts.filter((contact) =>
  //       contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  //     ),
  //   [contacts, searchTerm]
  // );

  const loadContacts = useCallback(async () => {
    try {
      setIsLoading(true);
      const contactsList = await ContactsServices.listContacts(orderBy);

      setHasError(false);
      setContacts(contactsList);
      setFilteredContacts(contactsList)
    } catch (error) {
      setHasError(true);
      setContacts([])
    } finally {
      setIsLoading(false);
    }
  }, [orderBy]);

  useEffect(() => {
    loadContacts();
  }, [loadContacts]);

  const handleToggleOrderBy = useCallback(() => {
    setOrderBy((prevState) => (prevState === "asc" ? "desc" : "asc"));
  }, [])

  function handleToggleSearchTerm(event: ChangeEvent<HTMLInputElement>) {
    event?.preventDefault();

    const { value } = event.target;
    setSearchTerm(value);

    startTransition(() => {
      setFilteredContacts(contacts.filter((contact) =>
        contact.name.toLowerCase().includes(value.toLowerCase())
      ))
    })
  }

  function handleTryAgain() {
    loadContacts();
  }

  const handleDeleteContact = useCallback((contact: Contact) => {
    setContactBeingDeleted(contact);
    setIsDeleteModalVisible(true);
  }, [])

  function handleCloseDeleteModal() {
    setIsDeleteModalVisible(false);
  }

  function handleConfirmDeleteContact() {
    ContactsServices.deleteContact(contactBeingDeleted!.id!)
    loadContacts()
    setIsDeleteModalVisible(false);
  }

  return {
    isPending,
    isLoading,
    isDeleteModalVisible,
    contactBeingDeleted,
    handleCloseDeleteModal,
    handleConfirmDeleteContact,
    contacts,
    searchTerm,
    handleToggleSearchTerm,
    hasError,
    handleTryAgain,
    filteredContacts,
    orderBy,
    handleToggleOrderBy,
    handleDeleteContact
  }
}
