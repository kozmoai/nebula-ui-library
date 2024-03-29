<template>
  <p-combobox v-model="internalValue" :options="options" :empty-message="emptyMessage">
    <template #combobox-options-empty>
      No work queues
    </template>
    <template #default="scope">
      <slot v-bind="scope" />
    </template>
    <template #option="{ option }">
      <slot name="option" :option="option" />
    </template>
  </p-combobox>
</template>


<script lang="ts" setup>
  import { PCombobox, SelectOption } from '@kozmoai/nebula-design'
  import { useSubscriptionWithDependencies } from '@prefecthq/vue-compositions'
  import { computed } from 'vue'
  import { useWorkspaceApi } from '@/compositions'

  const props = defineProps<{
    selected: string | string[] | null | undefined,
    workPoolName: string,
    emptyMessage?: string,
    allowUnset?: boolean,
  }>()

  const emits = defineEmits<{
    (event: 'update:selected', value: string | string[] | null): void,
  }>()

  const multiple = computed(() => Array.isArray(props.selected))

  const internalValue = computed<typeof props.selected>({
    get() {
      return props.selected ?? null
    },
    set(value: string | string[] | null | undefined) {
      if (!value) {
        emits('update:selected', null)
      } else if (multiple.value) {
        emits('update:selected', Array.isArray(value) ? value : [value])
      } else {
        emits('update:selected', value)
      }
    },
  })

  const api = useWorkspaceApi()

  const workPoolQueuesArgs = computed<[string] | null>(() => {
    if (!props.workPoolName) {
      return null
    }

    return [props.workPoolName]
  })
  const workPoolQueuesSubscription = useSubscriptionWithDependencies(api.workPoolQueues.getWorkPoolQueues, workPoolQueuesArgs)
  const workPoolQueues = computed(() => workPoolQueuesSubscription.response ?? [])

  const options = computed<SelectOption[]>(() => {
    const options: SelectOption[] = workPoolQueues.value.map(workQueue => ({
      value: workQueue.name,
      label: workQueue.name,
    }))

    if (props.allowUnset) {
      options.unshift({
        value: null,
        label: 'None',
      })
    }

    return options
  })
</script>