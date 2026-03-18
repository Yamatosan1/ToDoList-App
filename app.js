function createTaskElement(text,completed){
    const li =document.createElement("li");
    li.className="task-item";
    li.style.poacity="1";

    const checkbox=document.createElement("input");
    checkbox.type="checkbox";
    checkbox.className="task-checkbox";
    checkbox.checked=completed;

    const span=document.createElement("span");
    span.classname="task-text";
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