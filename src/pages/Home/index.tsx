import Loader from "../../components/Loader";
import useHome from "./useHome";
import { Container } from "./styles";
import InputSearch from "./components/InputSearch";
import Header from "./components/Header";
import ErrorStatus from "./components/ErrorStatus";
import EmptyList from "./components/EmptyList";
import SearchNotFound from "./components/SearchNotFound";
import ContactsList from "./components/ContactsList";
import Modal from "../../components/Modal";

export default function Home() {
  const {
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
    handleDeleteContact,
  } = useHome();

  return (
    <Container>
      <Loader isLoading={isLoading} />

      {contacts.length > 0 && (
        <InputSearch value={searchTerm} onChange={handleToggleSearchTerm} />
      )}

      <Header
        hasError={hasError}
        qtyOfContacts={contacts.length}
        qtyOfFilteredContacts={filteredContacts.length}
      />

      {hasError && <ErrorStatus onTryAgain={handleTryAgain} />}

      {!hasError && (
        <>
          {contacts.length < 1 && !isLoading && <EmptyList />}

          {contacts.length > 0 && filteredContacts.length < 1 && (
            <SearchNotFound searchTerm={searchTerm} />
          )}

          <ContactsList
            filteredContacts={filteredContacts}
            orderBy={orderBy}
            onToggleOrderBy={handleToggleOrderBy}
            onDeleteContact={handleDeleteContact}
          />

          <Modal
            title={`Tem certeza que deseja remover o contato ${contactBeingDeleted?.name}?`}
            confirmLabel="Deletar"
            onCancel={handleCloseDeleteModal}
            onConfirm={handleConfirmDeleteContact}
            visible={isDeleteModalVisible}
            danger
          >
            <p>Esta ação não poderá ser desfeita!</p>
          </Modal>
        </>
      )}
    </Container>
  );
}
