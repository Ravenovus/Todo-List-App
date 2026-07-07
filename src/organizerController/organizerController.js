import {System} from "../System/system.js";
import { userInterface } from "../UI/UI.js";
import { Project } from "../System/Classes/project.js";
import { Task } from "../System/Classes/task.js";



export const organizerController = {

    init(){
        let testProject = new Project("testProject", "test Date string");
        let testTask = new Task("testTask", "Medium", "another test");       

        testProject.addTask(testTask);
        System.addProject(testProject);

        

        userInterface.updateProjectList(System.Projects);

        userInterface.updateTaskList(testProject.tasks);

        userInterface.updateProjectHeader(System.getCurrentProject());

        this.addListeners();

        
    },

    addListeners(){
        document.querySelector("#newProjectButton").addEventListener(
            "click", function(){
                userInterface.openProjectDialog();
            }
        )
        document.querySelector("#cancelProjectAddition").addEventListener(
            "click", function(){
                userInterface.closeProjectDialog();
            }
        )
        document.querySelector("#commitNewProject").addEventListener(
            "click", function(){
                let projectInformation = userInterface.readNewProjectModal();
                if(typeof(projectInformation) == "number"){
                    console.log("WRONG INFO");
                    return;
                }
                System.handleNewProject(projectInformation);
                updateProjectListSequence();
                updateTaskListSequence();
                userInterface.closeProjectDialog();
            }
        )

        document.querySelector("#newTaskButton").addEventListener(
            "click", function(){
                userInterface.openTaskDialog();
            }
        )

        document.querySelector("#cancelTaskEdit").addEventListener(
            "click", function(){
                userInterface.closeTaskEditDialog();
            }
        )

        document.querySelector("#cancelTaskAddition").addEventListener(
            "click",function(){
                userInterface.closeTaskDialog();
            }
        )
        document.querySelector("#addTaskButton").addEventListener(
            "click", function(){
                let taskInformation = userInterface.readTaskModal();
                console.log(typeof(taskInformation));
                if(typeof(taskInformation) == "number"){
                    console.log("WRONG INFO");
                    return;
                }
                System.handleTaskInsertion(taskInformation);
                updateTaskListSequence();
                userInterface.closeTaskDialog();
                
            }
        )

        document.querySelector("#editTaskButton").addEventListener(
            "click", function(){
                let taskInformation = userInterface.readTaskEditModal();
                console.log(typeof(taskInformation));
                if(typeof(taskInformation) == "number"){
                    console.log("WRONG INFO");
                    return; //Temp form check to be made proper later
                }
                System.handleTaskEdit(taskInformation);
                updateTaskListSequence();
                userInterface.closeTaskEditDialog();
            }
        )

        document.querySelector(".confirmTaskDeletion").addEventListener(
            "click", function(e){
                System.handleTaskDelete(e.target.id);
                userInterface.closeTaskDeleteDialog();
                updateTaskListSequence();
            }
        )

        document.querySelector(".cancelTaskDeletion").addEventListener(
            "click", function(){
                userInterface.closeTaskDeleteDialog();
            }
        )

        document.querySelector("#deleteProject").addEventListener(
            "click", function(){
                if(System.getCurrentProject()){
                    userInterface.openProjectDeleteDialog();
                }
            }
        )

        document.querySelector(".cancelProjectDeletion").addEventListener(
            "click", function(){
                userInterface.closeProjectDeleteDialog();
            }
        )

        document.querySelector(".confirmProjectDeletion").addEventListener(
            "click", function(){
                System.removeProject(System.getCurrentProject().id)
                updateProjectListSequence();
                updateTaskListSequence();
                userInterface.closeProjectDeleteDialog();

            }
        )

        document.querySelector("#editProject").addEventListener(
            "click", function(){
                if(System.getCurrentProject()){
                    userInterface.openProjectEditDialog(System.getCurrentProject())
                }
            }
        )

        document.querySelector("#cancelProjectEdit").addEventListener(
            "click", function(){
                userInterface.closeProjectEditDialog();
            }
        )

        document.querySelector("#commmitProjectEdit").addEventListener(
            "click", function(){
                let projectInformation = userInterface.readProjectEditModal();
                if (projectInformation == -1){
                    console.log("wrong info");
                    return;
                }
                System.handleProjectEdit(projectInformation);
                userInterface.closeProjectEditDialog();
                updateProjectListSequence();
            }
        )



        let listOfClickables = document.getElementsByClassName("clickable");
        for(var i = 0; i<listOfClickables.length; i++){
            listOfClickables[i].addEventListener("click", function(e){
                console.log(e.target.id);
            })
        }

        updateEditDeleteTaskListeners();




        function updateTaskListSequence() {
            let tasklist = null;
            if (System.getCurrentProject()){
                tasklist = System.getCurrentProject().tasks;
            }
            userInterface.updateTaskList(tasklist);
            updateEditDeleteTaskListeners();
        }

        function updateEditDeleteTaskListeners() {
            let listOfEditButtons = document.getElementsByClassName("editButton");
            let listOfDeleteButtons = document.getElementsByClassName("deleteButton");
            for (var i = 0; i < listOfEditButtons.length; i++) {
                listOfEditButtons[i].addEventListener("click", function (e) {
                    let taskToEdit = System.findTaskById(e.target.parentNode.parentNode.id);
                    userInterface.openTaskEditDialog(taskToEdit);
                });
                listOfDeleteButtons[i].addEventListener("click", function(e){
                    userInterface.openTaskDeleteDialog();
                    document.querySelector(".confirmTaskDeletion").id = e.target.parentNode.parentNode.id;
                    
                })
            }
        }

        function updateProjectListSequence(){
            userInterface.updateProjectList(System.Projects);
            userInterface.updateProjectHeader(System.getCurrentProject());
            updateProjectListeners();
        }

        function updateProjectListeners(){
            let listOfProjects = document.getElementsByClassName("projectItem");
            for (var i = 0; i<listOfProjects.length;i++){
                listOfProjects[i].addEventListener("click", function (e){
                    System.select(e.target.id);
                    userInterface.updateProjectHeader(System.getCurrentProject());
                    updateTaskListSequence();
                });
            }
        }

    }

}