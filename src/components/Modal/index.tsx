import { useEffect, useState } from "react";
import Button from "../Button";
import ReactPortal from "../ReactPortal";
import { Overlay, Container, Footer } from "./styles";

interface IModalProps extends IModalRequiredProps, IModalOptionalProps {}

interface IModalOptionalProps {
  danger: boolean;
  cancelLabel: string;
  confirmLabel: string;
}

interface IModalRequiredProps {
  title: string;
  children: React.ReactNode;
  visible: boolean;
  onCancel: () => void
  onConfirm: () => void
}

const defaultProps: IModalOptionalProps = {
  danger: false,
  cancelLabel: 'Cancelar',
  confirmLabel: 'Confirmar'
};

function Modal({
  children,
  danger,
  title,
  cancelLabel,
  confirmLabel,
  onCancel,
  onConfirm,
  visible
}: IModalProps) {
  const [shouldRender, setShouldRender] = useState<boolean>(visible)

  useEffect(() => {
    if (visible) setShouldRender(true)

    let timeoutId: NodeJS.Timeout;
    if (!visible) {
      timeoutId = setTimeout(() => setShouldRender(false), 300)
    }

    return () => {
      clearTimeout(timeoutId)
    }
  }, [visible])

  if (!shouldRender) {
    return null
  }

  return (
    <ReactPortal containerId="modal-root">
      <Overlay isLeaving={!visible}>
        <Container
          danger={danger}
          isLeaving={!visible}
        >
          <h1>{title}</h1>

          <div className="modal-body">{children}</div>

          <Footer>
            <button
              type="button"
              className="cancel-button"
              onClick={onCancel}
            >
              {cancelLabel}
            </button>

            <Button
              danger={danger}
              type="button"
              onClick={onConfirm}
            >
              {confirmLabel}
            </Button>
          </Footer>
        </Container>
      </Overlay>
    </ReactPortal>
  );
}

Modal.defaultProps = defaultProps;

export default Modal;
