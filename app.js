const taskForm=document.getElementById("taskForm");
const taskInput=document.getElementById("taskInput");
const taskList=document.getElementById("taskList");
const deleteSelectedBtn=document.getElementById("deletSelectedBtn");

taskForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    addTask(taskInput.value.trim());
    taskInput.value="";
})

deleteSelectedBtn.addEventListener("click",()=>{
    const items = Array.from(taskList.querySelectorAll(".task-item"));
    let changed = false;
    items.forEach(li=>{
        const checkbox = li.querySelector("input[type=checkbox]");
        if((checkbox && checkbox.checked)){
            li.style.transition = "opacity 0.25s";
            li.style.opacity = "0";
            setTimeout(()=>{
                li.remove();
                saveTasks();
            },200)
            changed = true;
        }
    })
    if(changed) setTimeout(saveTasks,220);
});


function addTask(taskText){
    if(taskText==="") return;
    const li=createTaskElement(taskText,false);
    taskList.appendChild(li);
    li.style.opacity="0";
    setTimeout(()=>{
        li.style.opacity="1";
    },40);
    saveTasks();
}

function createTaskElement(text,completed){
    const li =document.createElement("li");
    li.className="task-item";
    li.style.poacity="1";

    const checkbox=document.createElement("input");
    checkbox.type="checkbox";
    checkbox.className="task-checkbox";
    checkbox.checked=completed;

    const span=document.createElement("span");
    span.className="task-text";
    span.textContent=text;

    checkbox.addEventListener("change",()=>{
        if(checkbox.checked){
            span.style.color="#b400ff";
            span.style.textDecoration="line-through";
            span.style.textShadow="0 0 7px #b400ffcc";
        }
        else{
            span.style.color="#fff";
            span.style.textDecoration="";
            span.style.textShadow="";
        }
        saveTasks();
    });

    if(completed){
        span.style.color="#b400ff";
        span.style.textDecoration="line-through";
        span.style.textShadow="0 0 7px #b400ffcc";
    }

    const deleteBtn=document.createElement("button");
    deleteBtn.className="delete-btn";
    deleteBtn.title="Deleted";
    deleteBtn.innerHTML = "&times;"

    deleteBtn.addEventListener("click",(e)=>{
        e.stopPropagation();
        li.style.transition= "opacity 0.25s";
        li.style.opacity="0";
        setTimeout(()=>{
            li.remove();
            saveTasks();
        },2000)
    });

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteBtn);

    return li;
}

function saveTasks(){
    const tasks = [];
    taskList.querySelectorAll(".task-item").forEach(li=>{
        tasks.push({
            text:li.querySelector(".task-text").textContent,
            completed: li.querySelector(".task-checkbox").checked
        });
    });
    localStorage.setItem("tasks",JSON.stringify(tasks));
}