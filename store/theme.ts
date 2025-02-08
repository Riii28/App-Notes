import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ThemeState {
    theme: 'light' | 'dark'
    toggleTheme: () => void
    syncTheme: () => void
}

export const useTheme = create<ThemeState>()(
    persist(
        (set, get) => ({
            theme: 'light',
            toggleTheme: async () => {
                try {
                    const newTheme = get().theme === 'light' ? 'dark' : 'light'
                    set({ theme: newTheme })
            
                    const response = await fetch('/api/theme', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ theme: newTheme })
                    })
    
                    if (!response.ok) {
                        console.error('Failed to update theme, server responded with:', response.status)
                        return
                    }

                    const result = await response.json()

                    if (!result.success) {
                        console.error('Update theme failed:', result.message)
                        return
                    }
                } catch (err) {
                    console.error('error in toggle theme:', err)
                }
            },
            syncTheme: async () => {
                try {
                    const response = await fetch('/api/theme', {
                        method: 'GET',
                        headers: { 'Content-Type': 'application/json' },
                        cache: 'no-store'
                    })
            
                    if (!response.ok) {
                        console.error('Failed to fetch theme, server responded with:', response.status)
                        return
                    }
            
                    const result = await response.json()
                
                    if (!result.success) {
                        console.error('Theme sync failed:', result.message)
                        return
                    }
            
                    set({ theme: result.data })
                } catch (err) {
                    console.error('Error in sync theme', err)
                }
            },
        }),
        { name: 'theme-storage' }
    )
)