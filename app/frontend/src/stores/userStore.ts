import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { User } from '@/types/types'
import { getUsers } from '@/composables/useJsonServer'
import { useRouter } from "vue-router"

export const useUserStore = defineStore('user', () => {
    const users = ref<User[]>([])
    const selectedUsers = ref<User[]>([])
    const router = useRouter()

    // Получаем юзеров из useJsonServer
    const loadUsers = async () => {
        users.value = await getUsers()
    }

    // Выбираем пользователя
    const selectUser = (user: User) => {
        if (selectedUsers.value.length >= 10) {
            window.alert('Нельзя выбрать более 10 сотрудников')
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

    // Удаляем выбранных пользователей при закрытии
    const clearSelectedUsers = () => {
        selectedUsers.value = []
    }

    router.afterEach((to) => {
        // Если не переходим на /services, очищаем выбор
        if (to.path !== '/services') {
            clearSelectedUsers()
        }
    })

    // Список доступных (не выбранных) пользователей
    const availableUsers = computed(() => {
        return users.value.filter(
            u => !selectedUsers.value.some(sel => sel.id === u.id)
        )
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
