<template>
  <p-select v-model="internalValue" :options="options" class="color-mode-select">
    <template #option="{ option }">
      <ColorModeSelectOption :mode="option.value" />
    </template>
    <template #default="{ value }">
      <ColorModeSelectOption v-if="isColorMode(value) || value === null" :mode="value" />
    </template>
  </p-select>
</template>

<script lang="ts" setup>
  import { PSelect } from '@kozmoai/nebula-design'
  import { computed } from 'vue'
  import ColorModeSelectOption from '@/components/ColorModeSelectOption.vue'
  import { colorModes } from '@/types/ColorMode'
  import { isColorMode } from '@/utilities/colorMode'

  const props = defineProps<{
    selected: string | null | undefined,
  }>()

  const emits = defineEmits<{
    (event: 'update:selected', value: string | null): void,
  }>()

  const options = [{ label: 'default', value: null }, ...colorModes.map(mode => ({ label: mode, value: mode }))]

  const internalValue = computed({
    get() {
      return isColorMode(props.selected) ? props.selected : null
    },
    set(value: string | null) {
      if (!value) {
        emits('update:selected', null)
      } else {
        emits('update:selected', value)
      }
    },
  })
</script>