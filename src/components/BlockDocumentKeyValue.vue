<template>
  <template v-if="blockDocument">
    <PKeyValue class="block-document-key-value" :label="blockDocument.blockType.name">
      <template #value>
        <p-link :to="routes.block(blockDocument.id)">
          {{ blockDocument.name }}
        </p-link>
      </template>
    </PKeyValue>
  </template>
</template>

<script lang="ts" setup>
  import { PKeyValue } from '@kozmoai/nebula-design'
  import { useSubscription } from '@prefecthq/vue-compositions'
  import { computed } from 'vue'
  import { useWorkspaceApi, useWorkspaceRoutes } from '@/compositions'

  const props = defineProps<{
    blockDocumentId: string,
  }>()

  const api = useWorkspaceApi()
  const routes = useWorkspaceRoutes()
  const blockDocumentSubscription = useSubscription(api.blockDocuments.getBlockDocument, [props.blockDocumentId])
  const blockDocument = computed(() => blockDocumentSubscription.response)
</script>