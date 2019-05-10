var BeaconApp = function (model, element){

	// JavaScript code for the Arduino Beacon example app.

	// Application object.
	var app = {}


	// Regions that define which page to show for each beacon.
	app.beaconRegions =
	[
		{
			id: 'milk',
			uuid:'B9407F30-F5F8-466E-AFF9-25556B57FE6D',
			major: 22460,
			minor: 60720,

		},
		{
			id: 'bulgur',
			uuid:'B9407F30-F5F8-466E-AFF9-25556B57FE6D',
			major: 57356,
			minor: 14220
		}/*
		{
			id: 'page-feet',
			uuid:'B9407F30-F5F8-466E-AFF9-25556B57FE6D',
			major: 46146,
			minor: 34612
		}*/
	]

	// Currently displayed page.

	app.currentPage = 'page-default'


	app.initialize = function()
	{	
		document.addEventListener(
			'deviceready',
			app.onDeviceReady,
			false)
		app.gotoPage(app.currentPage)
	}

	// Called when Cordova are plugins initialised,
	// the iBeacon API is now available.
	app.onDeviceReady = function()
	{
		// Specify a shortcut for the location manager that
		// has the iBeacon functions.
		window.locationManager = cordova.plugins.locationManager

		// Start tracking beacons!
		app.startScanForBeacons()
	}

	app.startScanForBeacons = function()
	{

		//console.log('startScanForBeacons')

		// The delegate object contains iBeacon callback functions.
		var delegate = new cordova.plugins.locationManager.Delegate()

		delegate.didDetermineStateForRegion = function(pluginResult)
		{
			//console.log('didDetermineStateForRegion: ' + JSON.stringify(pluginResult))
		}

		delegate.didStartMonitoringForRegion = function(pluginResult)
		{
			//console.log('didStartMonitoringForRegion:' + JSON.stringify(pluginResult))
		}

		delegate.didRangeBeaconsInRegion = function(pluginResult)
		{
			//console.log('didRangeBeaconsInRegion: ' + JSON.stringify(pluginResult))
			app.didRangeBeaconsInRegion(pluginResult)
		}

		// Set the delegate object to use.
		locationManager.setDelegate(delegate)

		// Start monitoring and ranging our beacons.
		for (var r in app.beaconRegions)
		{
			var region = app.beaconRegions[r]

			var beaconRegion = new locationManager.BeaconRegion(
				region.id, region.uuid, region.major, region.minor)

			// Start monitoring.
			locationManager.startMonitoringForRegion(beaconRegion)
				.fail(console.error)
				.done()

			// Start ranging.
			locationManager.startRangingBeaconsInRegion(beaconRegion)
				.fail(console.error)
				.done()
		}
	}

	// Display pages depending of which beacon is close.
	app.didRangeBeaconsInRegion = function(pluginResult)
	{
		//console.log('numbeacons in region: ' + pluginResult.beacons.length)

		// There must be a beacon within range.
		if (0 == pluginResult.beacons.length)
		{
			return
		}

		// Our regions are defined so that there is one beacon per region.
		// Get the first (and only) beacon in range in the region.
		var beacon = pluginResult.beacons[0]

		// The region identifier is the page id.
		var pageId = pluginResult.region.identifier
		//onsole.log('Bajs')
		//console.log(pageId)


		//console.log('ranged beacon: ' + pageId + ' ' + beacon.proximity)
		//if ((beacon.proximity == 'ProximityImmediate' )
		//&& app.currentPage == 'page-default')
		 //app.currentPage == pageId)

		// If the beacon is close and represents a new page, then show the page.
		if (beacon.proximity == 'ProximityImmediate' || beacon.proximity == 'ProximityNear')
		{
			//app.gotoPage(pageId)
			//Milk id 49993
			//bulgur id 537176
			var productInfo = model.getScannedProduct(537176)
			console.log(productInfo)

			app.printPage(productInfo)
			//model.setPage()
			return
		}

	// If the beacon represents the current page but is far away,
	// then show the default page.
		if (beacon.proximity == 'ProximityFar')
		{
			//sapp.scanForNewProduct();

			//app.gotoPage('page-default')
			//console.log('Macka	')
			return
		}
	}

	app.printPage = function(g){
		console.log(g);
		if (g !== "") {
			while (element.firstChild) {
                element.removeChild(element.firstChild);
            }
			let groceryNode = document.createElement("ons-card");
			groceryNode.className = "col-10 ml-auto mr-auto"
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

			/*
            while (element.firstChild) {
                element.removeChild(element.firstChild);
            }
            var groceryNode = document.createElement("ons-card");

            //var string = "productInfoPage("+g+")";
            //groceryNode.setAttribute("onclick","productInfoPage("+g.id+")");
            var groceriesTitle = document.createElement("h4");
            var groceriesSection = document.createElement("h6");
            var groceriesDescription = document.createElement("h8");
            var addButton = document.createElement("button");
            addButton.className = "btn btn-outline-success";
            addButton.setAttribute("onclick", "model.addToCart("+g.id+")");
            //addButton.setAttribute("onclick", "catchAddToCart("+g.id+")");
            var successMessage = document.createElement("p");
            successMessage.setAttribute("id", "success-message");
            successMessage.className = "alert alert-success";
            successMessage.style.display = "none";
            
            var img = document.createElement("IMG")
      		img.className = "productImg"
      		img.setAttribute("src",g.img)

           	//var clearButton = document.createElement("button");
            //clearButton.className = "btn btn-outline-success";
            //clearButton.setAttribute("onclick", "model.restartScan(this)";


            //console.log("gid!! " + g.id)

            var textNodeTitle = document.createTextNode(g.title);
            var textNodeSection = document.createTextNode("Section: "+ g.section);
            var textNodeDescription = document.createTextNode(g.description);
            var textNodedeButton = document.createTextNode("Add to cart");


            groceriesDescription.appendChild(textNodeDescription);
            groceriesTitle.appendChild(textNodeTitle);
            groceriesSection.appendChild(textNodeSection);
            groceriesTitle.setAttribute("title", g.title);
            addButton.appendChild(textNodedeButton);

            groceryNode.appendChild(groceriesTitle);
            groceryNode.appendChild(groceriesSection);
            groceryNode.appendChild(img)
            groceryNode.appendChild(groceriesDescription);
            groceryNode.appendChild(addButton)
            groceryNode.appendChild(successMessage)
            //groceryNode.appendChild(clearButton)
			element.appendChild(groceryNode);*/
        }



	}

	app.temp = function(){
		var productInfo = model.getScannedProduct(537176)
		//console.log(productInfo)

		app.printPage(productInfo)

	}

	

	// Set up the application.

	this.startScanning = function(){
		window.locationManager = cordova.plugins.locationManager

		// Start tracking beacons!
		element.innerHTML = '<h5 class="center header"> Scan a product</h5>'
		//app.temp();
		//var productInfo = model.getScannedProduct(537176)
        //app.printPage(productInfo)
        console.log("Ba")
		app.startScanForBeacons()
		//app.initialize()
	}
}