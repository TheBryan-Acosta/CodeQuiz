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

//creates the scores variable, then we push the scores from localStorage to that variable
var scores = [];
 if(JSON.parse(localStorage.getItem('scores')) != null){
    scores = JSON.parse(localStorage.getItem('scores'));
    scores = scores.sort(function (a, b) {
        return b.grade - a.grade;
 });
}

// adds top three scores to the highscore modal body
populateHighscores();
function populateHighscores(){
    var HighscoreBox = document.getElementById("highscore_box");

    //creates h2 element containing its respective score index, with name and grade.
    //also checks if it even exists before appending to the modal body
    if(scores.length > 0){
    var firstplace = document.createElement("h2");
    firstplace.textContent = "👑 "+ scores[0].name +": "+ scores[0].grade;
    HighscoreBox.appendChild(firstplace);
    }

    if(scores.length > 1){
    var secondplace = document.createElement("h3");
    secondplace.textContent = "2) " + scores[1].name +": "+ scores[1].grade;
    HighscoreBox.appendChild(secondplace);
    }

    if(scores.length > 2){
    var thirdplace = document.createElement("h4");
    thirdplace.textContent = "3) " + scores[2].name +": "+ scores[2].grade;
    HighscoreBox.appendChild(thirdplace);
    }

}

// introduces the website and provides an explaination to how the quiz is going to function
selectStart();
function selectStart(){

    // creates an empty div with introductory id
    var startbox = document.createElement("div");
    startbox.className = "justify-content-center text-center mx-5";
    startbox.id = "introduction";

    //creates and appends title to the div
    var codeTitle = document.createElement("h3");
    codeTitle.textContent = "Coding Quiz!";
    startbox.appendChild(codeTitle);

    //creates and appends the description to the div
    var codeDescription = document.createElement("p");
    codeDescription.textContent = "Once you press start a timer will begin counting down, you have one minute to anwser all the questions. Good luck!";
    startbox.appendChild(codeDescription)

    //creates and appends the button to start the quiz
    var startBtn = document.createElement("button");
    startBtn.className = 'btn btn-primary font-weight-bold';
    startBtn.textContent = "START";
    startBtn.id = "start_btn";
    startbox.appendChild(startBtn);

    //appends the introductory div to the main container
    content_box.appendChild(startbox);

    //when the start btn is pressed start quiz (start the quizStart func)
    startBtn.addEventListener("click", quizStart);
}


function quizStart(){

    //start the countdown, when it reaches zero end quiz by going to quizEnd() and stop the clock
    //also sets the text in countdown div with time left
    var myInterval = setInterval(function() {
        timeleft--;
        document.getElementById("countdown").textContent = 'Time: ' + timeleft;
    
         if (timeleft === 0 || quesNum == 10) {
             clearInterval(myInterval);
             document.getElementById("questionBox").remove();
             quizEnd();
         }
    }, 1000);

    //removes the introductory content
    document.querySelector("#introduction").remove();

    //creates new div to be filled with the quiz content called questionBox
    var questionBox = document.createElement("div");
    questionBox.className = "";
    questionBox.id = "questionBox";

    //creates empty h3 with id of question in questionBox
    var questionText = document.createElement("h3")
    questionText.id = "question";
    questionText.className = "my-3";
    questionBox.appendChild(questionText);

    //creates empty ordered list in questionBox
    var questionList = document.createElement("ol");
    questionList.setAttribute("type", "A");
    questionBox.appendChild(questionList);

    //creates empty p in questionBox
    var resultNoti = document.createElement("p");
    resultNoti.id = "NotiBox";
    questionBox.appendChild(resultNoti);

    //creates four list items that contain buttons for four anwser choices and add them to questionBox
    for(var i = 0; i < 4; i++){
        var anwserChoice = document.createElement("li");
        anwserChoice.className = "mt-2 font-weight-bold";
        
        var anwserChoiceBtn = document.createElement("button");
        anwserChoiceBtn.className = "btn btn-primary font-weight-bold";
        anwserChoiceBtn.id = i;
        anwserChoice.appendChild(anwserChoiceBtn);

        questionList.appendChild(anwserChoice);
    }

    //appends the questionBox to the main container
    content_box.appendChild(questionBox);

    //fill the questionBox content with the current question number
    quizPopulate();

    //when an anwser option gets clicked take me to what happens
    document.getElementById("questionBox").addEventListener("click", anwsertaskHandler);
};

function quizPopulate(){
    //if we go over all the questions end the quiz
    if(quesNum == 10){
        document.getElementById("questionBox").remove();
        quizEnd();
        return false;
    }

    //fill the h3 element with Question from the current quizQuestion object
    document.querySelector("#question").textContent = quizQuestions[quesNum].Question;

    //create a array with four integers and randomizes them
    var RandQues = [0,1,2,3];
    RandQues = RandQues.sort((a, b) => 0.5 - Math.random());

    //fill the four buttons we created with a random num 1-4 (0-3 really) from the options in our questions object
    document.getElementById("0").textContent = quizQuestions[quesNum].options[RandQues[0]];
    document.getElementById("1").textContent = quizQuestions[quesNum].options[RandQues[1]];
    document.getElementById("2").textContent = quizQuestions[quesNum].options[RandQues[2]];
    document.getElementById("3").textContent = quizQuestions[quesNum].options[RandQues[3]];

}

//what happens when I choose an anwser
function anwsertaskHandler(event){
    // if the chosen anwser matches the correct anwser add 10 to our score and increase quesNum to go to the next question
    // then populate the quizes again with the new information
        if(event.target.textContent == quizQuestions[quesNum].correct && event.target.className == "btn btn-primary font-weight-bold"){
            document.getElementById("NotiBox").textContent = "Correct!";
            score = score + 10;
            quesNum++;
            quizPopulate();
        }
    // if its wrong dont add to score and instead decrease remaining time by 10, but still add to quesNum and repopulate
        else if(event.target.textContent != quizQuestions[quesNum].correct && event.target.className == "btn btn-primary font-weight-bold"){
            document.getElementById("NotiBox").textContent = "Wrong!";
            quesNum++;
            timeleft = timeleft - 10;
            quizPopulate();
        }
}
// end screen of the quiz
function quizEnd(){
    // your score is equal to score plus timeleft
    score = score + timeleft;

    // shows user score
    var congrats = document.createElement("h3");
    congrats.className = "text-center";
    congrats.textContent = "Your score is :"+ score + "!";
    content_box.appendChild(congrats);

    //creates a form that will not refresh on submit
    var formEl = document.createElement("form");
    formEl.setAttribute("onsubmit", "return false");

    //empty div with styling
    var formGroup = document.createElement("div");
    formGroup.className = "form-group justify-content-center text-center";
    
    //label the form with instructions for submitting name, append to div
    var forumLabel = document.createElement("label")
    forumLabel.setAttribute("for", "name");
    forumLabel.textContent = "Save your initials to sumbit your score! (1-3 letters)";
    formGroup.appendChild(forumLabel);

    //a input box for entering name, append to div
    var inputEl = document.createElement("input");
    inputEl.setAttribute("type", "name");
    inputEl.className = "form-control my-3";
    inputEl.id = "InputInitals"
    inputEl.setAttribute("placeholder", "Your Initials");
    formGroup.appendChild(inputEl);

    //a submit button, append to div
    var submitBtn = document.createElement("button");
    submitBtn.setAttribute("type", "submit");
    submitBtn.className = "btn btn-primary";
    submitBtn.textContent = "Submit";
    formGroup.appendChild(submitBtn);

    //append div to form
    formEl.appendChild(formGroup);

    //append form to main container
    content_box.appendChild(formEl);

    //when you submit this will happen
    formEl.addEventListener("submit", saveHighscores);

}


function saveHighscores(event){

    //checks if input is a character between 1-3 length by
    //splitting the input and iterating through each index and checking if the character exist in the accceptance string
    // if it does not, a variable will be created with a value of 1
    var FormEl = event.target;
    var inputField = FormEl.querySelector("#InputInitals").value;
    var onlythese = "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM";
    var tempArr = inputField.split('');
    
    for (var i = 0; i < inputField.length; i++){
        if(onlythese.match(tempArr[i])){
        }
        else{
            var nope = 1;
        }
    }

    // checks if input is between 1-3 chracters long, and if nope is 1
    if (inputField.length == 0 || inputField.length > 3 || nope == 1) {
        alert("Enter only one to three characters!");
        return false;
      }

    // then input result is created so we can pass it into local storage
    var inputResult = event.target.querySelector("#InputInitals").value;
    var newData = {
        name: inputResult,
        grade: score
    };

    //after a new object is created with all the new information, push it into the object that contains all the scores
    scores.push(newData);
    //set the localStorage scores to the new updated scores that have been stringified,
    localStorage.setItem("scores", JSON.stringify(scores));

    //reload the page to reset the quiz
    location.reload();

}

