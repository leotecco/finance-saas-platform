import { create } from "zustand";

type OpenTransactionState = {
  id?: string;
  isOpen: boolean;
  onOpen: (id: string) => void;
  onClose: () => void;
};

export const useOpenTransaction = create<OpenTransactionState>((set) => ({
  id: undefined,
  isOpen: false,
  onOpen: (id: string) => set({ id, isOpen: true }),
  onClose: () => set({ id: undefined, isOpen: false }),
}));
