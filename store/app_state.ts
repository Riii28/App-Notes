import { create } from "zustand";

interface AppState {
    settingState: boolean
    setSettingState: () => void
    selectState: boolean
    setSelectState: () => void
    folderFormState: boolean
    setFolderFormState: () => void
}

export const useAppState = create<AppState>((set) => ({
    settingState: false,
    setSettingState: () => set((state) => ({ settingState: !state.settingState})),

    selectState: false,
    setSelectState: () => set((state) => ({ selectState: !state.selectState })),

    folderFormState: false,
    setFolderFormState: () => set((state) => ({ folderFormState: !state.folderFormState }))
}))