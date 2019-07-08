
const MAX = 10000;
var jstree = document.getElementById("tree");
var requestURL = 'data.json';
/*var request = new XMLHttpRequest();
request.open('GET',requestURL);
request.responseType = "json";
request.send();*/

fetch(requestURL)
  .then(function(response) {
    return response.json();
  })
  .then(function(obj) {
    visualtree(obj);
    jstree.onclick = function ( event ){
        var target = event.target;
        var parent = target.parentNode;

        if (target.tagName=="DIV"&&target.id=="plus")
        {
            jstree.innerHTML = " ";
            createNod(parent.getElementsByTagName("div")[0],obj);
            visualtree(obj);
        }
        else if (target.tagName=="DIV"&&target.id=="minus")
        {
            jstree.innerHTML = " ";
            deleteNod(parent.getElementsByTagName("div")[0],obj);
            visualtree(obj);
        }
        else if (target.tagName=="DIV")
        {
            let result = prompt ("Введите новое имя ветки");
            if (result!=null&&result!="")
            {
                alert(result);
                jstree.innerHTML = " ";
                renameNod(target,obj,result);
                visualtree(obj);
            }
        }
    }
    /*jstree.onmousedown = function (event){
        var target = event.target;
        if (target.tagName=="DIV"&&target.id!="plus"&&target.id!="minus")
        {
            //alert(target);
            let finaltaraget;
            let nadoli = false;
            let tempobj = findNod(target,obj);

            jstree.onmouseup = function(e) {
                finaltarget = e.target;
                if (finaltarget.tagName=="DIV"&&finaltarget.id!="plus"&&finaltarget.id!="minus")
                {nadoli = true;}
                //alert(e.target.id);
                document.onmousemove = null;
                jstree.onmouseup = null;
                if (nadoli)
                {
                    deleteNod(target,obj);
                    copyNod(finaltarget,tempobj,obj);
                    jstree.innerHTML = " ";
                    visualtree(obj);
                }
            }
        }
    }*/
  });


/*request.onload = function(){
    var obj;
    obj = request.response; 
    visualtree(obj);
    jstree.onclick = function (event)
    {
        var target = event.target;
        var parent = target.parentNode;

        if (target.tagName=="DIV"&&target.id=="plus")
        {
            jstree.innerHTML = " ";
            createNod(parent.getElementsByTagName("div")[0],obj);
            visualtree(obj);
        }
        else if (target.tagName=="DIV"&&target.id=="minus")
        {
            jstree.innerHTML = " ";
            deleteNod(parent.getElementsByTagName("div")[0],obj);
            visualtree(obj);
        }
    }
}*/

 function visualtree (obj) {
    if (typeof obj !="object")
    {return;}
    if (!obj)
    {return;}
    var parent = jstree;

    drawnod(obj,jstree);
    return 5;
    
    function drawnod(treelement,parent)
    {
        var newUl = document.createElement("ul");
        var newLi = document.createElement("li");
        var div = document.createElement("div");
        var divplus = document.createElement("div");
        var divminus = document.createElement("div");
        var temparent;

        div.innerHTML = treelement.name;
        div.id = treelement.name;
        newLi.appendChild(div);
        divplus.innerHTML = " +";
        divplus.id = "plus";
        newLi.appendChild(divplus);
        divminus.innerHTML = " -";
        divminus.id = "minus";
        newLi.appendChild(divminus);

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
}

function createNod(target,treelement){
    if (treelement.name==target.id)
    {
        treelement.children.push({name:(Math.floor(Math.random()*MAX)).toString(),children:[]});
        return;
    }
    else 
    {
        for (let i=0;i<treelement.children.length;i++)
        {
            createNod(target,treelement.children[i]);
        }
    }
}
        
function deleteNod(target,treelement){
    function find (element,index,array)
    {
        if (element.name==target.id)
        return true;
        else 
        return false;
    }
    partarget=target.parentNode.parentNode.parentNode;
    for (let i=0;i<partarget.children.length;i++)
    {
        if (Number(partarget.children[i].id))
        {
            partarget = partarget.children[i];
            break;
        }
    }
    if (treelement.name==partarget.id)
    {
        treelement.children.splice(treelement.children.findIndex(find),1)
        return;
    }
    else 
    {
        for (let i=0;i<treelement.children.length;i++)
        {
            deleteNod(target,treelement.children[i]);
        }
    }
}

function renameNod(target,treelement,newname){
    if (treelement.name==target.id)
    {
        treelement.name=newname;
        return;
    }
    else 
    {
        for (let i=0;i<treelement.children.length;i++)
        {
            renameNod(target,treelement.children[i],newname);
        }
    }
}

function findNod(target,treelement){
    if (treelement.name==target.id)
    {
        return treelement;
    }
    else 
    {
        for (let i=0;i<treelement.children.length;i++)
        {
            findNod(target,treelement.children[i]);
        }
    }
}

function copyNod(finaltarget,tempobj,treelement){
    if (finaltarget.name==treelement.name)
    {
        treelement.children.push(tempobj);
        return;
    }
    else
    {
        for (let i=0;i<treelement.children.length;i++)
        {
            copyNod(finaltarget,tempobj,treelement.children[i]);
        }
    }
}
