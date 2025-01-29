import { create } from "zustand";

interface AppState {
    activePage: string
    setActivePage: (page: string) => void
    settingState: boolean
    setSettingState: () => void
}

export const useAppState = create<AppState>((set) => ({
    activePage: '/',
    setActivePage: (page) => set({ activePage: page }), 

    settingState: false,
    setSettingState: () => set((state) => ({ settingState: !state.settingState})),
}))