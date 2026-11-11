import { useRef, useState, type ReactNode } from "react";
import { useSwipeable } from "react-swipeable";

type SwipeableItemProps = {
  children: ReactNode;
  onSwipeRight?: () => void; // leading (Actualizar)
  onSwipeLeft?: () => void; // trailing (Eliminar)
  leadingLabel?: string;
  trailingLabel?: string;
  threshold?: number;
  destructive?: boolean; // si es true, el item sale de pantalla al eliminar
};

export default function SwipeableItem({
  children,
  onSwipeRight,
  onSwipeLeft,
  leadingLabel = "Actualizar",
  trailingLabel = "Eliminar",
  threshold = 120,
  destructive = false,
}: SwipeableItemProps) {
  const [dx, setDx] = useState(0);
  const [removing, setRemoving] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handlers = useSwipeable({
    onSwiping: ({ deltaX }) => {
      if (removing) return;
      setDx(deltaX);
    },
    onSwiped: ({ deltaX }) => {
      if (removing) return;

      // Swipe a la derecha → Actualizar
      if (deltaX > threshold) {
        onSwipeRight?.();
        setDx(0);
        return;
      }

      // Swipe a la izquierda → Eliminar
      if (deltaX < -threshold) {
        if (destructive) {
          const width = containerRef.current?.offsetWidth ?? 500;
          setRemoving(true);
          setDx(-width); // lo saca completamente de la pantalla
          setTimeout(() => onSwipeLeft?.(), 60); // espera la animación
          return;
        }
        onSwipeLeft?.();
      }

      setDx(0);
    },
    trackMouse: true,
    preventScrollOnSwipe: true,
  });

  const isAnimating = dx === 0 || removing;

  return (
    <div ref={containerRef} className="relative overflow-hidden">
      {dx > 0 && (
        <div className="absolute inset-0 flex items-center pl-8 bg-blue-600 text-white font-bold">
          {leadingLabel}
        </div>
      )}

      {dx < 0 && (
        <div className="absolute inset-0 flex items-center justify-end pr-8 bg-red-600 text-white font-bold">
          {trailingLabel}
        </div>
      )}

      <div
        {...handlers}
        className={`relative select-none cursor-grab ${
          isAnimating ? "transition-transform duration-300" : ""
        }`}
        style={{ transform: `translateX(${dx}px)` }}
      >
        {children}
      </div>
    </div>
  );
}
