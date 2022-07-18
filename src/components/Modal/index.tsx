import Button from "../Button";
import { Overlay, Container, Footer } from "./styles";

interface IModalProps extends IModalRequiredProps, IModalOptionalProps {}

interface IModalOptionalProps {
  danger: boolean;
}

interface IModalRequiredProps {
  title: string;
  bodyModel: string;
}

const defaultProps: IModalOptionalProps = {
  danger: false,
};

function Modal({ bodyModel, danger, title }: IModalProps) {
  return (
    <Overlay>
      <Container danger={danger}>
        <h1>{title}</h1>
        <p>{bodyModel}</p>
        <Footer>
          <button type="button" className="cancel-button">
            Cancelar
          </button>
          <Button danger={danger} type="button">
            Deletar
          </Button>
        </Footer>
      </Container>
    </Overlay>
  );
}

Modal.defaultProps = defaultProps;

export default Modal;
