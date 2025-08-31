<template>
  <div v-if="isOpen" :class="$style.overlay" @click.self="cancel">
    <div :class="$style.modal">
      <div :class="$style.question">
        <span :class="$style.text">{{ message }}</span>
        <UiSvg name="close" @click="cancel" :class="$style.close"/>
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
import UiSvg from "@/components/UI/UiSvg.vue";

const props = defineProps<{
  message: string
  isOpen: boolean
}>()

const emit = defineEmits<{
  (e: 'confirm'): void
  (e: 'cancel'): void
}>()

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
  background-color: #4361EE;
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
