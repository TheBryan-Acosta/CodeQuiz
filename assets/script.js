var content_box = document.querySelector("#container");
let quizQuestions = [
    {
        Question: "What does HTML stand for?",
        correct: "Hyper Text Markup Language",
        a2: "b",
        a3: "c",
        a4: "d",
    },
    {
        Question: "what does CSS stand for?",
        correct: "Cascading Style Sheets",
        a2: "b",
        a3: "c",
        a4: "d",
    },
    {
        Question: "What does push() do?",
        correct: "adds one or more elements to the end of an array",
        a2: "b",
        a3: "c",
        a4: "d",
    },
    {
        Question: "How do you style elements on a page?",
        correct: "CSS",
        a2: "b",
        a3: "c",
        a4: "d",
    },
    {
        Question: "What is considered falsy?",
        correct: "0",
        a2: "b",
        a3: "c",
        a4: "d",
    },
    {
        Question: "What will return true?",
        correct: "return(1==1);",
        a2: "b",
        a3: "c",
        a4: "d",
    },
    {
        Question: "How do you grab an element by its class?",
        correct: "document.querySelector('.id')",
        a2: "b",
        a3: "c",
        a4: "d",
    },
    {
        Question: "how do you console log the letter a?",
        correct: "console.log('a')",
        a2: "b",
        a3: "c",
        a4: "d",
    },
    {
        Question: "What is a proper for loop",
        correct: "for(var i = 0 ; i < a; i++)",
        a2: "b",
        a3: "c",
        a4: "d",
    },
    {
        Question: "What does i do in a for loop?",
        correct: "behaves as an iterator",
        a2: "b",
        a3: "c",
        a4: "d",
    },
];
var score = 0;
var time = 120;


console.log(content_box);

function selectStart(content){
    // Create the introductory
    var startbox = document.createElement("div");
    startbox.className = "justify-content-center text-center mx-5";
    startbox.id = "introduction";

    var codeTitle = document.createElement("h3");

    codeTitle.textContent = "Coding Quiz!";
    startbox.appendChild(codeTitle);

    var codeDescription = document.createElement("p");
    codeDescription.textContent = "Once you press start a timer will begin counting down, you have one minute to anwser all the questions. Good luck!";
    startbox.appendChild(codeDescription)

    var startBtn = document.createElement("button");
    startBtn.className = 'btn btn-primary font-weight-bold';
    startBtn.textContent = "START";
    startBtn.id = "start_btn";
    startbox.appendChild(startBtn);

    content_box.appendChild(startbox);

    startBtn.addEventListener("click", quizStart);
}

selectStart(content_box);

function quizStart(){
    document.querySelector("#introduction").remove();
    console.log("hello!!!!!!!");

    var questionBox = document.createElement("div");
    questionBox.className = "";
    questionBox.id = "questionBox";

    var questionText = document.createElement("h3")
    questionText.className = "my-3";
    questionBox.appendChild(questionText);

    var questionList = document.createElement("ol");
    questionList.setAttribute("type", "A");
    questionBox.appendChild(questionList);

    for(var i = 0; i < 4; i++){
        var anwserChoice = document.createElement("li");
        anwserChoice.className = "mt-2 font-weight-bold";
        
        var anwserChoiceBtn = document.createElement("button");
        anwserChoiceBtn.className = "btn btn-primary font-weight-bold";
        anwserChoiceBtn.id = i;
        anwserChoice.appendChild(anwserChoiceBtn);

        questionList.appendChild(anwserChoice);
    }
    console.log(questionBox);
    content_box.appendChild(questionBox);
    

};

console.log(quizQuestions);