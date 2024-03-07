import create from "zustand";

// Define your store
const useSearch = create((set) => ({
  searchQuery: "",
  setSearchQuery: (query) => set((state) => ({ searchQuery: query })),
  errorMessage: "",
  setErrorMessage: (message) => set((state) => ({ errorMessage: message })),
  loading: false,
  setLoading: (isLoading) => set((state) => ({ loading: isLoading })),
}));

export default useSearch;
