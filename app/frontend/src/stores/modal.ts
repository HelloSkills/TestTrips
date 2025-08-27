// stores/modal.ts
import { defineStore } from 'pinia'
import {ref, watch} from 'vue'

export const useModalStore = defineStore('modal', () => {
    const drawerOpen = ref(false)
    const toggleDrawer = () => drawerOpen.value = !drawerOpen.value

    // костыль для того, чтобы скрывать скролл при открытой модалке
    watch(drawerOpen, (val) => {
        if (val) {
            document.documentElement.classList.add('no-scroll')
        } else {
            document.documentElement.classList.remove('no-scroll')
        }
    })
    return { drawerOpen, toggleDrawer }
})