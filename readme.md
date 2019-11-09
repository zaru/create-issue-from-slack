# create issue from Slack

This's Slack Actions server script. You can create GitHub issues from Slack messages. 

- [Slack Actions](https://api.slack.com/interactivity/actions)

## Usage

### Set environments

```
export SLACK_ACCESS_TOKEN=slack_token
export GITHUB_ACCESS_TOKEN=github_token
export GITHUB_OWNER=repository_owner_name
export GITHUB_REPO=repository_name
```

### Edit config.ts

```typescript
export const issueCategories: TIssueCategory[] = [
  { label: 'bug',      value: '1', github_template_path: '.github/ISSUE_TEMPLATE/bug.md' },
  { label: 'question', value: '2', github_template_path: '.github/ISSUE_TEMPLATE/question.md' }
]
```

### Slack App permissions

- bot
- commands
- users:read
- chat:write:user
- chat:write:bot

## Development

```
npm run dev
```