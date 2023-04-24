import Button from "../../../../components/Button";
import { Container } from "./styles";

import sad from "../../../../assets/images/sad.svg";

interface ErrorStatusProps {
  onTryAgain: () => void;
}

export default function ErrorStatus({ onTryAgain }: ErrorStatusProps) {
  return (
    <Container>
      <img src={sad} alt="Sad" />
      <div className="details">
        <strong>Ocorreu um erro ao obter os seus contatos!</strong>
        <Button type="button" onClick={onTryAgain}>
          Tentar novamente
        </Button>
      </div>
    </Container>
  );
}
