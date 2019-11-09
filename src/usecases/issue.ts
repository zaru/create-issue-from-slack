import qs from 'qs'
import { fetchFile } from '../libs/github'

export async function createNewIssueUrl(path: string, beforeText: string): Promise<string> {
  const template = await fetchFile(path)
  const params = {
    title: getTitle(template),
    labels: getLabels(template),
    assignees: getAssignees(template),
    body: `${beforeText}${getBody(template)}`
  }
  return `${getRepoUrl()}/issues/new?${qs.stringify(params)}`
}

function getRepoUrl() {
  return `https://github.com/${process.env.GITHUB_OWNER}/${process.env.GITHUB_REPO}`
}

function getTitle(data: string): string {
  const match = /^title: (.+)/m
  return match.test(data) ? match.exec(data)[1].replace(/"/g, '') : ''
}

function getLabels(data: string): string {
  const match = /^labels: (.+)/m
  return match.test(data) ? match.exec(data)[1] : ''
}

function getAssignees(data: string): string {
  const match = /^assignees: (.+)/m
  return match.test(data) ? match.exec(data)[1] : ''
}

function getBody(data: string): string {
  const match = /^---\n/m
  const result = data.split(match)
  return result[result.length - 1]
}
