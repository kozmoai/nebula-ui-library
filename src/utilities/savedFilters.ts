import { secondsInWeek } from 'date-fns'
import isEqual from 'lodash.isequal'
import { SavedSearch, SavedSearchFilter } from '@/models/SavedSearch'
import { nebulaStateNamesWithoutScheduled } from '@/types/states'

export function isSameFilter(filterA: SavedSearchFilter, filterB: SavedSearchFilter): boolean {
  return isEqual(filterA, filterB)
}

export const filterRangePastWeek = { type: 'span', seconds: -secondsInWeek } as const

export const oneWeekFilter: SavedSearchFilter = {
  range: filterRangePastWeek,
  state: [],
  flow: [],
  tag: [],
  deployment: [],
  workPool: [],
  workQueue: [],
}

export const noScheduleFilter: SavedSearchFilter = {
  range: filterRangePastWeek,
  state: nebulaStateNamesWithoutScheduled.slice(),
  flow: [],
  tag: [],
  deployment: [],
  workPool: [],
  workQueue: [],
}

export const oneWeekSavedSearch = new SavedSearch({
  id: null,
  name: 'Past week',
  filters: oneWeekFilter,
})

export const excludeScheduledSavedSearch = new SavedSearch({
  id: null,
  name: 'Hide scheduled runs',
  filters: noScheduleFilter,
})

export const customPartialSearch = {
  id: null,
  name: 'Custom',
}

export const unsavedPartialSearch = {
  id: null,
  name: 'Unsaved',
}

export const systemDefaultSavedSearch = oneWeekSavedSearch

export const systemSavedSearches = [
  oneWeekSavedSearch,
  excludeScheduledSavedSearch,
]
