import { ref, watch } from 'vue'

export function useDrawer() {
    const isOpen = ref(false)

    const toggle = () => isOpen.value = !isOpen.value
    const open = () => isOpen.value = true
    const close = () => isOpen.value = false

    // Скрываем скролл при открытой модалке
    watch(isOpen, (val) => {
        document.documentElement.classList.toggle('no-scroll', val)
    })

    return {
        isOpen,
        open,
        close,
        toggle
    }
}