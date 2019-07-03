var jstree = document.getElementById("tree");
var obj = 
    {
        name:"root",
        children:[
            {
                name:"a1",
                children:[
                    {
                        name:"a12",
                        children:[]
                    }
                ]
            },
            {
                name:"b1",
                children:[
                    {
                        name:"b11",
                        children:[]
                    },
                    {
                        name:"b12",
                        children:[]
                    }
                ]
            }
        ]
    }; //попытаться реализовать не массивом а объектом

var visualtree = function (obj) {
    if (typeof obj !="object")
    {return;}
    if (!obj)
    {return;}
    var parent = jstree;

    drawnod(obj,jstree);
    
    function drawnod(treelement,parent)
    {
        var newUl = document.createElement("ul");
        var newLi = document.createElement("li");
        var div = document.createElement("div");
        var divplus = document.createElement("div");
        var divminus = document.createElement("div");
        var temparent;

        div.innerHTML = treelement.name;
        //newLi.innerText = treelement.name;
        //newLi.id = treelement.name
        div.id = treelement.name;
        newLi.appendChild(div);
        divplus.innerHTML = " +";
        divplus.id = "plus";
        newLi.appendChild(divplus);
        divminus.innerHTML = " -";
        divminus.id = "minus";
        newLi.appendChild(divminus);
       // newUl.appendChild(div);
       // newUl.appendChild(newLi);
        //parent.appendChild (newUl);

        if (treelement.children[0])
        {
            temparent = parent;
            for (let i=0;i<treelement.children.length;i++)
            {
                drawnod(treelement.children[i],newLi);
            }
            parent = temparent;
        }
        newUl.appendChild(newLi);
        parent.appendChild (newUl);
    }
};

visualtree(obj);

jstree.onclick = function (event)//делать обработчик для всего дерева,а по таргету уже смотреть на кого именно нажали
{
    var target = event.target;
    var parent = target.parentNode;
    alert(target);
    alert(target.id);
    alert(parent);
    alert(parent.id);

    if (target.tagName=="DIV"&&target.id=="plus")
    {
        createNod(target);
    }
    function createNod(target){
        var newUl = document.createElement("ul");
        var newLi = document.createElement("li");
        var div = document.createElement("div");
        var divplus = document.createElement("div");
        var divminus = document.createElement("div");
        var parent = target.parentNode;

        div.innerHTML = parent.getElementsByTagName("div")[0].innerHTML + "0";
        div.id = parent.getElementsByTagName("div")[0].innerHTML + "0";
        newLi.appendChild(div);
        newUl.appendChild(newLi);
        parent.appendChild(newUl);


    }

   // event.stopPropagation();
}