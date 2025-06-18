import React, {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  useEffect,
  useMemo,
  useRef,
  useState,
  useCallback,
} from "react";

export interface CardSwapProps {
  width?: number | string;
  height?: number | string;
  cardDistance?: number;
  verticalDistance?: number;
  delay?: number;
  pauseOnHover?: boolean;
  onCardClick?: (idx: number, url?: string) => void;
  skewAmount?: number;
  easing?: "linear" | "elastic";
  children: React.ReactNode;
}

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  customClass?: string;
  repoUrl?: string;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ customClass, children, repoUrl, ...rest }, ref) => (
    <div
      ref={ref}
      {...rest}
      className={`absolute top-1/2 left-1/2 rounded-xl border border-gray-300 bg-white shadow-lg p-4 cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 ${customClass ?? ""} ${rest.className ?? ""}`.trim()}
    >
      {children}
      {repoUrl && (
        <div className="absolute bottom-2 right-2 opacity-50">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 2C5.58 2 2 5.58 2 10c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0018 10c0-4.42-3.58-8-8-8z" clipRule="evenodd" />
          </svg>
        </div>
      )}
    </div>
  )
);
Card.displayName = "Card";

interface Slot {
  x: number;
  y: number;
  z: number;
  zIndex: number;
}

const makeSlot = (
  i: number,
  distX: number,
  distY: number,
  total: number
): Slot => ({
  x: i * distX,
  y: -i * distY,
  z: -i * distX * 0.5,
  zIndex: total - i,
});

const CardSwap: React.FC<CardSwapProps> = ({
  width = 300,
  height = 200,
  cardDistance = 40,
  verticalDistance = 50,
  delay = 3000,
  pauseOnHover = false,
  onCardClick,
  skewAmount = 3,
  easing = "elastic",
  children,
}) => {
  const childArr = useMemo(
    () => Children.toArray(children) as React.ReactElement<CardProps>[],
    [children]
  );

  const [order, setOrder] = useState<number[]>(
    Array.from({ length: childArr.length }, (_, i) => i)
  );
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<number | undefined>(null);

  const swap = useCallback(() => {
    if (order.length < 2 || isAnimating) return;

    setIsAnimating(true);
    const [front, ...rest] = order;

    // Move front card to back after animation
    setTimeout(() => {
      setOrder([...rest, front]);
      setIsAnimating(false);
    }, 800);
  }, [order, isAnimating]);

  useEffect(() => {
    if (isPaused) return;

    intervalRef.current = window.setInterval(swap, delay);
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [delay, isPaused, swap]);

  const handleMouseEnter = () => {
    if (pauseOnHover) {
      setIsPaused(true);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }
  };

  const handleMouseLeave = () => {
    if (pauseOnHover) {
      setIsPaused(false);
    }
  };

  const getCardStyle = (orderIndex: number) => {
    const slot = makeSlot(orderIndex, cardDistance, verticalDistance, childArr.length);
    const isFront = orderIndex === 0;
    const isAnimatingOut = isAnimating && isFront;

    return {
      width,
      height,
      transform: `translate(-50%, -50%) translate3d(${slot.x}px, ${slot.y + (isAnimatingOut ? 400 : 0)}px, ${slot.z}px) skewY(${orderIndex * skewAmount}deg)`,
      zIndex: slot.zIndex,
      opacity: isAnimatingOut ? 0 : 1,
      transition: isAnimatingOut
        ? easing === "elastic"
          ? 'all 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)'
          : 'all 0.8s ease-in-out'
        : easing === "elastic"
          ? 'all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)'
          : 'all 0.6s ease-in-out',
    };
  };

  const rendered = childArr.map((child, originalIndex) => {
    const orderIndex = order.indexOf(originalIndex);
    if (orderIndex === -1) return null;

    return isValidElement<CardProps>(child)
      ? cloneElement(child, {
        key: originalIndex,
        style: {
          ...getCardStyle(orderIndex),
          ...(child.props.style ?? {}),
        },
        onClick: (e: React.MouseEvent<HTMLDivElement>) => {
          e.preventDefault();
          const repoUrl = child.props.repoUrl;
          if (repoUrl) {
            window.open(repoUrl, '_blank', 'noopener,noreferrer');
          }
          child.props.onClick?.(e);
          onCardClick?.(originalIndex, repoUrl);
        },
      } as CardProps)
      : child;
  });

  return (
    <div
      className="relative"
      style={{
        width,
        height,
        perspective: '1000px',
        transformStyle: 'preserve-3d'
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {rendered}
    </div>
  );
};

export default CardSwap;
