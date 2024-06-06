import create from "zustand";

interface SearchState {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  errorMessage: string;
  setErrorMessage: (message: string) => void;
  loading: boolean;
  setLoading: (isLoading: boolean) => void;
}

const useSearch = create<SearchState>((set) => ({
  searchQuery: "",
  setSearchQuery: (query) => set((state) => ({ searchQuery: query })),
  errorMessage: "",
  setErrorMessage: (message) => set((state) => ({ errorMessage: message })),
  loading: false,
  setLoading: (isLoading) => set((state) => ({ loading: isLoading })),
}));

export default useSearch;
