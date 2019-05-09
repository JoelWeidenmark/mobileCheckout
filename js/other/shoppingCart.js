var ShoppingCart = function (model, element, currenUser){
  //Shopping cart of the items that the user have added (stored in model)
  model.addObserver(this);

  this.update = function(){
    var counter = 0;
    var skipper = false;
    var nameSaver = [];
    
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }

    

    var shoppingCart = model.returnShoppingCart(currenUser);


    for (var i=0; i < shoppingCart.length; i++){
      for(var k=0; k<shoppingCart.length; k++){
        if(shoppingCart[i].title == shoppingCart[k].title){
          counter = counter + 1;
        }
      }
      for(var z = 0; z<nameSaver.length; z++){
        if (shoppingCart[i].title == nameSaver[z]){
          skipper = true
          counter = 0;
        }
      }

      if(skipper){
        //Do Nothing
        skipper = false;
      }
      else{
        var card = document.createElement("ons-card")
        card.className = "col-10 mx-auto cardSize"
        var info = document.createElement("div")
        info.className = "col-12 mx-auto"
        var row = document.createElement("div")
        row.className = "row h-100"
        var col1 = document.createElement("div")
        col1.className = "col-4 p-0"
        var col2 = document.createElement("div")
        col2.className = "col-5"
        var col3 = document.createElement("div")
        col3.className = "col-3"

        var row2 = document.createElement("div")
        row2.className = "row mt-1"


        // IMAGE INSERT
        var img = document.createElement("IMG")
        img.className = "productImg"
        img.setAttribute("src",shoppingCart[i].img)
        col1.appendChild(img)


        //  TITLE INSERT
        var titleDiv = document.createElement("div")
        titleDiv.className = "row"
        var p = document.createElement("p")
        p.className = "m-0 font-weight-bold mt-2"
        var title = document.createTextNode(shoppingCart[i].title)
        p.append(title)
        titleDiv.appendChild(p)
        col2.appendChild(titleDiv)
        //

        // // PRICE EACH
        var priceDiv = document.createElement("div")
        priceDiv.className = "row align-right"
        var p = document.createElement("p")
        p.className = "m-0 text-secondary mt-2"
        var price = document.createTextNode(counter + " x " + (shoppingCart[i].price) + " kr")
        p.appendChild(price)
        priceDiv.appendChild(p)
        col2.appendChild(priceDiv)
        

        // // AMOUNT INSERT 2.0
        var amountDiv = document.createElement("div")
        amountDiv.className = "row align-content-right"
        var p = document.createElement("p")
        p.className = "m-0 font-weight-bold mt-2"
        var amount = document.createTextNode((shoppingCart[i].price * counter) + " kr")
        p.appendChild(amount)
        amountDiv.appendChild(p)
        col3.appendChild(amountDiv)



        // // REMOVE BUTTON INSERT
        var removeDiv = document.createElement("div")
        removeDiv.className = "row"
        var remove = document.createElement("ons-icon")
        remove.setAttribute("icon","fa-trash")
        remove.className = "text-secondary mt-2"
        //console.log("Här är ett object"+shoppingCart[i].id)
        remove.setAttribute("onClick", "model.runRemove(" + shoppingCart[i].id + ")")
        removeDiv.appendChild(remove)
        col3.appendChild(removeDiv)

        //
        // // PRICE TOTAL

        /*
        var priceDiv = document.createElement("div")
        priceDiv.className = "row"
        var p = document.createElement("p")
        p.className = "m-0 text-secondary"
        var price = document.createTextNode(counter + " x " + (shoppingCart[i].price))
        p.appendChild(price)
        priceDiv.appendChild(p)
        col3.appendChild(priceDiv)
        */
        
        //

        /*
        // // REMOVE BUTTON INSERT
        var removeDiv = document.createElement("div")
        removeDiv.className = "col-1"
        var remove = document.createElement("ons-icon")
        remove.setAttribute("icon","fa-trash")
        //console.log("Här är ett object"+shoppingCart[i].id)
        remove.setAttribute("onClick", "model.runRemove(" + shoppingCart[i].id + ")")
        removeDiv.appendChild(remove)
        row.appendChild(removeDiv)
        */

        /*
        // // AMOUNT INSERT
        var amountDiv = document.createElement("div")
        amountDiv.className = "col-12"
        var p = document.createElement("p")
        p.className = "m-0"
        var amount = document.createTextNode("Amount: " + counter  + " Price each: " + shoppingCart[i].price)
        p.appendChild(amount)
        amountDiv.appendChild(p)
        row.appendChild(amountDiv)
        */
        
        // // ADD TO TOTAL PRICE
        // totalPrice += shoppingCart[i].price
        //info.appendChild(row)
        //info.appendChild(row2)
        row.appendChild(col1)
        row.appendChild(col2)
        row.appendChild(col3)
        info.appendChild(row)
        card.appendChild(info)
        element.appendChild(card)
        nameSaver.push(shoppingCart[i].title);
        counter = 0;
        skipper = false;
        //console.log(element);

      }

    }

    // // ADD TOTAL PRICE TO BOTTOM
    // var item = document.createElement("on-list-item")
    // item.className = "list-item"
    // var totalPriceField = document.createElement("div")
    // totalPriceField.className = "right list-item__right"
    // p = document.createElement("p")
    // p.appendChild(totalPrice)
    // totalPriceField.appendChild(p)
    // item.append(totalPriceField)
    // element.appendChild(item)
    // console.log("Elementet efter update: "+item)
  }
this.update();

}
