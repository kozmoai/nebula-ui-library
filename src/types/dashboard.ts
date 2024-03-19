import { DateRangeSelectValue } from '@kozmoai/nebula-design'

export type WorkspaceDashboardFilter = {
  range: NonNullable<DateRangeSelectValue>,
  tags: string[],
}