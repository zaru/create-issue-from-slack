import { DialogOpenArguments, WebAPICallResult } from '@slack/web-api'
import { TMessageAction, TDialogSubmission } from '../types/t_slack'
import { issueCategories } from '../config'
import { openDialog, fetchSlackUserName } from '../libs/slack'

export function openCreateIssueDialog(payload: TMessageAction): Promise<WebAPICallResult> {
  const params = buildDialogParams(payload)
  return openDialog(params)
}

export function getIssueTemplatePath(payload: TDialogSubmission): string {
  return issueCategories.find(v => v.value == payload.submission.category).github_template_path
}

export async function getMessageFromDialogData(payload: TDialogSubmission): Promise<string> {
  const userId = await fetchSlackUserName(payload.submission.reporter)
  return `
依頼者もしくは関係者 Slack ID : @${userId}
報告元 Slack URL: ${payload.submission.slackPermaLink}

`
}

function buildDialogParams(payload: TMessageAction): DialogOpenArguments {
  return {
    trigger_id: payload.trigger_id,
    dialog: {
      title: 'GitHub に Issue を作ります',
      callback_id: 'createIssue',
      submit_label: 'createIssue',
      elements: [
        {
          label: 'Issue の種類',
          optional: false,
          type: 'select',
          name: 'category',
          value: '',
          options: issueCategories.map(v => { return { label: v.label, value: v.value } }),
        },
        {
          label: '依頼者もしくは関係者',
          optional: false,
          type: 'select',
          name: 'reporter',
          data_source: 'users'
        },
        {
          label: 'Slack の報告元 URL (いじらないでください)',
          optional: false,
          type: 'text',
          name: 'slackPermaLink',
          value: getSlackPermaLink(payload)
        }
      ]
    }
  }
}

function getSlackPermaLink(payload: TMessageAction): string {
  return `https://${payload.team.domain}.slack.com/archives/${payload.channel.id}/p${payload.message_ts.replace('.', '')}`
}
