export const preamble = `\\documentclass[amsfonts,bezier,leqno,fleqn,12pt,a4paper]{article}
\\usepackage{graphicx}
\\usepackage[overlay]{textpos}
\\setlength{\\TPHorizModule}{1mm}
\\setlength{\\TPVertModule}{1mm}
\\topmargin=-.75in
\\textheight=26.5cm
\\footskip=.3in
\\oddsidemargin=-.1cm
\\textwidth=16.95cm
\\arraycolsep=.15in
\\labelsep=.75cm
\\renewcommand{\\theequation}{\\alph{equation}}
\\thicklines
\\pagestyle{myheadings}
`

export const examcover = `
%%%% COVER PAGE \\\\
\\thispagestyle{empty}
\\begin{center}
    \\begin{large}
        {{settings.University}}\\\\ 
        {{settings.Department}}\\\\ 
        \\vspace*{2cm}
        {\\bf {{config.courseCode}} }  \\\\
        {\\bf {{config.examTitle}} }  \\\\
        {\\bf {{config.Term}} }  \\\\
        {\\bf {{config.examDate}} }  \\\\ 

        \\vspace*{3cm}
        {\\bf{\\Huge{\\fbox{EXAM COVER}}}}\\\\
        \\vspace*{2cm}
        {\\bf Number of versions: {{config.numOfVersions}} }  \\\\
        {\\bf Number of questions: {{config.numOfQuestions}} }  \\\\
        {\\bf Number of Answers: {{config.numOfAnswers}}  }  \\\\
        \\vspace*{0.2cm}
    \\end{large}

    \\vfill

    \\tiny{This exam was prepared using EXAM SHUFFLER}
    \\tiny{For questions send an email to Dr. Mohammed Alshahrani (mshahrani@kfupm.edu.sa) }
\\end{center}

`

export const coverpagemaster = `
\\thispagestyle{empty}
\\begin{center}
    \\begin{large}
        {{settings.University}} \\\\
        {{settings.Department}} \\\\
        {\\bf {{config.courseCode}} } \\\\ 
        {\\bf {{config.examTitle}}  } \\\\
        {\\bf  {{config.Term}} }  \\\\
        {\\bf {{config.examDate}} }  \\\\ 
        {\\bf Net Time Allowed: {{config.TimeAllowed}} }  \\\\
        \\vspace*{6cm}
        {\\bf {\\Huge{MASTER VERSION}}}  \\\\
    \\end{large}
\\end{center}
`

export const coverpage = `
\\thispagestyle{empty}
\\begin{center}
    \\begin{large}
        {{settings.University}} \\\\ 
        {{settings.Department}} \\\\ 
        \\vspace*{4.5cm}
        {\\bf \\fbox{ {{versionName}} } }  \\hfill {\\bf \\fbox{ {{versionName}} }} \\\\
        {\\bf {{config.courseCode}} }  \\\\
        {\\bf {{config.examTitle}} }  \\\\
        {\\bf {{config.Term}} }  \\\\
        {\\bf {{config.examDate}} }  \\\\ 
        {\\bf Net Time Allowed: {{config.TimeAllowed}} }  \\\\
        \\vspace*{0.2cm}

    \\end{large}
\\end{center}

\\large{Name:  }\\hrulefill

\\vspace{3mm}

\\large{ID: } \\hrulefill \\large{  Sec: } \\hrulefill \\large{.

\\vspace{1cm}

\\large{\\bf{Check that this exam has {\\underline{ {{config.numOfQuestions}} }} questions.}}

\\vspace{1cm}

\\underline{\\large{\\bf Important Instructions:}}
\\begin{enumerate}
    \\begin{normalsize}
        \\item  All types of calculators, pagers or mobile phones are NOT allowed during the examination.
        \\item  Use HB 2.5 pencils only.
        \\item  Use a good eraser. DO NOT use the erasers attached to the pencil.
        \\item  Write your name, ID number and Section number on the examination paper and in the upper left corner of the answer sheet.
        \\item  When bubbling your ID number and Section number, be sure that the bubbles match with the numbers that you write.
        \\item  The Test Code Number is already bubbled in your answer sheet. Make sure that it is the same as that printed on your question paper.
        \\item  When bubbling, make sure that the bubbled space is fully covered.
        \\item  When erasing a bubble, make sure that you do not leave any trace of penciling.
    \\end{normalsize}
\\end{enumerate}
`

export const header = `
\\renewcommand{\\thepage}{\\noindent Term {{config.Term}}, {{config.courseCode}}, {{config.examTitle}} \\hfill Page {\\bf \\arabic{page} of {{numOfPages}} } \\hfill {\\bf \\fbox{ {{versionName }} }}}
\\setcounter{page}{1}
`

const placeHolder = `
\\begin{tabular}{|c||c|c|c|c|c|c|}
\\hline
V & a & b & c & d & e \\\\ \\hline 
1 & 4 & 2 & 3 & 9 & 2 \\\\ \\hline
2 & 2 & 4 & 7 & 3 & 4 \\\\ \\hline
3 & 3 & 3 & 4 & 7 & 3 \\\\ \\hline
4 & 2 & 6 & 3 & 2 & 7 \\\\ \\hline
\\end{tabular}
`
export const answerkey = (key = '...') => `
\\renewcommand{\\thepage}{\\noindent {{config.courseCode}}, {{config.Term}}, {{config.examTitle}} \\hfill {\\bf \\fbox{Answer KEY}}}
\\begin{normalsize}
\\setcounter{page}{1}
\\vspace {1cm}

\\begin{center}
${key}
\\end{center}
\\end{normalsize}

`

export const answercount = (key = '...') => `
\\renewcommand{\\thepage}{\\noindent {{config.courseCode}}, {{config.Term}}, {{config.examTitle}} \\hfill {\\bf \\fbox{Answer Counts}}}
\\begin{normalsize}
\\begin{center}
\\vspace {1cm}

\\begin{Large}
Answer Counts \\\\
\\end{Large}
\\vspace {1cm}
${key}
\\end{center}
\\end{normalsize}
`
export const spaceAfterQuestionBody = `\\vspace {0.3in}`
export const spaceBetweenQuestions = `\\vspace {3.5cm}`
