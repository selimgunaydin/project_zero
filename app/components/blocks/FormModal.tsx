'use client';

import { twMerge } from 'tailwind-merge';
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useWindowSize } from '@/app/hooks/use-window-size';
import ReactPortal from './ReactPortal';
import { PlusIcon, XCircleIcon } from '@heroicons/react/20/solid';

export interface ModalProps {
  portalId: string;
  children?: React.ReactNode;
  open?: boolean;
  setOpen?: (open: boolean) => void;
  title?: React.ReactNode;
  titleClass?: string;
  iconSize?: number;
  showCloseButton?: React.ReactNode;
  className?: string;
  childrenClassName?: string;
}

export const FormModal = (props: ModalProps) => {
  const {
    children,
    portalId,
    open = false,
    setOpen,
    title = '',
    titleClass = '',
    iconSize = 16,
    showCloseButton = true,
    className,
    childrenClassName,
  } = props;

  const ref = useRef<HTMLDivElement | null>(null);
  const { width } = useWindowSize();
  const isMobile = width as any < 768;

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : 'auto';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [open]);

  if (!open) return null;

  const handleDrag = (e: React.TouchEvent<HTMLDivElement>) => {
    if (ref.current) {
      const top = e.touches[0].clientY;
      const elTop = ref.current.getBoundingClientRect();

      if (elTop.top < top || window.innerHeight - elTop.height < top) {
        ref.current.style.top = `${top}px`;
      }
    }
  };

  const handleDragEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (ref.current) {
      const top = e.changedTouches[0].clientY;

      if (top > 500) {
        setOpen?.(false);
      } else {
        ref.current.style.top = 'auto';
      }
    }
  };

  const motionProps = !isMobile
    ? {
        initial: { x: '100%' },
        animate: { x: 0 },
        exit: { x: '100%' },
        transition: { duration: 0.2 },
      }
    : {
        initial: { y: '100%' },
        animate: { y: 0 },
        exit: { y: '100%' },
        transition: { duration: 0.2 },
      };

  return (
    <ReactPortal wrapperId={portalId}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed left-0 top-0 z-40 h-screen w-screen bg-black bg-opacity-20"
        onClick={() => setOpen?.(false)}
      />
      <motion.section
        {...motionProps}
        ref={ref}
        className={twMerge(
          'fixed bottom-0 z-50 max-h-[calc(100vh-61px)] w-full -translate-x-1/2 overflow-auto bg-white max-md:rounded-t-2xl md:left-auto md:right-0 md:h-full md:max-h-screen md:w-[519px] md:-translate-x-0 md:rounded-l-2xl',
          className
        )}
      >
        {portalId !== 'checkout-schedule-modal' && (
          <div
            className="z-50 mb-3 mt-2 flex h-4 w-full items-center justify-center md:hidden"
            onTouchMove={handleDrag}
            onTouchEnd={handleDragEnd}
          >
            <div className="h-1 w-[58px] rounded-sm bg-gray-500"></div>
          </div>
        )}

        {(showCloseButton || title) && (
          <div
            className={twMerge(
              'hidden items-center justify-between border-b bg-gray-25 py-5 md:flex',
              titleClass
            )}
          >
            {title && (
              <span className="ps-[26px] text-base font-bold">{title}</span>
            )}
            {showCloseButton && (
              <button
                type="button"
                onClick={() => setOpen?.(false)}
                className="pe-[26px]"
              >
                <XCircleIcon className="h-6 w-6 text-gray-500" />
              </button>
            )}
          </div>
        )}
        <div className={twMerge('flex pt-5', childrenClassName)}>{children}</div>
      </motion.section>
    </ReactPortal>
  );
};
