<template>
  <WorkspaceVariableCombobox v-model:selected="value" class="schema-form-property-kind-workspace-variable" />
</template>

<script lang="ts" setup>
  /* eslint-disable camelcase */
  import { computed } from 'vue'
  import WorkspaceVariableCombobox from '@/components/WorkspaceVariableCombobox.vue'
  import { NebulaKindWorkspaceVariable } from '@/schemas/types/schemaValues'

  const props = defineProps<{
    value: NebulaKindWorkspaceVariable,
  }>()

  const emit = defineEmits<{
    'update:value': [NebulaKindWorkspaceVariable],
  }>()

  const value = computed({
    get() {
      return props.value.variable_name
    },
    set(variable_name) {
      emit('update:value', {
        __nebula_kind: 'workspace_variable',
        variable_name,
      })
    },
  })
</script>