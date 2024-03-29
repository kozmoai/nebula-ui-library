<template>
  <p-pop-over
    ref="popOver"
    auto-close
    :placement="placement"
    :style="invisibleTargetStyles"
    @open="checkOpenState"
  >
    <div class="flow-run-graph-popover">
      <slot />
    </div>
  </p-pop-over>
</template>

<script lang="ts" setup>
  import { GraphSelectionPosition } from '@kozmoai/graphs'
  import { PPopOver, positions } from '@kozmoai/nebula-design'
  import { StyleValue, computed, onMounted, ref } from 'vue'

  const props = defineProps<{
    position: GraphSelectionPosition,
  }>()

  const emit = defineEmits<{
    'onClose': [null],
  }>()

  const popOver = ref<InstanceType<typeof PPopOver>>()

  const placement = [positions.bottom, positions.top, positions.left, positions.right]

  const invisibleTargetStyles = computed<StyleValue>(() => ({
    cursor: 'pointer',
    position: 'absolute',
    top: `${props.position.y}px`,
    left: `${props.position.x}px`,
    width: `${props.position.width}px`,
    height: `${props.position.height}px`,
  }))

  onMounted(() => {
    setTimeout(() => {
      popOver.value?.open()
    }, 0)
  })

  const checkOpenState = (): void => {
    if (popOver.value?.visible) {
      return
    }

    emit('onClose', null)
  }
</script>

<style>
.flow-run-graph-popover { @apply
  bg-floating
  rounded-md
  p-3
  m-1
  shadow-lg
  max-h-80
  overflow-auto
}
</style>