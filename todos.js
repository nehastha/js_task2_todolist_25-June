let LIST = [], id = 0
const list = document.getElementById("list");
const input = document.getElementById("input");

let data = localStorage.getItem("TODO");
if (data) {
    LIST = JSON.parse(data);
    id = LIST.length;
    loadList(LIST);
} else
{
    LIST = [];
    id = 0;
}

function loadList(array)
{
    array.forEach(function (item)
    {
        addToDo(item.name,item.id,item.trash);
    });
}
function addToDo(toDo,id,trash)
{
    const position = "beforeEnd";
    const item = `<li class="flex">
    <h3 class ="text col-md-8" id = "text_${id}">${toDo}</h3>
                    <i class ="fa fa-edit col-md-2" id = "${id}"job="edit"></i>
                    <i class ="fa fa-trash sol-md-2" id = "${id}" job="delete"></i>
        </li>
                    

        `;
    list.insertAdjacentHTML(position, item);
  

}

var addButton = document.getElementById("btnAddToDo");

addButton.onclick=function ()
{
    // debugger;
    const toDo = document.getElementById("item").value;
    if (toDo) {
        addToDo(toDo, id, false);
        LIST.push({
            name: toDo,
            id: id,
            trash: false
        });
        localStorage.setItem("TODO", JSON.stringify(LIST));
        id++;
    } else
    {
        alert("Please enter some text in To Do");
    }
    document.getElementById("item").value = "";
};

function removeToDo(element)
{
    // debugger;
    var del = element.parentNode.parentNode.removeChild(element.parentNode);
    // LIST[element.id].trash = true;
    var data = localStorage.getItem("TODO");
    var list = JSON.parse(data);
    list.splice(del, 1);
    LIST = list;

    localStorage.setItem("TODO", JSON.stringify(LIST));

}
function editToDo(element)
{
   var tes= prompt("Please enter new value", "");
   LIST[element.id].name = tes;
   localStorage.setItem("TODO", JSON.stringify(LIST));
   document.getElementById("text_" + element.id).innerHTML = tes;

}
list.addEventListener("click", function (event)
{
    // debugger;
    const element = event.target;
    const elementJob = element.attributes.job.value;
    if (elementJob == "delete")
    {
        removeToDo(element);
    }
    else if(elementJob =="edit")
    {
        editToDo(element);
    }
    localStorage.setItem("TODO", JSON.stringify(LIST));

})