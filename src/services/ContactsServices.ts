import { Contact } from "../models/Contacts";
import delay from "../utils/delay";
import HttpClient from "./utils/HttpClient";

class ContactsService {
  httpClient: HttpClient;

  constructor() {
    this.httpClient = new HttpClient('http://localhost:3001')
  }

  async listContacts(orderBy: 'asc' | 'desc' = 'asc'): Promise<Contact[]> {
    return this.httpClient.get(`/contacts?orderBy=${orderBy}`)
  }

  async createContacts(contact: Contact) {
    return this.httpClient.post<Contact>(`/contacts`, {
      body: contact as unknown as object as BodyInit
    })
  }
}

export default new ContactsService()
