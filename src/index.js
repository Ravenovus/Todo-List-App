import "./styles.css";
import { compareAsc, format } from "date-fns";
import {System} from "./System/system.js";
import { userInterface } from "./UI/UI.js";
import { Project } from "./System/Classes/project.js";
import { Task } from "./System/Classes/task.js";


//ACTUAL TODO : 
//start from drawing out the app
//shape it out in html and css
//create classes and arrays for projects and tasks
//check how storage works and how to check for existence

//TEMPORARY ACTIVATORS FOR DIALOGUES TO TEST
let projectdial = document.querySelector("#projectDialog");
let taskdial = document.querySelector("#taskDialog");


//projectdial.showModal(); - add button
//taskdial.showModal(); - add button and check if date is earlier than today (verify data)
let backEnd = new System();
let testProject = new Project("testProject", "test Date string");
let testTask = new Task("testTask", "low", "another test");

testProject.addTask(testTask);
backEnd.addProject(testProject);

userInterface.updateProjectList(backEnd.Projects);

let listOfClickables = document.getElementsByClassName("clickable");

for(var i = 0; i<listOfClickables.length; i++){
    listOfClickables[i].addEventListener("click", function(e){
        //backEnd.select(listOfClickables[i].id);
        console.log(e.target.id);
    })
}
