import { create } from "zustand";

interface AppState {
    settingState: boolean
    setSettingState: () => void
    selectState: boolean
    setSelectState: () => void
    folderFormState: boolean
    setFolderFormState: () => void
    moveToState: boolean
    setMoveToState: () => void
    selectedNote: string | null
    setSelectedNote: (id: string | null) => void
    deleteFolderState: boolean
    setDeleteFolderState: () => void
    confirmState: boolean
    setConfirmState: () => void
}

export const useAppState = create<AppState>((set) => ({
    settingState: false,
    setSettingState: () => set((state) => ({ settingState: !state.settingState})),

    selectState: false,
    setSelectState: () => set((state) => ({ selectState: !state.selectState, moveToState: false })),

    folderFormState: false,
    setFolderFormState: () => set((state) => ({ folderFormState: !state.folderFormState })),

    moveToState: false,
    setMoveToState: () => set((state) => ({ moveToState: !state.moveToState, settingState: false, selectState: false })),

    selectedNote: null,
    setSelectedNote: (id) => set({ selectedNote: id }),

    deleteFolderState: false,
    setDeleteFolderState: () => set((state) => ({ deleteFolderState: !state.deleteFolderState })),

    confirmState: false,
    setConfirmState: () => set((state) => ({ confirmState: !state.confirmState, settingState: false }))
}))