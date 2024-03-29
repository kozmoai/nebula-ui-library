<template>
  <p-icon-button-menu v-if="showMenu" small class="schema-form-property-menu">
    <template v-if="!disabled">
      <template v-if="showNone">
        <p-overflow-menu-item v-if="showKind('none')" label="Use form input" @click="emit('update:kind', 'none')" />
      </template>
      <p-overflow-menu-item v-if="showKind('json')" label="Use JSON input" @click="emit('update:kind', 'json')" />
      <p-overflow-menu-item v-if="showKind('workspace_variable')" label="Select variable" @click="emit('update:kind', 'workspace_variable')" />
      <p-overflow-menu-item v-if="showKind('jinja')" label="Create a template" @click="emit('update:kind', 'jinja')" />
    </template>

    <template v-if="slots.default">
      <p-divider v-if="showDivider" class="schema-form-property-menu__divider" />
      <slot />
    </template>
  </p-icon-button-menu>
</template>

<script lang="ts" setup>
  import { isDefined } from '@kozmoai/nebula-design'
  import { computed, useSlots } from 'vue'
  import { useSchemaFormKinds } from '@/schemas/compositions/useSchemaFormKinds'
  import { SchemaProperty, isSchemaPropertyType } from '@/schemas/types/schema'
  import { NebulaKind } from '@/schemas/types/schemaValues'
  import { isNullish } from '@/utilities'

  const props = defineProps<{
    kind: NebulaKind,
    property: SchemaProperty,
    disabled?: boolean,
  }>()

  const emit = defineEmits<{
    'update:kind': [NebulaKind],
  }>()

  const slots = useSlots()
  const kinds = useSchemaFormKinds()

  const showMenu = computed(() => kinds.length || slots.default)
  const showDivider = computed(() => !props.disabled && kinds.length)

  const showNone = computed(() => {
    if (isSchemaPropertyType(props.property.type, 'object') && isNullish(props.property.properties)) {
      return false
    }

    if (isSchemaPropertyType(props.property.type, undefined) && isDefined(props.property.enum)) {
      return true
    }

    return props.property.type !== undefined
  })

  function showKind(kind: NebulaKind): boolean {
    return props.kind !== kind && (kinds.includes(kind) || kind === 'none')
  }
</script>

<style>
.schema-form-property-menu__divider .p-divider { @apply
  m-0
}
</style>