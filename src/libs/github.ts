import Octokit from '@octokit/rest'

export async function fetchFile(path: string): Promise<string> {
  const client = new Octokit({
    auth: process.env.GITHUB_ACCESS_TOKEN
  })

  const result = await client.repos.getContents({
    owner: process.env.GITHUB_OWNER,
    repo: process.env.GITHUB_REPO,
    path
  })

  // TODO: なぜか ReposGetContentsResponse の型が合わないので仕方なく変換
  const data = result.data as {content?: string}
  const content = data.content
  return Buffer.from(content || '', 'base64').toString()
}
