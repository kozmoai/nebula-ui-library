import { StateType } from '@/models/StateType'
import {getNebulaBaseUrl} from "@/services";

// intentionally grouped by state type progression
// this order determines the other these show up in the ui
export const nebulaStateNames = [
  'Scheduled',
  'Late',
  'Resuming',
  'AwaitingRetry',
  'Pending',
  'Paused',
  'Suspended',
  'Running',
  'Retrying',
  'Completed',
  'Cancelled',
  'Cancelling',
  'Crashed',
  'Failed',
  'TimedOut',
] as const
export type NebulaStateNames = typeof nebulaStateNames[number]

export const nebulaStateNameTypes = {
  'Scheduled': 'scheduled',
  'Late': 'scheduled',
  'Resuming': 'scheduled',
  'AwaitingRetry': 'scheduled',
  'Pending': 'pending',
  'Paused': 'paused',
  'Suspended': 'paused',
  'Running': 'running',
  'Retrying': 'running',
  'Completed': 'completed',
  'Cancelled': 'cancelled',
  'Cancelling': 'cancelling',
  'Crashed': 'crashed',
  'Failed': 'failed',
  'TimedOut': 'failed',
} as const satisfies Record<NebulaStateNames, StateType>

export const nebulaStateNamesWithoutScheduled = [
  'Pending',
  'Paused',
  'Suspended',
  'Running',
  'Retrying',
  'Completed',
  'Cancelled',
  'Cancelling',
  'Crashed',
  'Failed',
  'TimedOut',
] as const