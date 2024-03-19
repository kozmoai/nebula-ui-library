import { Ref, computed } from 'vue'
import { NebulaKind, isNebulaKindValue } from '@/schemas/types/schemaValues'

export type UseNebulaKind = {
  kind: Ref<NebulaKind>,
}

export function useNebulaKind(propertyValue: Ref<unknown>): UseNebulaKind {
  const kindValuesMap: Partial<Record<NebulaKind, unknown>> = {}

  const kind = computed<NebulaKind>({
    get() {
      if (isNebulaKindValue(propertyValue.value)) {
        return propertyValue.value.__nebula_kind
      }

      return 'none'
    },
    set(__nebula_kind) {
      kindValuesMap[kind.value] = propertyValue.value

      if (__nebula_kind in kindValuesMap) {
        propertyValue.value = kindValuesMap[__nebula_kind]
        return
      }

      propertyValue.value = { __nebula_kind }
    },
  })

  return {
    kind,
  }
}