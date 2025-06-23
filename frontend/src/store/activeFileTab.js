import { create } from 'zustand';

export const useActiveFileTabStore = create((set) => ({
    activeFileTab: null,
    setActiveFileTab: (path, value, extension) =>
        set({
            activeFileTab: { path, value, extension },
        }),
}));