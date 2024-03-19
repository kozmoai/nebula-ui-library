<template>
  <p-code-input v-model="value" lang="jinja" class="schema-form-property-kind-jinja" show-line-numbers />
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import { NebulaKindJinja } from '@/schemas/types/schemaValues'

  const props = defineProps<{
    value: NebulaKindJinja,
  }>()

  const emit = defineEmits<{
    'update:value': [NebulaKindJinja],
  }>()

  const value = computed({
    get() {
      return props.value.template
    },
    set(template) {
      emit('update:value', {
        __nebula_kind: 'jinja',
        template,
      })
    },
  })
</script>