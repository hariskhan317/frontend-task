import create from 'zustand';

const useStore = create((set) => ({
  formula: '',
  tags: [],
  setFormula: (formula) => set({ formula }),
  addTag: (tag) => set((state) => ({ tags: [...state.tags, tag] })),
  removeTag: (index) => set((state) => ({ tags: state.tags.filter((_, i) => i !== index) })),
}));

export default useStore;
