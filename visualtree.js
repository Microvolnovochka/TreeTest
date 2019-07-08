var jstree = document.createElement("div")
function visualtree (obj) {
    if (typeof obj !="object")
    {return;}
    if (!obj)
    {return;}
    var parent = jstree;

    drawnod(obj,jstree);
    return 3;
    
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

  module.exports = visualtree;