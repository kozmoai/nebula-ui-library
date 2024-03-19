import { DateRangeSelectValue } from '@kozmoai/nebula-design'

export type FlowStatsFilter = {
  range: NonNullable<DateRangeSelectValue>,
  flowId: string,

}