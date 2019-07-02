var jstree = document.getElementById("tree").getElementsByTagName("ul")[0];
var jstreeleaf = document.getElementById("tree").getElementsByTagName("li");

for (let i=0;i<jstreeleaf.length;i++)
{
    let leaf = jstreeleaf[i];
    let span = document.createElement("span");

    leaf.insertBefore(span,leaf.firstChild);
    span.appendChild(span.nextSibling);
}

jstree.onclick = function (event)
{
    var target = event.target;

    if (target.tagName != "SPAN")
    {
        alert("click without span");
        return;
    }
    alert ("click with span");
    var treechild = document.createElement("ul");
    var leaf = document.createElement("li");
    var span = document.createElement("span");

    leaf.innerText = "Child";
    leaf.insertBefore(span,leaf.firstChild);
    span.appendChild(span.nextSibling);

    treechild.appendChild(leaf);
    target.appendChild(treechild);
}