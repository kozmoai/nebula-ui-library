<template>
  <DateInput v-model="value" show-time clearable />
</template>

<script lang="ts" setup>
  import { isNotNullish } from '@kozmoai/nebula-design'
  import { formatISO, parseISO } from 'date-fns'
  import { computed } from 'vue'
  import DateInput from '@/components/DateInput.vue'
  import { isInvalidDate } from '@/utilities'

  const props = defineProps<{
    value: string | null | undefined,
  }>()

  const emit = defineEmits<{
    'update:value': [string | null | undefined],
  }>()

  const value = computed({
    get() {
      if (isNotNullish(props.value)) {
        const parsed = parseISO(props.value)

        if (isInvalidDate(parsed)) {
          return undefined
        }

        return parsed
      }

      return props.value
    },
    set(value) {
      if (isNotNullish(value)) {
        emit('update:value', formatISO(value))
        return
      }

      emit('update:value', value)
    },
  })
</script>