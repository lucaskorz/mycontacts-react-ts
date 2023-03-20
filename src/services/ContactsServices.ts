import { Contact } from "../models/Contacts";
import delay from "../utils/delay";
import ContactMapper from "./mappers/ContactMapper";
import HttpClient from "./utils/HttpClient";

class ContactsService {
  httpClient: HttpClient;

  constructor() {
    this.httpClient = new HttpClient('http://localhost:3001')
  }

  async listContacts(orderBy: 'asc' | 'desc' = 'asc'): Promise<Contact[]> {
    const contacts = await this.httpClient.get(`/contacts?orderBy=${orderBy}`)

    return contacts.map(ContactMapper.toDomain)
  }

  async getContactById(id: string): Promise<Contact> {
    const contact = await this.httpClient.get(`/contacts/${id}`)

    return ContactMapper.toDomain(contact)
  }

  createContact(contact: Contact): Promise<void> {
    const bodyContact = ContactMapper.toPersistence(contact)
    return this.httpClient.post(`/contacts`, {
      body: bodyContact as unknown as object as BodyInit
    });
  }

  updateContact(id: string, contact: Contact): Promise<void> {
    const bodyContact = ContactMapper.toPersistence(contact)
    return this.httpClient.put(`/contacts/${id}`, {
      body: bodyContact as unknown as object as BodyInit
    });
  }

  deleteContact(id: number): Promise<void> {
    return this.httpClient.delete(`/contacts/${id}`)
  }
}

export default new ContactsService()
