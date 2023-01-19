import { Categorie } from "../models/Categories";
import { Contact } from "../models/Contacts";
import delay from "../utils/delay";
import HttpClient from "./utils/HttpClient";

class CategoriesService {
  httpClient: HttpClient;

  constructor() {
    this.httpClient = new HttpClient('http://localhost:3001')
  }

  listCategories(): Promise<Categorie[]> {
    return this.httpClient.get('/categories')
  }
}

export default new CategoriesService()
