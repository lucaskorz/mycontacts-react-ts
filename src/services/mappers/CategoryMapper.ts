import { Categorie } from "../../models/Categories";

class CategoryMapper {
  toDomain(persistenceCategory: Categorie) {
    return {
      id: persistenceCategory.id,
      name: persistenceCategory.name
    }
  }

  toPersistence(domain: Categorie) {
    return {
      id: domain.id,
      name: domain.name
    }
  }
}

export default new CategoryMapper()
