var PressInfo = function (model, element){
    //console.log("PressInfo skapad!")
    model.addObserver(this)

  //Info is displayed when you scan a item


    this.update = function() {

        var g = model.getCurrentProductInfo();
        var b = model.getAllGroceries()
        if (g !== "") {
            while (element.firstChild) {
                element.removeChild(element.firstChild);
            }
            let groceryNode = document.createElement("ons-card");
            var topRow = document.createElement("div");
            var topTitle = document.createElement("div");
            var topImg = document.createElement("div");

            topRow.className = "row infoCardTop mb-2";
            topTitle.className = "col-8 mb-auto mt-auto";
            topImg.className = "col-4";


            var img = document.createElement("IMG")
            img.className = "productImg h-100"
            img.setAttribute("src",g.img)
            



            //TABLE OF CONTENTS
            //
            var productTable = document.createElement("table");
            productTable.className = "table table-borderless";
            var tableBody = document.createElement("tbody");
            var tableRow1 = document.createElement("tr");
            var tableRow2 = document.createElement("tr");
            var tableRow3 = document.createElement("tr");
            var tableRow4 = document.createElement("tr");
            var tableRow5 = document.createElement("tr");
            var tableRow6 = document.createElement("tr");
            
            var tablePriceHead = document.createElement("th");
            var tablePriceValue = document.createElement("td");
            var tablePriceHeadText = document.createTextNode("Price: ")
            var tablePriceValueText = document.createTextNode(g.price + " kr")

            var tableLocationHead = document.createElement("th");
            var tableLocationValue = document.createElement("td");
            var tableLocationHeadText = document.createTextNode("Location: ")
            var tableLocationValueText = document.createTextNode("Aisle " + g.aisle + ", Shelf " + g.shelf)

            var tableSectionHead = document.createElement("th");
            var tableSectionValue = document.createElement("td");
            var tableSectionHeadText = document.createTextNode("Section: ");
            var tableSectionValueText = document.createTextNode(g.section.charAt(0).toUpperCase() + g.section.slice(1));

            var tableIngredientsHead = document.createElement("th");
            var tableIngredientsValue = document.createElement("td");
            var tableIngredientsHeadText = document.createTextNode("Ingredients: ")
            var tableIngredientsValueText = document.createTextNode(g.ingredients)

            var tableAllergenesHead = document.createElement("th");
            var tableAllergenesValue = document.createElement("td");
            var tableAllergenesHeadText = document.createTextNode("Allergenes: ")
            var tableAllergenesValueText = document.createTextNode(g.allergenes)

            var tableEnergyHead = document.createElement("th");
            var tableEnergyValue = document.createElement("td");
            var tableEnergyHeadText = document.createTextNode("Energy: ")
            var tableEnergyValueText = document.createTextNode(g.energy)
            
            tableRow1.appendChild(tablePriceHead)
            tableRow1.appendChild(tablePriceValue)
            tablePriceHead.appendChild(tablePriceHeadText)
            tablePriceValue.appendChild(tablePriceValueText)

            tableRow2.appendChild(tableLocationHead)
            tableRow2.appendChild(tableLocationValue)
            tableLocationHead.appendChild(tableLocationHeadText)
            tableLocationValue.appendChild(tableLocationValueText)

            tableRow3.appendChild(tableSectionHead)
            tableRow3.appendChild(tableSectionValue)
            tableSectionHead.appendChild(tableSectionHeadText)
            tableSectionValue.appendChild(tableSectionValueText)

            tableRow4.appendChild(tableIngredientsHead)
            tableRow4.appendChild(tableIngredientsValue)
            tableIngredientsHead.appendChild(tableIngredientsHeadText)
            tableIngredientsValue.appendChild(tableIngredientsValueText)

            tableRow5.appendChild(tableAllergenesHead)
            tableRow5.appendChild(tableAllergenesValue)
            tableAllergenesHead.appendChild(tableAllergenesHeadText)
            tableAllergenesValue.appendChild(tableAllergenesValueText)

            tableRow6.appendChild(tableEnergyHead)
            tableRow6.appendChild(tableEnergyValue)
            tableEnergyHead.appendChild(tableEnergyHeadText)
            tableEnergyValue.appendChild(tableEnergyValueText)

            tableBody.appendChild(tableRow1);
            tableBody.appendChild(tableRow2);
            tableBody.appendChild(tableRow3);
            tableBody.appendChild(tableRow4);
            tableBody.appendChild(tableRow5);
            tableBody.appendChild(tableRow6);
            
            productTable.appendChild(tableBody);
            ///

            //DESCRIPTION
            //
            var descPar = document.createElement("p");
            var descParText = document.createTextNode(g.description);
            descPar.appendChild(descParText);
            //

            //TITLE
            //
            let groceriesTitle = document.createElement("h4");
            let groceriesSection = document.createElement("h6");
            groceriesSection.style.fontWeight = "bolder";
            //
            let groceriesDescription = document.createElement("p")
            let addButton = document.createElement("button");
            addButton.className = "btn btn-outline-success";
            addButton.setAttribute("onclick", "model.addToCart("+g.id+")");

            let successMessage = document.createElement("p");
            successMessage.setAttribute("id", "success-message");
            successMessage.className = "alert alert-success";
            successMessage.style.opacity = "0";
            
            let textNodeTitle = document.createTextNode(g.title);
            let textNodeDescription = document.createTextNode(g.description);
            let textNodedeButton = document.createTextNode("Add to cart");
            
            
            groceriesTitle.appendChild(textNodeTitle)
            topTitle.appendChild(groceriesTitle);
            topImg.appendChild(img)
            topRow.appendChild(topTitle);
            topRow.appendChild(topImg);

            
            groceriesDescription.appendChild(textNodeDescription);
            groceriesTitle.setAttribute("title", g.title);
            addButton.appendChild(textNodedeButton);

            groceryNode.appendChild(topRow);
            groceryNode.appendChild(productTable);
            groceryNode.appendChild(descPar);
            groceryNode.appendChild(addButton);
            groceryNode.appendChild(successMessage);
            element.appendChild(groceryNode);
        }
    }
this.update()

}
