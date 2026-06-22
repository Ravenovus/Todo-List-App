
//turn into init() but globaly somehow
//use CSS to mark selection 
export const userInterface ={
    
    //projectList: document.getElementsByClassName("ProjectList"),
    tastWindow: document.querySelector(".TaskWindow"),


    updateProjectList(projects){
        let projectList = document.querySelector(".ProjectList");
        projects.forEach(project => {
            let newItem = document.createElement("div");
            newItem.classList.add("projectItem");
            newItem.classList.add("clickable");
            newItem.id = project.projectId;
            newItem.textContent = project.name;
            //add click property to each 
            projectList.appendChild(newItem);
        });
    }
}