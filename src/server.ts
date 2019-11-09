import express from 'express'
import { Request, Response } from 'express'
import * as bodyParser from 'body-parser'
import { openCreateIssueDialog, getIssueTemplatePath, getMessageFromDialogData } from './usecases/dialog'
import { sendNewIssueUrl } from './usecases/message'
import { createNewIssueUrl } from './usecases/issue'

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => res.send(''))

app.post('/', async (req: Request, res: Response) => {
  const payload = JSON.parse(req.body.payload)
  const { type } = payload

  if (type == 'message_action') {
    const result = await openCreateIssueDialog(payload)
    return result.ok ? res.send('') : res.sendStatus(500)
  } else if (type == 'dialog_submission') {
    const templatePath = getIssueTemplatePath(payload)
    const beforeText = await getMessageFromDialogData(payload)
    const url = await createNewIssueUrl(templatePath, beforeText)
    const result = await sendNewIssueUrl(payload, url)
    return result.ok ? res.send('') : res.sendStatus(500)
  }

  return res.send('')
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(''))

export default app
