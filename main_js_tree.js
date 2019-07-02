var jstree = document.getElementById("tree");
var obj =[ 
    {
    value: "root",
    gen: 0,
    children:2,
    childrenpointers: [1,2]
    },
    {
    value: "children",
    gen: 1,
    children: 1,
    childrenpointers: [3]
    },
    {
    value: "children",
    gen: 1,
    children: 0,
    childrenpointers: []
    },
    {
    value: "children",
    gen: 2,
    children: 0,
    childrenpointers: []
    }
];

(function visualtree (obj) {
    if (typeof obj !="object")
    {return;}
    if (!obj)
    {return;}
    var parent =jstree;

    drawnod(obj[0]);

    function drawnod (element){
        var newUl = document.createElement("ul");
        var newLi = document.createElement("li");
        var span = document.createElement("span");
        var divname = document.createElement("div");
        var divplus = document.createElement("div");
        var divminus = document.createElement("div");
        var temparent;

        /*if (0==element.gen)
        {
            newLi.innerText = element.value;
        }
        else 
        {
            newLi.innerText = element.value +" " + element.gen;
        }*/
        divname.innerHTML = element.value + " " + element.gen + " ";
        divplus.innerHTML = "+";
        divplus.id = "plus";
        divminus.innerHTML = " -";
        divminus.id="minus";
        newLi.appendChild(divname);
        newLi.appendChild(divplus);
        newLi.appendChild(divminus);
        newLi.insertBefore(span,newLi.firstChild);
        span.appendChild(span.nextSibling);
        newUl.appendChild(newLi);
        parent.appendChild(newUl);
        if (element.children)
        {
            temparent = parent;
            parent = newLi;
            for (let i=0;i<element.children;i++)
            {
                drawnod(obj[element.childrenpointers[i]]);
            }
            parent = temparent;
        }
        else
        {return;}
    }
})(obj);

document.getElementById("plus").onclick = function (event)
{
    var target = event.target;
    alert("plus");

    /*if (target.tagName != "SPAN")
    {
        return;
    }*/
    var treechild = document.createElement("ul");
    var leaf = document.createElement("li");
    var span = document.createElement("span");
    let plus = document.createElement("div");

    plus.id = "plus";
    plus.innerHTML="+";
    leaf.innerText = "Child";
    leaf.appendChild(plus);
    leaf.insertBefore(span,leaf.firstChild);
    span.appendChild(span.nextSibling);

    treechild.appendChild(leaf);
    target.appendChild(treechild);
}