import { settings, config, code, question, questionOtion } from '../examparser'

// first steps
const setting = {
  ...settings,
  Uinversity: 'King Fahd',
  Department: 'Math'
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

const qs = [
  { ...q, questionBody: 'question 1' },
  { ...q, questionBody: 'question 2' },
  { ...q, questionBody: 'question 3' },
  { ...q, questionBody: 'question 4' },
  { ...q, questionBody: 'question 5' },
  { ...q, questionBody: 'question 6' }
]

const def_code = { ...code, settings: setting, config: cnfg, questions: qs, numOfPages }

const codes = [
  { ...def_code, master: true, versionName: 'Master' },
  { ...def_code, versionName: 'CODE001' },
  { ...def_code, versionName: 'CODE002' },
  { ...def_code, versionName: 'CODE003' },
  { ...def_code, versionName: 'CODE004' }
]
export const example_state = {
  codes,
  config: cnfg,
  settings: setting
}
