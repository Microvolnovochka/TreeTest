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
    console.log(JSON.stringify(obj));
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
    
    function drawnod(treelement,parent)
    {
        var newUl = document.createElement("ul");
        var newLi = document.createElement("li");
        var div = document.createElement("div");
        var divplus = document.createElement("div");
        var divminus = document.createElement("div");
        var temparent;

        div.innerHTML = treelement.name;
        //div.style = zaglushka;
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

function createNod(target,treelement)
        {
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
        
function deleteNod(target,treelement)
        {
            function find (element,index,array)
            {
                if (element.name==target.id)
                return true;
                else 
                return false;
            }
            partarget=target.parentNode.parentNode.parentNode.getElementsByTagName("div")[0];
            if (treelement.name==partarget.id)
            {
                treelement.children.splice(treelement.children.findIndex(find),1)
            }
            else 
            {
                for (let i=0;i<treelement.children.length;i++)
                {
                    deleteNod(target,treelement.children[i]);
                }
            }
        }
