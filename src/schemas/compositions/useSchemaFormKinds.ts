import { InjectionKey, inject } from 'vue'
import { NebulaKind, nebulaKinds } from '@/schemas/types/schemaValues'

export const schemaFormKindsInjectionKey: InjectionKey<Readonly<NebulaKind[]>> = Symbol()

export function useSchemaFormKinds(): Readonly<NebulaKind[]> {
  return inject(schemaFormKindsInjectionKey, nebulaKinds)
}