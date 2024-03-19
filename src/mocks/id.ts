import { randomId as generateRandomId } from '@kozmoai/nebula-design'
import { MockFunction } from '@/services/Mocker'

export const randomId: MockFunction<string, []> = function() {
  return generateRandomId()
}