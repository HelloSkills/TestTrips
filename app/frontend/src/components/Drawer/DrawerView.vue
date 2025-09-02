<template>
  <div :class="[$style.overlay, modelValue ? $style.open : '']" @click.self="close">
    <div :class="[$style.drawer, modelValue ? $style.open : '']">
      <div :class="$style.container">
        <div :class="$style.wrap">
          <div :class="$style.title">
            <div :class="$style.create">Создание поездки</div>
            <div @click="close" :class="$style.close">
              <UiSvg name="close" />
            </div>
          </div>
          <div :class="$style.name">
            <input
                v-model="nameTrip"
                type="text"
                placeholder="Введите название поездки"
                :class="$style.inputSearch"
                @keyup.enter="createTrip"
            >
          </div>
          <DrawerSelect ref="selectUsersRef" :isAvia="false"/>
        </div>
        <div :class="$style.createTrip">
          <UiButton
              text="Создать"
              size="large"
              color="blue"
              @click="createTrip"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import UiButton from "@/components/UI/UiButton.vue"
import DrawerSelect from "@/components/Drawer/DrawerSelect.vue"
import UiSvg from '@/components/Ui/UiSvg.vue'
import { ref } from 'vue'
import { useTripsStore } from "@/stores/tripsStore.ts"
import { useUserStore } from "@/stores/userStore.ts"
import { useTripStore } from '@/stores/selectedTripStore'
import { storeToRefs } from 'pinia'
import { useRouter } from "vue-router"
import { useToast } from 'vue-toastification'

interface IProps {
  modelValue: boolean
}
const props = defineProps<IProps>()

interface IEmits {
  (event: 'update:modelValue', value: boolean): void
}
const emit = defineEmits<IEmits>()

const selectUsersRef = ref<InstanceType<typeof SelectUsers> | null>(null)
const nameTrip = ref('')

const tripStore = useTripsStore()
const userStore = useUserStore()
const selectedTripStore = useTripStore()
const router = useRouter()
const { selectedUsers } = storeToRefs(userStore)
const toast = useToast()

const createTrip = async () => {
  if (nameTrip.value.length === 0) {
    toast.info('Необходимо указать название поездки')
    return
  }
  if (selectedUsers.value.length === 0) {
    toast.info('Необходимо указать хотя бы 1 участника поездки')
    return
  }

  const trip = await tripStore.createTrip({
    name: nameTrip.value,
    price: 0,
    passengers: selectedUsers.value,
    services: [],
    status: 'new'
  })

  close()
  selectedTripStore.selectTrip(trip)
  router.push(`/trip/${trip.id}`)
  toast.success(`Поездка успешно создана`)
}

const close = () => {
  emit('update:modelValue', false)
  userStore.clearSelectedUsers()
  nameTrip.value = ''
  selectUsersRef.value?.closeDropdown()
}
</script>

<style lang="scss" module>
.container {
  width: 400px;
  height: 100%;
  background-color: var(--color-gray);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.title {
  height: 60px;
  padding: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background: var(--color-white);
  border-bottom: 1px solid #B3C1D1;
}

.create {
  font-size: 14px;
  line-height: 14px;
  font-weight: 500;
  color: #000000;
}

.name {
  display: flex;
  justify-content: center;
  color: #B3C1D1;
  margin: 27px 0;
}

.inputSearch {
  all: unset;
  border-bottom: 1px solid transparent;
  width: 174px;
  color: black;

  &::placeholder {
    color: #9ca3af;
    font-size: 14px;
    font-weight: 400;
    line-height: 100%;
  }

  &:focus {
    border-bottom: 1px solid var(--color-blue);
  }
}

.inputSearch, .close {
  cursor: pointer;
}

.createTrip {
  border-top: 2px solid #f3f3f3;
  height: 60px;
  padding: 11px 20px;
  background-color: var(--color-white);
  display: flex;
  align-items: center;
}

.createBtn {
  width: 150px;
  height: 40px;
  margin-left: 20px;
  padding: 12px 47px;
  background-color: var(--color-blue);
  color: var(--color-white);
  font-size: 14px;
  line-height: 14px;
  border-radius: 5px;
  cursor: pointer;
}

// --- overlay + drawer ---
.overlay {
  position: fixed;
  inset: 0;
  z-index: 1000;
  pointer-events: none;
}

.overlay.open {
  pointer-events: all;
}

.overlay::before {
  content: '';
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.4);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.overlay.open::before {
  opacity: 1;
}

.drawer {
  position: absolute;
  top: 0;
  right: 0;
  width: 400px;
  height: 100%;
  background-color: var(--color-gray);
  transform: translateX(100%);
  transition: transform 0.7s cubic-bezier(0.25, 1, 0.5, 1);
  z-index: 1;
}

.drawer.open {
  transform: translateX(0);
}
</style>