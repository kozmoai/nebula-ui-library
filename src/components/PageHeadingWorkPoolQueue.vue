<template>
  <page-heading class="page-heading-work-pool-queue" :crumbs="crumbs">
    <template #actions>
      <WorkPoolQueueToggle :work-pool-queue="workPoolQueue" :work-pool-name="workPoolName" @update="emit('update')" />
      <WorkPoolQueueMenu :work-pool-queue="workPoolQueue" :work-pool-name="workPoolName" :show-all="!media.sm" @delete="handleDelete" />
    </template>
  </page-heading>
</template>

<script lang="ts" setup>
  import { media } from '@kozmoai/nebula-design'
  import { computed } from 'vue'
  import { useRouter } from 'vue-router'
  import { PageHeading, WorkPoolQueueToggle } from '@/components'
  import { useComponent, useWorkspaceRoutes } from '@/compositions'
  import { WorkPoolQueue } from '@/models'

  const props = defineProps<{
    workPoolName: string,
    workPoolQueue: WorkPoolQueue,
  }>()

  const routes = useWorkspaceRoutes()
  const router = useRouter()
  const { WorkPoolQueueMenu } = useComponent()

  const emit = defineEmits<{
    (event: 'update' | 'delete'): void,
  }>()

  const crumbs = computed(() => [
    { text: 'Work Pools', to: routes.workPools() },
    { text: props.workPoolName, to: routes.workPool(props.workPoolName) },
    { text: props.workPoolQueue.name },
  ])

  const handleDelete = (): void => {
    router.back()
  }
</script>