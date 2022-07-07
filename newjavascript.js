var tasks = [];
var draft = [];
loadpage();
setTheDate();

  if (!localStorage.pageLoadCount)
    localStorage.pageLoadCount = 0;
  localStorage.pageLoadCount = parseInt(localStorage.pageLoadCount) + 1;
  document.getElementById('count').textContent = localStorage.pageLoadCount;

function addNewTask(newTask, taskDoDate) {
            var note_container = document.querySelector('.note_container');
            var closeButton = document.createElement('button');
            closeButton.textContent = "✖";
            closeButton.classList.add('delete');
            
            closeButton.addEventListener('click', function(e) {
                var n = e.target.parentNode;
                tasks.splice(tasks.length-1 - $(".note").index(n), 1);
                var jsonTasks = JSON.stringify(tasks);
                localStorage.setItem("tasks", jsonTasks);
                //e.target.parentNode.classList.add('fade-out');
                n.parentNode.removeChild(n);
                console.log (localStorage);
            });

            var noteContent = document.createElement('div');
            noteContent.classList.add('noteContent');
            var task = document.createElement('span');
            task.classList.add('task');
            task.textContent = newTask;
            noteContent.appendChild(task);
            var date = document.createElement('div');
            date.classList.add('date');
            date.textContent = taskDoDate;
            noteContent.appendChild(date);

            var note = document.createElement('div');
            note.classList.add('note');
            //note.classList.add('fade-out');

            //apend all elements
            note.appendChild(closeButton);
            note.appendChild(noteContent);
            //note_container.appendChild(note);
            $(".note_container").prepend(note);
            console.log (localStorage);
}

function addNewTask_old(keys) {
    var note_container = document.querySelector('.note_container');
    var closeButton = document.createElement('button');
    closeButton.textContent = "✖";
    closeButton.classList.add('delete');

    var note = document.createElement('div');
    note.classList.add('note');
    note.classList.add('fade-out');

    var noteContent = document.createElement('div');
    noteContent.classList.add('noteContent');

    var task = document.createElement('span');
    task.classList.add('task');
    task.textContent = keys[0].newTask;
    noteContent.appendChild(task);

    var date = document.createElement('div');
    date.classList.add('date');
    date.textContent = keys[0].taskDoDate;
    noteContent.appendChild(date);

    //apend all elements
    note.appendChild(closeButton);
    note.appendChild(noteContent);
    note_container.appendChild(note);
    note_container.insertBefore(note, note_container.childNodes[0]);
}

// add to page and localstorage
document.querySelector('form').addEventListener('submit', function(e) { 
    var form = document.querySelector('form');
    var newTask = form.querySelector('textarea').value;
    var taskDoDate = form.querySelector('input[type="date"]').value;
    if (localStorage.getItem('tasks') !== null){
        tasks = JSON.parse(localStorage.getItem('tasks'));       
    }
    // enters localstorage
    tasks.push({
        newTask: newTask,
        taskDoDate: taskDoDate,
    });
 
    addNewTask(newTask, taskDoDate);
    var jsonTasks = JSON.stringify(tasks);
    localStorage.setItem("tasks", jsonTasks);
    setForm();//to clear
    e.preventDefault();
    return false;
});
// submit with enter button
$("textarea").keyup(function(e){
    if(e.keyCode == 13){
        $(".submit").click();
    }
});

 //save draft from textarea
function saveDraft(Draft, selector,TaskJsonDraft){ //for creating drafts
    var form = document.querySelector('form');
    var Draft = form.querySelector(selector).value;
    var jsonDraft = JSON.stringify(Draft);
    localStorage.setItem(TaskJsonDraft, jsonDraft);
}

function loadpage()
{
    var form = document.querySelector('form');
    var t = JSON.parse(localStorage.getItem('newDraft'));


    t = localStorage.getItem('tasks');
    if ( t !== null) {
        //var note_container = document.querySelector('.note_container');
        tasks = JSON.parse(localStorage.getItem('tasks'));

        for (var i = 0; i < tasks.length; i++)
            addNewTask(tasks[i].newTask, tasks[i].taskDoDate);
    }
}

// for loading last draft when form loaded
function loadDraft(newDraft, selector) { 
    var form = document.querySelector('form');
    if (localStorage.getItem(newDraft) !== null) {
        var newDraft = JSON.parse(localStorage.getItem(newDraft));
        form.querySelector(selector).value = newDraft;
    }
}


function setForm() { 
    var form = document.querySelector('form');
    form.querySelector('textarea').value = "";
}


//not working properly
function setTheDate() { 
    $(document).ready( function() {
    var now = new Date(); 
    var day = ("0" + now.getDate()).slice(-2);
    var month = ("0" + (now.getMonth() + 1)).slice(-2);
    var today = now.getFullYear()+"-"+(month)+"-"+(day) ;
   $('#date').val(today);
   });
}