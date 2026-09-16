import { create } from 'zustand';

interface TransactionsUiState {
  selectedCategoryId: string | null;
  isFormOpen: boolean;
  editingTransactionId: string | null;

  setSelectedCategory: (id: string | null) => void;
  openForm: (editingId?: string) => void;
  closeForm: () => void;
}

export const useTransactionsUiStore = create<TransactionsUiState>((set) => ({
  selectedCategoryId: null,
  isFormOpen: false,
  editingTransactionId: null,

  setSelectedCategory: (id) => set({ selectedCategoryId: id }),
  openForm: (editingId) =>
    set({ isFormOpen: true, editingTransactionId: editingId ?? null }),
  closeForm: () => set({ isFormOpen: false, editingTransactionId: null }),
}));