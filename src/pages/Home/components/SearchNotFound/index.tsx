import { Container } from "./styles";
import magnifierQuestion from "../../../../assets/images/magnifier-question.svg";

interface SearchNotFoundProps {
  searchTerm: string
}

export default function SearchNotFound({ searchTerm }: SearchNotFoundProps) {
  return (
    <Container>
      <img src={magnifierQuestion} alt="Magnifier question" />

      <span>
        Nenhum resultado foi encontrado para
        <strong> {searchTerm}</strong>.
      </span>
    </Container>
  )
}
