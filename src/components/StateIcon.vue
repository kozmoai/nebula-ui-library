<template>
  <p-icon :icon="icon" :class="classes" />
</template>

<script lang="ts" setup>
  import { PIcon } from '@kozmoai/nebula-design'
  import { computed } from 'vue'
  import { StateType } from '@/models/StateType'
  import { TailwindColor } from '@/types/tailwind'
  import { capitalize } from '@/utilities/strings'

  const props = withDefaults(defineProps<{
    stateType: StateType | null | undefined,
    shade?: TailwindColor,
  }>(), {
    shade: 500,
  })

  const icon = computed(() => {
    if (props.stateType === 'paused') {
      return 'Pending'
    }

    if (props.stateType === 'cancelling') {
      return 'Cancelled'
    }

    return capitalize(props.stateType ?? 'QuestionMarkCircleIcon')
  })

  const classes = computed(() => `text-state-${props.stateType}-${props.shade}`)
</script>