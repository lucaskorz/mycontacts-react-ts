import { Contact } from "../../models/Contacts";

class ContactMapper {
  toPersistence(domainContact: Contact) {
    return {
      name: domainContact.name,
      email: domainContact.email,
      phone: domainContact.phone,
      category_id: domainContact.category_id
    }
  }

  // toDomain(persistenceContact: unknown) {
  //   return {}
  // }
}

export default new ContactMapper()
