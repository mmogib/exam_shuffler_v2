import path from 'path'
import { promisify } from 'util'
import Datastore from 'nedb'
export { parse_examdoc } from './exam'
export { examDocument } from './templates/'

import {
  preamble,
  examcover,
  coverpagemaster,
  coverpage,
  header,
  answerkey,
  answercount,
  spaceAfterQuestionBody,
  spaceBetweenQuestions
} from './templates/examparts'
import { stat } from 'fs'

export const settings = {
  University: 'University Name',
  Department: 'Department Name'
}

export const config = {
  courseCode: 'Course Code, ex. MATH101',
  examDate: '',
  examTitle: 'Exam Title',
  examGroups: [], //[2,2,5]
  numOfAnswers: 0,
  numOfQuestions: 0,
  numOfVersions: 0,
  Term: 0,
  TimeAllowed: ''
}

export const questionOtion = {
  correct: false,
  text: '',
  order: 0,
  pinned: false
}
export const question = {
  questionBody: '',
  options: [],
  pinned: false
}

export const code = {
  settings,
  config,
  questions: [],
  master: false,
  versionName: '',
  numOfPages: 0
}

export const partials = {
  preamble,
  examcover,
  coverpagemaster,
  coverpage,
  header,
  answerkey,
  answercount,
  spaceAfterQuestionBody,
  spaceBetweenQuestions
}

const get_initial_state = db => {
  return new Promise((resolve, reject) => {
    db.find({ name: 'default_state' }, (err, docs) => {
      if (err) reject(err)
      if (docs.length === 0) {
        reject(new Error('No initial state'))
      } else {
        resolve(docs[0])
      }
    })
  })
}

const set_default_state = (db, initial_state) => {
  return new Promise((resolve, reject) => {
    db.insert(initial_state, (err, doc) => {
      if (err) reject(err)
      resolve(doc)
    })
  })
}
export const get_or_create_db = () => {
  return new Datastore({
    filename: path.resolve(__dirname, 'database.db'),
    autoload: true
  })
}

const default_state = {
  name: 'default_state',
  exam: {
    codes: [],
    config,
    settings
  },
  examPartials: partials
}
export const initial_state = async db => {
  try {
    const state = await get_initial_state(db)
    return state
  } catch (error) {
    await set_default_state(db, default_state)
    return default_state
  }
}
/*
arse_examdoc(exam: exam, template: string)
parse_first_draft( options: config, first_draft: string) see src/types

interface questionOtion {
  correct: boolean
  text: string
  order: number
}
interface question {
  questionBody: Readonly<string>
  options: Array<questionOtion>
}

interface code {
  settings: settings
  config: config
  questions: Array<question>
  master: boolean
  versionName: string
  numOfPages: number
}

interface latexTemplate {
  preamble: string
  examcover: string
  coverpagemaster: string
  coverpage: string
  header: string
  answerkey: string
  answercount: string
  spaceAfterQuestionBody: string
  spaceBetweenQuestions: string
}

*/
