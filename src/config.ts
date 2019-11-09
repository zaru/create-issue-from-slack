type TIssueCategory = {
  label: string
  value: string
  github_template_path: string
}

export const issueCategories: TIssueCategory[] = [
  { label: '誤字脱字・レイアウト崩れ', value: '1', github_template_path: '.github/ISSUE_TEMPLATE/------------.md' },
  { label: 'システム保守/改善', value: '2', github_template_path: '.github/ISSUE_TEMPLATE/---------.md' },
  { label: '不具合対応', value: '3', github_template_path: '.github/ISSUE_TEMPLATE/-----.md' },
  { label: '障害対応', value: '4', github_template_path: '.github/ISSUE_TEMPLATE/----.md' },
  { label: '新機能', value: '5', github_template_path: '.github/ISSUE_TEMPLATE/---.md' },
  { label: '既存UX改善', value: '6', github_template_path: '.github/ISSUE_TEMPLATE/--ux--.md' }
]
