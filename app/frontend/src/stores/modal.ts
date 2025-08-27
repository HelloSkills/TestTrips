// stores/modal.ts
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useModalStore = defineStore('modal', () => {
    const drawerOpen = ref(false)
    const toggleDrawer = () => drawerOpen.value = !drawerOpen.value
    return { drawerOpen, toggleDrawer }
})