import { WebClient, DialogOpenArguments, ChatPostEphemeralArguments, WebAPICallResult } from '@slack/web-api'
import { IUserInfoResult } from '../types/t_slack'

export function openDialog(params: DialogOpenArguments): Promise<WebAPICallResult> {
  const web = new WebClient(process.env.SLACK_ACCESS_TOKEN)
  return web.dialog.open(params)
}

export function postEphemeral(params: ChatPostEphemeralArguments): Promise<WebAPICallResult> {
  const web = new WebClient(process.env.SLACK_ACCESS_TOKEN)
  return web.chat.postEphemeral(params)
}

export async function fetchSlackUserName(userId: string): Promise<string> {
  const web = new WebClient(process.env.SLACK_ACCESS_TOKEN)
  const result = (await web.users.info({user: userId})) as IUserInfoResult
  return result.user.name
}
