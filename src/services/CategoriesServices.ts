import { Categorie } from "../models/Categories";
import { Contact } from "../models/Contacts";
import delay from "../utils/delay";
import CategoryMapper from "./mappers/CategoryMapper";
import HttpClient from "./utils/HttpClient";

class CategoriesService {
  httpClient: HttpClient;

  constructor() {
    this.httpClient = new HttpClient('http://localhost:3001')
  }

  async listCategories(signal: AbortSignal ): Promise<Categorie[]> {
    const categories = await this.httpClient.get('/categories', { signal })

    return categories.map(CategoryMapper.toDomain)
  }
}

export default new CategoriesService()
