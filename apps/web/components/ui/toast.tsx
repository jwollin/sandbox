'use client';

import * as React from 'react';
import { X } from 'lucide-react';

import { cn } from '@/lib/utils';

type ToastVariant = 'default' | 'destructive' | 'success';

type Toast = {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  variant?: ToastVariant;
  duration?: number;
};

type ToastInput = Omit<Toast, 'id'> & {
  id?: string;
};

type ToastContextValue = {
  toast: (toast: ToastInput) => string;
  dismiss: (id: string) => void;
};

const ToastContext = React.createContext<ToastContextValue | null>(null);

const toastVariantClassName: Record<ToastVariant, string> = {
  default: 'border-border bg-background text-foreground',
  destructive: 'border-destructive bg-destructive text-destructive-foreground',
  success: 'border-green-600 bg-green-600 text-white',
};

function createToastId() {
  return Math.random().toString(36).slice(2);
}

function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<Toast[]>([]);
  const timers = React.useRef(new Map<string, ReturnType<typeof setTimeout>>());

  const dismiss = React.useCallback((id: string) => {
    const timer = timers.current.get(id);

    if (timer) {
      clearTimeout(timer);
      timers.current.delete(id);
    }

    setToasts((currentToasts) =>
      currentToasts.filter((toast) => toast.id !== id),
    );
  }, []);

  const toast = React.useCallback(
    ({ id = createToastId(), duration = 5000, ...toastInput }: ToastInput) => {
      setToasts((currentToasts) => [
        ...currentToasts.filter((toast) => toast.id !== id),
        { ...toastInput, duration, id },
      ]);

      if (duration > 0) {
        const existingTimer = timers.current.get(id);

        if (existingTimer) {
          clearTimeout(existingTimer);
        }

        timers.current.set(
          id,
          setTimeout(() => {
            dismiss(id);
          }, duration),
        );
      }

      return id;
    },
    [dismiss],
  );

  React.useEffect(
    () => () => {
      timers.current.forEach((timer) => {
        clearTimeout(timer);
      });
      timers.current.clear();
    },
    [],
  );

  return (
    <ToastContext.Provider value={{ toast, dismiss }}>
      {children}
      <ToastViewport toasts={toasts} onDismiss={dismiss} />
    </ToastContext.Provider>
  );
}

function useToast() {
  const context = React.useContext(ToastContext);

  if (!context) {
    throw new Error('useToast must be used within a ToastProvider.');
  }

  return context;
}

function ToastViewport({
  toasts,
  onDismiss,
}: {
  toasts: Toast[];
  onDismiss: (id: string) => void;
}) {
  return (
    <div
      aria-live="polite"
      aria-relevant="additions text"
      className="fixed bottom-4 right-4 z-50 grid w-[calc(100%-2rem)] max-w-sm gap-2"
    >
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onDismiss={onDismiss} />
      ))}
    </div>
  );
}

function ToastItem({
  toast,
  onDismiss,
}: {
  toast: Toast;
  onDismiss: (id: string) => void;
}) {
  const variant = toast.variant ?? 'default';

  return (
    <div
      role={variant === 'destructive' ? 'alert' : 'status'}
      className={cn(
        'relative grid gap-1 rounded-md border p-4 pr-10 text-sm shadow-lg',
        toastVariantClassName[variant],
      )}
    >
      {toast.title ? <div className="font-semibold">{toast.title}</div> : null}
      {toast.description ? (
        <div className="text-sm opacity-90">{toast.description}</div>
      ) : null}
      <button
        type="button"
        className="absolute right-2 top-2 rounded-sm p-1 opacity-70 transition-opacity hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        onClick={() => onDismiss(toast.id)}
        aria-label="Dismiss notification"
      >
        <X className="size-4" />
      </button>
    </div>
  );
}

export { ToastProvider, useToast };
export type { ToastInput, ToastVariant };
