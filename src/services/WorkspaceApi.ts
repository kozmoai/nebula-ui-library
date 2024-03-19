import { CloudConfigMissingParamsError } from '@/models/CloudConfigMissingParamsError'
import {Api, ApiBaseUrl, getNebulaBaseUrl, NebulaConfig} from '@/services/Api'

export type CloudApiConfig = NebulaConfig & {
  accountId: string,
  workspaceId: string,
}

export type WorkspaceApiConfig = NebulaConfig | CloudApiConfig

export function isCloudConfig(config: WorkspaceApiConfig): config is CloudApiConfig {
  return 'accountId' in config && 'workspaceId' in config && 'token' in config
}

const getWorkspaceBaseUrl: ApiBaseUrl = (config) => {
  if (!isCloudConfig(config)) {
    return config.baseUrl
  }

  if (config.accountId && config.workspaceId) {
    return `${config.baseUrl}/accounts/${config.accountId}/workspaces/${config.workspaceId}`
  }

  throw new CloudConfigMissingParamsError()
}

export class WorkspaceApi extends Api<WorkspaceApiConfig> {
  protected override apiBaseUrl = getWorkspaceBaseUrl
}