import { isRecord, isString } from '@/utilities'
import { createTuple } from '@/utilities/tuples'
import {getNebulaBaseUrl} from "@/services";

export type SchemaValue = unknown
export type SchemaValues = Record<string, SchemaValue>

export const { values: nebulaKinds, isValue: isNebulaKind } = createTuple([
  'none',
  'json',
  'jinja',
  'workspace_variable',
])

export type NebulaKind = typeof nebulaKinds[number]

type BaseNebulaKindValue<
  TKind extends NebulaKind = NebulaKind,
  TRest extends Record<string, unknown> = Record<string, unknown>
> = {
  __nebula_kind: TKind,
} & TRest

export type NebulaKindValue = NebulaKindNull | NebulaKindJinja | NebulaKindJson | NebulaKindWorkspaceVariable

export function isNebulaKindValue<T extends NebulaKind = NebulaKind>(value: unknown, kind?: T): value is NebulaKindValue & { __nebula_kind: T } {
  const isKindObject = isRecord(value) && isNebulaKind(value.__nebula_kind)

  if (!isKindObject) {
    return false
  }

  if (isNebulaKind(kind)) {
    return value.__nebula_kind === kind
  }

  return true
}

export type NebulaKindNull = BaseNebulaKindValue<'none', {
  value: unknown,
}>

export function isNebulaKindNull(value: unknown): value is NebulaKindNull {
  return isNebulaKindValue(value, 'none') && 'value' in value
}

export type NebulaKindJson = BaseNebulaKindValue<'json', {
  value: string | undefined,
}>

export function isNebulaKindJson(value: unknown): value is NebulaKindJson {
  return isNebulaKindValue(value, 'json') && isString(value.value)
}

export type NebulaKindJinja = BaseNebulaKindValue<'jinja', {
  template: string,
}>

export function isNebulaKindJinja(value: unknown): value is NebulaKindJinja {
  return isNebulaKindValue(value, 'jinja') && isString(value.template)
}

export type NebulaKindWorkspaceVariable = BaseNebulaKindValue<'workspace_variable', {
  variable_name: string,
}>

export function isNebulaKindWorkspaceVariable(value: unknown): value is NebulaKindWorkspaceVariable {
  return isNebulaKindValue(value, 'workspace_variable') && isString(value.variable_name)
}

export type BlockDocumentReferenceValue = {
  $ref: string,
}

export function isBlockDocumentReferenceValue(value: unknown): value is BlockDocumentReferenceValue {
  return isRecord(value) && isString(value.$ref)
}

export function asBlockDocumentReferenceValue(value: unknown): BlockDocumentReferenceValue | undefined {
  if (isBlockDocumentReferenceValue(value)) {
    return value
  }

  return undefined
}