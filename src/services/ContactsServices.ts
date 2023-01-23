import { Contact } from "../models/Contacts";
import delay from "../utils/delay";
import HttpClient from "./utils/HttpClient";

class ContactsService {
  httpClient: HttpClient;

  constructor() {
    this.httpClient = new HttpClient('http://localhost:3001')
  }

  listContacts(orderBy: 'asc' | 'desc' = 'asc'): Promise<Contact[]> {
    return this.httpClient.get(`/contacts?orderBy=${orderBy}`)
  }

  getContactById(id: string): Promise<Contact> {
    return this.httpClient.get(`/contacts/${id}`)
  }

  createContact(contact: Contact): Promise<void> {
    return this.httpClient.post(`/contacts`, {
      body: contact as unknown as object as BodyInit
    });
  }

  updateContact(id: string, contact: Contact): Promise<void> {
    return this.httpClient.put(`/contacts/${id}`, {
      body: contact as unknown as object as BodyInit
    });
  }
}

export default new ContactsService()
