import {System} from "../System/system.js";
import { userInterface } from "../UI/UI.js";
import { Project } from "../System/Classes/project.js";
import { Task } from "../System/Classes/task.js";


//initial refactor from index to separate in order to clean index

export const organizerController = {
    init(){
        let backEnd = new System();
        let testProject = new Project("testProject", "test Date string");
        let testTask = new Task("testTask", "low", "another test");
        let testTask2 = new Task("testTask2", "low", "another test");
        let testTask3 = new Task("testTask3", "low", "another test");
        let testTask4 = new Task("testTask4", "low", "another test");
        let testTask5 = new Task("testTask5", "low", "another test");

        testProject.addTask(testTask);
        testProject.addTask(testTask2);
        testProject.addTask(testTask3);
        testProject.addTask(testTask4);
        testProject.addTask(testTask5);
        backEnd.addProject(testProject);

        userInterface.updateProjectList(backEnd.Projects);

        userInterface.updateTaskList(testProject.tasks);

        let listOfClickables = document.getElementsByClassName("clickable");

        for(var i = 0; i<listOfClickables.length; i++){
            listOfClickables[i].addEventListener("click", function(e){
                //backEnd.select(listOfClickables[i].id);
                console.log(e.target.id);
            })
        }
    }
}