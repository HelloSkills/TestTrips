<template>
  <div v-if="isOpen" :class="$style.overlay" @click.self="cancel">
    <div :class="$style.modal">
      <div :class="$style.question">
        <span :class="$style.text">{{ message }}</span>
        <div @click="cancel" :class="$style.close">
          <UiSvg name="close" />
        </div>
      </div>
      <div :class="$style.buttons">
        <div @click="cancel" :class="$style.cancelBtn"><span>Нет</span></div>
        <div @click="confirm" :class="$style.confirmBtn"><span>Да</span></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import UiSvg from "@/components/UI/UiSvg.vue"

interface IProps {
  message: string
  isOpen: boolean
}

interface IEmits {
  (event: 'confirm'): void
  (event: 'cancel'): void
}

const props = defineProps<IProps>()
const emit = defineEmits<IEmits>()

const confirm = () => emit('confirm')
const cancel = () => emit('cancel')
</script>

<style lang="scss" module>
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
}

.modal {
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  width: 400px;
  height: 140px;
  text-align: center;
}

.buttons {
  display: flex;
  gap: 15px;
  justify-content: start;
  margin-top: 40px;
}

.confirmBtn, .cancelBtn {
  background-color: #B3C1D1;
  color: #fff;
  height: 40px;
  padding: 8px 16px;
  border-radius: 5px;
  font-size: 14px;
  line-height: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.cancelBtn {
  width: 85px;
}

.confirmBtn {
  background-color: var(--color-blue);
  width: 80px;
}

.question {
  display: flex;
  justify-content: space-between;
}

.text {
  font-weight: 500;
  font-size: 14px;
  line-height: 14px;
  display: flex;
  align-items: center;
  cursor: default;
}

.close {
  height: 20px;
  width: 20px;
  cursor: pointer;
}
</style>
