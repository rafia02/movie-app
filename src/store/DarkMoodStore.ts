
// import { create } from 'zustand';

// interface DarkModeStore {
//   isDarkMode: boolean;
//   toggleDarkMode: () => void;
// }

// const useDarkModeStore = create<DarkModeStore>((set) => ({
//   isDarkMode: typeof window !== 'undefined' && localStorage.getItem('darkMode') === 'true',
//   toggleDarkMode: () => set((state) => {
//     const newMode = !state.isDarkMode;
//     localStorage.setItem('darkMode', JSON.stringify(newMode));
//     return { isDarkMode: newMode };
//   }),
// }));

// export default useDarkModeStore;




// store/useDarkModeStore.ts
import { create } from 'zustand';

interface DarkModeStore {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  setDarkMode: (value: boolean) => void;
}

const useDarkModeStore = create<DarkModeStore>((set) => ({
  isDarkMode: false, // Default state; will be updated after mount
  toggleDarkMode: () => set((state) => {
    const newMode = !state.isDarkMode;
    localStorage.setItem('darkMode', JSON.stringify(newMode));
    return { isDarkMode: newMode };
  }),
  setDarkMode: (value: boolean) => set({ isDarkMode: value }),
}));

export default useDarkModeStore;

