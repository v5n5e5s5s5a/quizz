import readline from 'readline'
import fs from 'fs'

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

let quizz = []

try {
    const info = fs.readFileSync('questions.json', 'utf-8')
    quizz = JSON.parse(info)
} catch (error) {
    console.log('error Occurred! Questions are inaccessible!:', error.message)
    process.exit(1)
}

const generateQuestion = (index, score) => {
    if (index === quizz.length) {
        rl.close();
        console.log(`Your final score is ${score} out of ${quizz.length}`)
        return;
    }

    const CQ = quizz[index];

    rl.question(` ${index + 1}. ${CQ.question}\n${CQ.answers.join('\n')}\n Enter Answer: `, (inputAnswer) => {
        const userAnswer = parseInt(inputAnswer) - 1

        if (userAnswer >= 0 && userAnswer < CQ.answers.length) {
            const trueAnswer = CQ.correctAnswerIndex === userAnswer
            if (trueAnswer) {
                console.log('Answer is Correct\n')
                score ++
            } else {
                console.log(`Your answer is wrong! ${CQ.answers[CQ.correctAnswerIndex]} \n`);
            }

            generateQuestion(index + 1, score)
        } else {
            console.log('Invalid answer! Enter a number which corresponds to the answer of your choice \n');
            generateQuestion(index, score)
        }
    })
}

console.log(`QUIZZ \n Select the correct answer for the following Questions \n`);
generateQuestion(0, 0)
