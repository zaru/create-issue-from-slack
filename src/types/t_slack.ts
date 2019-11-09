import { WebAPICallResult } from '@slack/web-api'

export type TMessageAction = {
  type: 'message_action'
  trigger_id: string
  message_ts: string
  channel: {
    id: string
  }
  team: {
    id: string
    domain: string
  }
}

export type TDialogSubmission = {
  type: 'dialog_submission'
  submission: { [s: string]: string }
  channel: {
    id: string
  }
  user: {
    id: string
  }
}

export interface IUserInfoResult extends WebAPICallResult {
  user: {
    name: string;
  }
}
