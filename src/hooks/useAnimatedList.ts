import {
  useCallback,
  useRef,
  useState,
  createRef,
  useEffect
} from "react";
import { ToastContainerProps } from "../components/Toast/ToastContainer";

type RenderListOptions = {
  isLeaving: boolean
  animatedRef: React.RefObject<HTMLDivElement>
}

export default function useAnimatedList(initialValue: ToastContainerProps[] = []) {
  const [items, setItems] = useState<ToastContainerProps[]>(initialValue);
  const [pendingRemovalItemsIds, setPendingRemovalItemsIds] = useState<
    number[]
  >([]);

  const animatedRefs = useRef<Map<number, React.RefObject<HTMLDivElement>>>(new Map())
  const animationEndListeners = useRef<Map<number, () => void>>(new Map())

  const handleAnimationEnd = useCallback((itemId: number) => {
    const removeListener = animationEndListeners.current.get(itemId)
    removeListener!()

    animationEndListeners.current.delete(itemId)
    animatedRefs.current.delete(itemId)

    setItems((prevState) =>
      prevState.filter((item) => item.id !== itemId)
    );

    setPendingRemovalItemsIds((prevState) =>
      prevState.filter((id) => id !== itemId)
    );
  }, [])

  useEffect(() => {
    pendingRemovalItemsIds.forEach((itemId) => {
      const animatedRef = animatedRefs.current.get(itemId)
      const animatedElement = animatedRef?.current as HTMLDivElement
      const alreadyHasListeners = animationEndListeners.current.has(itemId)

      if (animatedElement && !alreadyHasListeners) {
        const removeListener = () => {
          animatedElement.removeEventListener('animationend', () => handleAnimationEnd(itemId))
        }

        animatedElement.addEventListener('animationend', () => handleAnimationEnd(itemId))
        animationEndListeners.current.set(itemId, removeListener)
      }
    })
  }, [pendingRemovalItemsIds, handleAnimationEnd])

  useEffect(() => {
    const removeListeners = animationEndListeners.current

    return () => {
      removeListeners.forEach((removeListener) => removeListener())
    }
  }, [])

  const handleRemoveItem = useCallback((id: number) => {
    setPendingRemovalItemsIds((prevState) => [...prevState, id]);
  }, []);

  const getAnimatedRef = useCallback((itemId: number) => {
    let animatedRef = animatedRefs.current.get(itemId)

    if (!animatedRef) {
      animatedRef = createRef()
      animatedRefs.current.set(itemId, animatedRef)
    }

    return animatedRef
  }, [])

  const renderList = useCallback(
    (renderItem: (item: ToastContainerProps, options: RenderListOptions) => JSX.Element) =>
      items.map((item) => {
        const isLeaving = pendingRemovalItemsIds.includes(item.id)
        const animatedRef = getAnimatedRef(item.id)

        return renderItem(item, {
          isLeaving,
          animatedRef
        })
      }),
    [items, pendingRemovalItemsIds, getAnimatedRef]
  );

  return {
    items,
    setItems,
    handleRemoveItem,
    renderList,
    getAnimatedRef
  }
}
