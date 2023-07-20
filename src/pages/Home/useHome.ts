import {
  ChangeEvent,
  useEffect,
  useState,
  useMemo,
  useCallback,
  useDeferredValue
} from "react";
import ContactsServices from "../../services/ContactsServices";
import { Contact } from "../../models/Contacts";

export default function useHome() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [orderBy, setOrderBy] = useState<"asc" | "desc">("asc");
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState<boolean>(false);
  const [contactBeingDeleted, setContactBeingDeleted] = useState<Contact | null>(null);

  const [searchTerm, setSearchTerm] = useState<string>("");
  const deferredSearchTerm = useDeferredValue(searchTerm)

  const filteredContacts = useMemo(
    () =>
      contacts.filter((contact) =>
        contact.name.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [contacts, deferredSearchTerm]
  );

  const loadContacts = useCallback(async (signal: AbortSignal) => {
    try {
      setIsLoading(true);
      const contactsList = await ContactsServices.listContacts(signal, orderBy);

      setHasError(false);
      setContacts(contactsList);
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') return

      setHasError(true);
      setContacts([])
    } finally {
      setIsLoading(false);
    }
  }, [orderBy]);

  useEffect(() => {
    const controller = new AbortController()

    loadContacts(controller.signal);

    return () => {
      controller.abort()
    }
  }, [loadContacts]);

  const handleToggleOrderBy = useCallback(() => {
    setOrderBy((prevState) => (prevState === "asc" ? "desc" : "asc"));
  }, [])

  function handleToggleSearchTerm(event: ChangeEvent<HTMLInputElement>) {
    event?.preventDefault();
    setSearchTerm(event.target.value);
  }

  function handleTryAgain(signal?: AbortSignal) {
    const controller = new AbortController()

    loadContacts(signal || controller.signal);
  }

  const handleDeleteContact = useCallback((contact: Contact) => {
    setContactBeingDeleted(contact);
    setIsDeleteModalVisible(true);
  }, [])

  function handleCloseDeleteModal() {
    setIsDeleteModalVisible(false);
  }

  function handleConfirmDeleteContact(signal?: AbortSignal) {
    ContactsServices.deleteContact(contactBeingDeleted!.id!)

    const controller = new AbortController()
    loadContacts(signal || controller.signal)
    setIsDeleteModalVisible(false);
  }

  return {
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
