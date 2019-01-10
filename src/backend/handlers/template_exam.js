import { settings, config, code, question, questionOtion } from '../examparser'

// first steps
const setting = {
  ...settings,
  Uinversity: 'Uinversity',
  Department: 'Uinversity'
}

const cnfg = {
  ...config,
  courseCode: 'MATH 101',
  examDate: 'Monday 25/12/2018',
  examTitle: 'EXAM II',
  examGroups: [5, 5, 5, 5],
  numOfAnswers: 5,
  numOfQuestions: 20,
  numOfVersions: 4,
  Term: 171,
  TimeAllowed: '120 minutes'
}
const numOfPages = Math.ceil(cnfg.numOfQuestions / 2)

const options = [
  {
    ...questionOtion,
    correct: true,
    text: 'first option',
    order: 1
  },
  {
    ...questionOtion,
    text: 'second option',
    order: 2
  },
  {
    ...questionOtion,
    text: 'third option',
    order: 3
  },
  {
    ...questionOtion,
    text: 'fourth option',
    order: 4
  },
  {
    ...questionOtion,
    text: 'fifth option',
    order: 5
  }
]
const q = { ...question, options }
const figuteBox = `
In the figure,
\\begin{textblock}{50}(90,1) % 90 is x coordinate, 1 is y coordinate
you include your figure here using the command
{\\tiny 
\\begin{verbatim}
\\includegraphics[scale=0.5]{universe}
\\end{verbatim}
}
\\end{textblock}

`
const qs = [
  { ...q, questionBody: 'question 1' },
  { ...q, questionBody: figuteBox },
  { ...q, questionBody: 'question 3' },
  { ...q, questionBody: figuteBox },
  { ...q, questionBody: 'question 5' },
  { ...q, questionBody: 'question 6' },
  { ...q, questionBody: 'question 7' },
  { ...q, questionBody: 'question 8' },
  { ...q, questionBody: 'question 9' },
  { ...q, questionBody: 'question 10' },
  { ...q, questionBody: 'question 11' },
  { ...q, questionBody: 'question 12' },
  { ...q, questionBody: 'question 13' },
  { ...q, questionBody: 'question 14' },
  { ...q, questionBody: 'question 15' },
  { ...q, questionBody: 'question 16' },
  { ...q, questionBody: 'question 17' },
  { ...q, questionBody: 'question 18' },
  { ...q, questionBody: 'question 19' },
  { ...q, questionBody: 'question 20' }
]

const def_code = { ...code, settings: setting, config: cnfg, questions: qs, numOfPages }

const codes = [{ ...def_code, master: true, versionName: 'Master' }]
export const template_exam = {
  codes,
  config: cnfg,
  settings: setting
}
