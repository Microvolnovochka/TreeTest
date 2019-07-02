var jstree = document.getElementsByTagName("ul")[0];
var jstreeleaf = document.getElementsByTagName("li");

for (let i=0;i<jstreeleaf.length;i++)
{
    var leaf = jstreeleaf[i];

    var span = document.createElement("span");
    leaf.insertBefore(span,leaf.firstChild);
    span.appendChild(span.nextSibling);
}