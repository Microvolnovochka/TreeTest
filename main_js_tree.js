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
    }; 

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
};

visualtree(obj);

/*jstree.onmouseup = function (event)
{
    alert(event.target);
}*/

jstree.onclick = function (event)
{
    var target = event.target;
    var parent = target.parentNode;
    /*alert(target);
    alert(target.id);
    alert(parent);
    alert(parent.getElementsByTagName("div")[0].parentNode.parentNode.parentNode.getElementsByTagName("div")[0].id);*/

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


    function createNod(target,treelement)
    {
        if (treelement.name==target.id)
        {
            treelement.children.push({name:"created",children:[]});
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
    function find (element,index,array)
    {
        if (element==target.id)
        return true;
        else 
        return false;
    }
   // event.stopPropagation();
}