let todos = [];

let form = document.querySelector('#new');
// var editForm = document.getElementById('#edit');
// var editInput = document.getElementById('#fval')

form.onsubmit = function (e) {
    e.preventDefault ()
    let data = document.querySelector('#f1').value 
    if (!data.length) {
        return false
    }
    var todo = {
        id: new Date().getTime(),
        title : data
    }
        todos.push(todo)
        console.log(todo);
        renderForm();
        form.reset()
}

let container = document.querySelector('#todo_container');
let task_container = document.querySelector('#tasks')
function renderForm(){
    
    if(todos.length){
        var content = ""
        todos.reverse().forEach(todo => {
            content += `
            <div class="todo_content">
                <div> 
                    <input type="checkbox" class="checkbox" id="${todo.id}" />
                    <label for="${todo.id}"> ${todo.title} </label> 
                </div>
                <div class="action_btn">
                    <div class="pencil" onClick = edit(${todo.id})>&#9998;</div>
                    <div class="trash" onClick = deleting(${todo.id}) name="delete">&#x1F5D1;</div>
                </div>
            </div>
            `
            container.innerHTML = content
            task_container.appendChild(container)
        }) 

        
    }
   
}

renderForm()

//var currentTodo = {}
// function edit (id){
//     todos.forEach(function(todo){
//         if(todo.id==id) {
//             currentTodo = todo
//         }
//     })

//     editInput.value = currentTodo.title
// }

// editForm.onsubmit=function(e){
//     e.preventDefault();
//     if (!editInput.value.length) {
//         return
//     }
//     currentTodo.title = editInput.value
//     var index = todos.findIndex(todo=>todo.id=currentTodo.id)
//     todos.splice(index,1,currentTodo)
//     renderForm()
//     editvalue.reset();
// }

