import type { User } from '@/types/types'
import { ref, computed, watch } from 'vue'
import { useJsonServer } from '@/composables/useJsonServer'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'

// Список всех пользователей
const users = ref<User[]>([])
// Список выбранных пользователем сотрудников
const selectedUsers = ref<User[]>([])

export function useUser() {
    const router = useRouter()
    const toast = useToast()
    const { getUsers } = useJsonServer()

    // Загружаем выбранных пользователей из localStorage при старте
    if (localStorage.getItem('selectedUsers')) {
        try {
            selectedUsers.value = JSON.parse(localStorage.getItem('selectedUsers') || '[]')
        } catch {
            selectedUsers.value = []
        }
    }

    // Следим за изменением selectedUsers и сохраняем в localStorage
    watch(selectedUsers, (currentSelectedUsers) => {
        localStorage.setItem('selectedUsers', JSON.stringify(currentSelectedUsers))
    }, { deep: true })

    // Загружает список всех пользователей с сервера
    const loadUsers = async () => {
        try {
            users.value = await getUsers()
        } catch (err) {
            console.error('Ошибка загрузки пользователей:', err)
            toast.error('Не удалось загрузить список пользователей')
        }
    }

    // Добавляет пользователя в выбранные (selectedUsers)
    const selectUser = (userToSelect: User) => {
        if (selectedUsers.value.length >= 10) {
            toast.info('Нельзя выбрать более 10 сотрудников')

            return
        }
        if (!selectedUsers.value.find(selectedUser => selectedUser.id === userToSelect.id)) {
            selectedUsers.value.push(userToSelect)
        }
    }

    // Удаляет пользователя из выбранных по id
    const deleteUser = (userId: User['id']) => {
        selectedUsers.value = selectedUsers.value.filter(selectedUser => selectedUser.id !== userId)
    }

    // Полностью очищает список выбранных пользователей
    const clearSelectedUsers = () => {
        selectedUsers.value = []
    }

    // Сбрасывает выбранных пользователей при переходе на другую страницу
    router.afterEach((to) => {
        if (to.path !== '/services') {
            clearSelectedUsers()
        }
    })

    // Вычисляемый массив доступных пользователей (не выбранные)
    const availableUsers = computed(() => {

        return users.value.filter(userInList =>
            !selectedUsers.value.some(selectedUser => selectedUser.id === userInList.id)
        )
    })

    return {
        users,                // все пользователи
        selectedUsers,        // выбранные пользователи
        loadUsers,            // загрузка пользователей с сервера
        selectUser,           // выбрать пользователя
        deleteUser,           // удалить пользователя
        availableUsers,       // доступные для выбора пользователи
        clearSelectedUsers    // очистить выбранных пользователей
    }
}
