import Button from "../Button";
import ReactPortal from "../ReactPortal";
import { Overlay, Container, Footer } from "./styles";
import useAnimatedUnmount from "../../hooks/useAnimatedUnmount";

interface IModalProps extends IModalRequiredProps, IModalOptionalProps {}

interface IModalOptionalProps {
  danger: boolean;
  cancelLabel?: string;
  confirmLabel: string;
}

interface IModalRequiredProps {
  title: string;
  children?: React.ReactNode;
  visible: boolean;
  onCancel: () => void
  onConfirm: () => void
}
function Modal({
  children = null,
  danger = false,
  title,
  cancelLabel = 'Cancelar',
  confirmLabel = 'Confirmar',
  onCancel,
  onConfirm,
  visible
}: IModalProps) {
  const { shouldRender, animatedElementRef } = useAnimatedUnmount(visible)

  if (!shouldRender) return null

  return (
    <ReactPortal containerId="modal-root">
      <Overlay isLeaving={!visible} ref={animatedElementRef}>
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

export default Modal;
