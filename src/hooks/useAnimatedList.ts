import { useCallback, useState } from "react";
import { ToastContainerProps } from "../components/Toast/ToastContainer";

type RenderListOptions = {
  isLeaving: boolean
}

export default function useAnimatedList(initialValue: ToastContainerProps[] = []) {
  const [items, setItems] = useState<ToastContainerProps[]>(initialValue);
  const [pendingRemovalItemsIds, setpendingRemovalItemsIds] = useState<
    number[]
  >([]);

  const handleRemoveItem = useCallback((id: number) => {
    setpendingRemovalItemsIds((prevState) => [...prevState, id]);
  }, []);

  const handleAnimationEnd = useCallback((id: number) => {
    setItems((prevState) =>
      prevState.filter((item) => item.id !== id)
    );

    setpendingRemovalItemsIds((prevState) =>
      prevState.filter((itemId) => itemId !== id)
    );
  }, [])

  const renderList = useCallback(
    (renderItem: (item: ToastContainerProps, options: RenderListOptions) => JSX.Element) =>
      items.map((item) =>
        renderItem(item, {
          isLeaving: pendingRemovalItemsIds.includes(item.id),
        })
      ),
    [items, pendingRemovalItemsIds]
  );

  return {
    items,
    setItems,
    handleRemoveItem,
    handleAnimationEnd,
    renderList
  }
}
