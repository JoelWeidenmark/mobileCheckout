var Search = function (model, element){
  //Takes in input from user and display groceries
  //var search = document.getElementById("search")
  //var element = inelement.find("search");
  // var input = inelement.content.getElementById("myInput")

  // var node = document.createElement("ons-search-input");
  // node.setAttribute("placeholder", "Search");
  // node.setAttribute("style", "width: 99%;   margin: auto; display: block;");
  // node.setAttribute("value", "");
  // node.setAttribute("onchange", "setSearchFilter(this.value)");
  // node.setAttribute("id", "myInput");
  // element.appendChild(node);


  //console.log(element)
  model.addObserver(this);

  this.update = function(){

    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
    //var groceriesArray = model.getAllGroceries()
    var filterGroceries = model.getFilteredGroceries();
    //console.log("efter filtering: " + filterGroceries)
    filterGroceries.forEach(function(g){

      var groceryNode = document.createElement("ons-card");
      var wrappingRow = document.createElement("div");
      var textCol = document.createElement("div");
      var imgCol = document.createElement("div");

      wrappingRow.className = "row w-100 h-100";
      textCol.className = "col-8";
      imgCol.className = "col-4";


      groceryNode.setAttribute("id",g.id);
      groceryNode.setAttribute("class", "col-10 mx-auto")
      groceryNode.setAttribute("value",g);
      groceryNode.setAttribute("onclick","productInfoPage("+g.id+")");
      var groceriesTitle = document.createElement("h4");
      groceriesTitle.style.fontWeight = "100"
      var groceriesSection = document.createElement("h6");
      var textNodeTitle = document.createTextNode(g.title);
      var textNodeSection = document.createTextNode(g.section.charAt(0).toUpperCase() + g.section.slice(1));
      groceriesSection.className = "text-secondary";

      var img = document.createElement("IMG")
      img.className = "productImg"
      img.setAttribute("src",g.img)
      imgCol.appendChild(img)

      groceriesTitle.appendChild(textNodeTitle);
      groceriesSection.appendChild(textNodeSection);
      groceriesTitle.setAttribute("title", g.title);
      textCol.appendChild(groceriesTitle);
      textCol.appendChild(groceriesSection);

      wrappingRow.appendChild(textCol);
      wrappingRow.appendChild(imgCol);
      groceryNode.appendChild(wrappingRow);
      element.appendChild(groceryNode);

    })
  }
  this.update();
  //model.getFilteredGroceries("hello");
}
