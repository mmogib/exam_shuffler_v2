const first_draft = `
\\documentclass[dvips, 12pt,a4paper]{article}
\\usepackage{latexsym, amsmath}
\\usepackage{amssymb}
\\usepackage{enumerate}
\\topmargin=-8mm \\textheight=222mm \\textwidth=160mm
\\oddsidemargin=7mm \\evensidemargin=-5mm \\thispagestyle{empty}
\\newcommand{\\rr}{I\\hspace{-1.5mm}R}
\\newcommand{\\nn}{I\\hspace{-1.5mm}N}
\\newcommand{\\cc}{C\\hspace{-3mm}C}
\\pagestyle{empty}
\\begin{document}

{{courseCode}}

\\begin{enumerate}
%%BEGIN_QUESTIONS%%
{{#for numOfQuestions}}
%{{ @index }}
%%BEGIN_QUESTION_BODY%%
\\item Type question {{@index}}  here
%%END_QUESTION_BODY%%
\\\\[0.2in]
\\begin{enumerate}[(a)]
%%BEGIN_OPTIONS%%
    \\item Option $1$
    \\item Option $2$
    \\item Option $3$
    \\item Option $4$
    \\item Option $5$
%%END_OPTIONS%%
\\end{enumerate}
{{#iseven @index }}
\\newpage
{{else }}
\\vspace{0.8in}
{{/iseven}}
%%NEXT_QUESTION%%
{{/for}}
%%BEGIN_QUESTIONS%%
\\end{enumerate}
\\end{document}`

export default first_draft
