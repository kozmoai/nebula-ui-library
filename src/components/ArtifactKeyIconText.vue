<template>
  <p-link v-if="artifactKey" :to="routes.artifactKey(artifactKey)" class="artifact-key-icon-text">
    <p-icon-text :icon="icon">
      <span>{{ artifactKey }}</span>
    </p-icon-text>
  </p-link>
</template>

<script lang="ts" setup>
  import { Icon } from '@kozmoai/nebula-design'
  import { computed, toRefs } from 'vue'
  import { useArtifact, useWorkspaceRoutes } from '@/compositions'
  import { artifactTypeIconMap } from '@/models'

  const props = defineProps<{
    artifactId: string,
  }>()

  const routes = useWorkspaceRoutes()
  const { artifactId } = toRefs(props)
  const { artifact } = useArtifact(artifactId)
  const artifactKey = computed(() => artifact.value?.key)

  const icon = computed<Icon>(() => artifactTypeIconMap[artifact.value?.type ?? 'unknown'])
</script>