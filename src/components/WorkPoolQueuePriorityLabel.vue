<template>
  <span>
    Priority
    <ExtraInfoModal title="Priority">
      Priority specifies how Nebula prioritizes the delivery of work — more precisely, execution of flow runs among worker pools. Priority must be a unique, positive integer. Lower numbers indicate higher pool priorities. For example, 1 is the highest priority queue and its flow run execution takes precedence over any lower-priority pool. 10 is a lower priority queue than 1, and 100 is lower priority than both 1 and 10. If you specify a priority that already exists, the new priority supersedes any previously set priority on a worker pool.
    </ExtraInfoModal>
  </span>
</template>

<script lang="ts" setup>
  import { ExtraInfoModal } from '@/components'
</script>