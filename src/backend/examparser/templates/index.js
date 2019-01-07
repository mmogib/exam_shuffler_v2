export const firstDraft = (temp) => {
  return temp
}
// construct LaTeX document
export const examDocument = (template) => {
  const {
    preamble,
    examcover,
    coverpagemaster,
    coverpage,
    header,
    answerkey,
    answercount,
    spaceAfterQuestionBody,
    spaceBetweenQuestions
  } = template

  return `${preamble}
\\begin{document}
${examcover}

\\newpage

{{#each codes}}
{{#if master}}
${coverpagemaster}
{{else}}
${coverpage}
{{/if}}

\\newpage

${header}
\\begin{large}
\\begin{enumerate}
{{#each questions}}
\\item {{questionBody}}
${spaceAfterQuestionBody}
\\setcounter{equation}{0}

\\begin{enumerate}
{{#each options}}
  \\item {{text}}
{{/each}}
\\end{enumerate}
{{#iseven @index }}
${spaceBetweenQuestions}
{{else }}
\\newpage
{{/iseven}}
{{/each}}
\\end{enumerate}
\\end{large}

\\newpage

{{/each}} 

${answerkey}

\\newpage

${answercount}

\\newpage

\\end{document}
`
}
