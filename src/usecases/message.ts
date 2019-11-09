import { ChatPostEphemeralArguments, WebAPICallResult } from '@slack/web-api'
import { TDialogSubmission } from '../types/t_slack'
import { postEphemeral } from '../libs/slack'

export function sendNewIssueUrl(payload: TDialogSubmission, githubUrl: string): Promise<WebAPICallResult> {
  const params = buildNewIssueUrlMessage(payload, githubUrl)
  return postEphemeral(params)
}

function buildNewIssueUrlMessage(payload: TDialogSubmission, githubUrl: string): ChatPostEphemeralArguments {
  return {
    channel: payload.channel.id,
    user: payload.user.id,
    text: '',
    attachments: [
      {
        title: 'Issue 作成のリンクはこちらです',
        actions: [
          {
            type: "button",
            text: ":cherries: Create Issue Link",
            url: githubUrl
          }
        ]
      }
    ]
  }
}
