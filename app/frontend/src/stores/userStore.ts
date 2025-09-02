import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useJsonServer } from '@/composables/useJsonServer'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import type { User } from '@/types/types'

export const useUserStore = defineStore('user', () => {
    const users = ref<User[]>([])
    const selectedUsers = ref<User[]>([])
    const router = useRouter()
    const toast = useToast()

    const { getUsers } = useJsonServer()

    // Получаем юзеров через composable
    const loadUsers = async () => {
        try {
            users.value = await getUsers()
        } catch (err) {
            console.error('Ошибка загрузки пользователей:', err)
            toast.error('Не удалось загрузить список пользователей')
        }
    }

    // Выбираем пользователя
    const selectUser = (user: User) => {
        if (selectedUsers.value.length >= 10) {
            toast.info('Нельзя выбрать более 10 сотрудников')
            return
        }
        if (!selectedUsers.value.find(u => u.id === user.id)) {
            selectedUsers.value.push(user)
        }
    }

    // Удаляем пользователя
    const deleteUser = (id: User['id']) => {
        selectedUsers.value = selectedUsers.value.filter(u => u.id !== id)
    }

    // Очищаем выбранных пользователей
    const clearSelectedUsers = () => {
        selectedUsers.value = []
    }

    // Очистка при переходе на другую страницу
    router.afterEach((to) => {
        if (to.path !== '/services') {
            clearSelectedUsers()
        }
    })

    // Доступные пользователи (не выбранные)
    const availableUsers = computed(() => {
        return users.value.filter(u => !selectedUsers.value.some(sel => sel.id === u.id))
    })

    return {
        users,
        selectedUsers,
        loadUsers,
        selectUser,
        deleteUser,
        availableUsers,
        clearSelectedUsers
    }
})
