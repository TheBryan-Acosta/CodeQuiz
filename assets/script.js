var content_box = document.querySelector("#container");
var quizQuestions = [
    {
        Question: "What does HTML stand for?",
        correct: "Hyper Text Markup Language",
        options: ["How To Milk Legos","None of your business","Hyper Text Maximum Language","Hyper Text Markup Language"]
    },
    {
        Question: "what does CSS stand for?",
        correct: "Cascading Style Sheets",
        options: ["Corn Stalk Searching","Cows Sing Songs","Cascading Super Sheet","Cascading Style Sheets"]
    },
    {
        Question: "What does push() do?",
        correct: "adds one or more elements to the end of an array",
        options: ["Pulls","adds a defined string into the end of the body","pushes a variable over","adds one or more elements to the end of an array"]
    },
    {
        Question: "How do you style elements on a page?",
        correct: "CSS",
        options: ["HTML","JS","C++","CSS"]
    },
    {
        Question: "What is considered falsy?",
        correct: "0",
        options: ["1","no","wrong","0"]
    },
    {
        Question: "What will return true?",
        correct: "return(1==1);",
        options: ["return(1);","return(True);","return(1=1);","return(1==1);"]
    },
    {
        Question: "How do you grab an element by its class?",
        correct: "document.querySelector('.id')",
        options: ["document.grabClass('.cheese');","document.findClass('.zawardo')","with gloves","document.querySelector('.id')"]
    },
    {
        Question: "how do you console log the letter a?",
        correct: "console.log('a')",
        options: ["a","print('a');","console.log('the letter a?')","console.log('a')"]
    },
    {
        Question: "What is a proper for loop",
        correct: "for(var i = 0 ; i < a; i++)",
        options: ["i(var i = i; i > i: i--)","for(var for = 0; for > i;i++)","for(i goes up until a then add to i)","for(var i = 0 ; i < a; i++)"]
    },
    {
        Question: "What does i do in a for loop?",
        correct: "behaves as an iterator",
        options: ["relaxes","plays as the point guard","works hard thats what","behaves as an iterator"]
    },
];
var score = 0;
var quesNum = 0;
var timeleft = 120;

function selectStart(){
    // Create the introductory

    console.log("selectStart");

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

selectStart();

function quizStart(){

    var myInterval = setInterval(function() {
        timeleft--;
        document.getElementById("countdown").textContent = 'Time: ' + timeleft;
    
        console.log(timeleft);
         if (timeleft === 0 || quesNum == 10) {
             clearInterval(myInterval);
             document.getElementById("questionBox").remove();
             quizEnd();
         }
    }, 1000);


    console.log("quizStart")
    document.querySelector("#introduction").remove();

    var questionBox = document.createElement("div");
    questionBox.className = "";
    questionBox.id = "questionBox";

    var questionText = document.createElement("h3")
    questionText.id = "question";
    questionText.className = "my-3";
    questionBox.appendChild(questionText);

    var questionList = document.createElement("ol");
    questionList.setAttribute("type", "A");
    questionBox.appendChild(questionList);

    var resultNoti = document.createElement("p");
    resultNoti.id = "NotiBox";
    questionBox.appendChild(resultNoti);

    for(var i = 0; i < 4; i++){
        var anwserChoice = document.createElement("li");
        anwserChoice.className = "mt-2 font-weight-bold";
        
        var anwserChoiceBtn = document.createElement("button");
        anwserChoiceBtn.className = "btn btn-primary font-weight-bold";
        anwserChoiceBtn.id = i;
        anwserChoice.appendChild(anwserChoiceBtn);

        questionList.appendChild(anwserChoice);
    }
    content_box.appendChild(questionBox);

  quizPopulate();
  document.getElementById("questionBox").addEventListener("click", anwsertaskHandler);
};

function quizPopulate(){

    if(quesNum == 10){
        document.getElementById("questionBox").remove();
        quizEnd();
        return false;
    }

    console.log("quizpopulate")
    console.log(quesNum);

    document.querySelector("#question").textContent = quizQuestions[quesNum].Question;
    var RandQues = [0,1,2,3];
    RandQues = RandQues.sort((a, b) => 0.5 - Math.random());
    console.log(RandQues);


    document.getElementById("0").textContent = quizQuestions[quesNum].options[RandQues[0]];
    document.getElementById("1").textContent = quizQuestions[quesNum].options[RandQues[1]];
    document.getElementById("2").textContent = quizQuestions[quesNum].options[RandQues[2]];
    document.getElementById("3").textContent = quizQuestions[quesNum].options[RandQues[3]];

}

function anwsertaskHandler(event){
        if(event.target.textContent == quizQuestions[quesNum].correct && event.target.className == "btn btn-primary font-weight-bold"){
            console.log(score);
            document.getElementById("NotiBox").textContent = "Correct!";
            score = score + 10;
            quesNum++;
            quizPopulate();
        }

        else if(event.target.textContent != quizQuestions[quesNum].correct && event.target.className == "btn btn-primary font-weight-bold"){
            console.log("wrong");
            document.getElementById("NotiBox").textContent = "Wrong!";
            quesNum++;
            timeleft = timeleft - 10;
            quizPopulate();
        }
}

function quizEnd(){

    score = score + timeleft;
    var finishBox = document.createElement("div");
    finishBox.className = "col justify-content-center";

    var finishText = document.createElement("h3")
    finishText.className = "my-2";
    finishText.textContent = 'Congrats! you finished with a score of ' + score + "! (Your grade plus time left!)";
    finishBox.appendChild(finishText);

    var inputLabel = document.createElement("label");
    inputLabel.textContent = "Enter your initals here to save a highscore!: ";
    inputLabel.className = "";
    finishBox.appendChild(inputLabel);


    var inputField = document.createElement("input");
    inputField.setAttribute("type", "Initials");
    inputField.className = "forum-control mx-2";
    finishBox.appendChild(inputField);

    var submitBtn = document.createElement("button")
    submitBtn.className = "btn btn-success font-weight-bold";
    submitBtn.textContent = "SUBMIT"
    finishBox.appendChild(submitBtn);

    content_box.appendChild(finishBox);

}
