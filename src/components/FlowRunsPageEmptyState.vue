<template>
  <p-empty-state class="flow-runs-page-empty-state">
    <template #icon>
      <p-icon icon="FlowRun" />
    </template>

    <template #heading>
      Run a flow to get started
    </template>

    <template #description>
      Flow runs store the state history for each execution of a flow.
    </template>

    <template #actions>
      <slot name="actions">
        <DocumentationButton :to="localization.docs.gettingStarted">
          Get Started
        </DocumentationButton>
      </slot>
    </template>
  </p-empty-state>
</template>

<script lang="ts" setup>
  import { PEmptyState, PIcon } from '@kozmoai/nebula-design'
  import DocumentationButton from '@/components/DocumentationButton.vue'
  import { localization } from '@/localization'
</script>
