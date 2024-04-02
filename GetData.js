function getInfoAndPhotos()
{
	//https://services3.arcgis.com/4LOAHoFXfea6Y3Et/ArcGIS/rest/services/ParcelViewer_AscendGisinfo_View/FeatureServer/0
	var url = "https://services3.arcgis.com/4LOAHoFXfea6Y3Et/ArcGIS/rest/services/ParcelViewer_AscendGisinfo_View/FeatureServer/0/query?where=parcel_number%3D%27" + parcelnum + "%27&outFields=*&f=pjson";
	// re-initialize photo variables here
	photoCount = 0;
	photos_array = [];

	fetch(url).then(data => data.json()).then((result) =>
	{
		/////////////// BASIC INFORMATION ///////////////
		var obj1 = JSON.stringify(result);
		var obj2 = JSON.parse(obj1);
		if(obj2.features[0] === null)
		{
			document.getElementById("lblParcelNum").innerHTML = parcelnum;
			document.getElementById("lblSitusAddr").innerHTML = "Data for this parcel is currently under development";
			document.getElementById("lblSitusCityStateZip").innerHTML = "Data for this parcel is currently under development";
			document.getElementById("lblLotSize").innerHTML = "N/A";
			document.getElementById("lblBldgSqFt").innerHTML = "N/A";
			document.getElementById("lblNumBR").innerHTML = "N/A";
			document.getElementById("lblNumBaths").innerHTML = "N/A";
			document.getElementById("lblYearBuilt").innerHTML = "N/A";
			document.getElementById("lblTCA").innerHTML = "N/A";
			document.getElementById("lblUseCode").innerHTML = "N/A";
			document.getElementById("lblExemption").innerHTML = "N/A";
			document.getElementById("lblLegalDescr").innerHTML = "Data for this parcel is currently under development";
			document.getElementById("lblYear0").innerHTML = "N/A";
			document.getElementById("lblYear1").innerHTML = "N/A";
			document.getElementById("lblYear2").innerHTML = "N/A";
			document.getElementById("lblYear3").innerHTML = "N/A";
			/*document.getElementById("lblYear0AgLand").innerHTML = "N/A";
			document.getElementById("lblYear0CommLand").innerHTML = "N/A";
			document.getElementById("lblYear0ResLand").innerHTML = "N/A";
			document.getElementById("lblYear0AgImp").innerHTML = "N/A";
			document.getElementById("lblYear0CommImp").innerHTML = "N/A";
			document.getElementById("lblYear0ResImp").innerHTML = "N/A";
			document.getElementById("lblYear0AgNC").innerHTML = "N/A";
			document.getElementById("lblYear0CommNC").innerHTML = "N/A";
			document.getElementById("lblYear0ResNC").innerHTML = "N/A";*/
			document.getElementById("lblYear0TMV").innerHTML = "N/A";
			document.getElementById("lblYear0TAV").innerHTML = "N/A";
			document.getElementById("lblYear0TTV").innerHTML = "N/A";
			/*document.getElementById("lblYear1AgLand").innerHTML = "N/A";
			document.getElementById("lblYear1CommLand").innerHTML = "N/A";
			document.getElementById("lblYear1ResLand").innerHTML = "N/A";
			document.getElementById("lblYear1AgImp").innerHTML = "N/A";
			document.getElementById("lblYear1CommImp").innerHTML = "N/A";
			document.getElementById("lblYear1ResImp").innerHTML = "N/A";
			document.getElementById("lblYear1AgNC").innerHTML = "N/A";
			document.getElementById("lblYear1CommNC").innerHTML = "N/A";
			document.getElementById("lblYear1ResNC").innerHTML = "N/A";*/
			document.getElementById("lblYear1TMV").innerHTML = "N/A";
			document.getElementById("lblYear1TAV").innerHTML = "N/A";
			document.getElementById("lblYear1TTV").innerHTML = "N/A";
			/*document.getElementById("lblYear2AgLand").innerHTML = "N/A";
			document.getElementById("lblYear2CommLand").innerHTML = "N/A";
			document.getElementById("lblYear2ResLand").innerHTML = "N/A";
			document.getElementById("lblYear2AgImp").innerHTML = "N/A";
			document.getElementById("lblYear2CommImp").innerHTML = "N/A";
			document.getElementById("lblYear2ResImp").innerHTML = "N/A";
			document.getElementById("lblYear2AgNC").innerHTML = "N/A";
			document.getElementById("lblYear2CommNC").innerHTML = "N/A";
			document.getElementById("lblYear2ResNC").innerHTML = "N/A";*/
			document.getElementById("lblYear2TMV").innerHTML = "N/A";
			document.getElementById("lblYear2TAV").innerHTML = "N/A";
			document.getElementById("lblYear2TTV").innerHTML = "N/A";
			/*document.getElementById("lblYear3AgLand").innerHTML = "N/A";
			document.getElementById("lblYear3CommLand").innerHTML = "N/A";
			document.getElementById("lblYear3ResLand").innerHTML = "N/A";
			document.getElementById("lblYear3AgImp").innerHTML = "N/A";
			document.getElementById("lblYear3CommImp").innerHTML = "N/A";
			document.getElementById("lblYear3ResImp").innerHTML = "N/A";
			document.getElementById("lblYear3AgNC").innerHTML = "N/A";
			document.getElementById("lblYear3CommNC").innerHTML = "N/A";
			document.getElementById("lblYear3ResNC").innerHTML = "N/A";*/
			document.getElementById("lblYear3TMV").innerHTML = "N/A";
			document.getElementById("lblYear3TAV").innerHTML = "N/A";
			document.getElementById("lblYear3TTV").innerHTML = "N/A";
			firstowner.style.display = "none";
			secondowner.style.display = "none";
			otherowners.style.display = "none";
			document.getElementById("photos").innerHTML = "<div class='row'><div class='col-sm-11' style='font-size:1.5em;margin:2%;padding:2%;'><p class='text-center'>Data for this parel is currently under development</p></div></div>";
		}
		else
		{
			document.getElementById("lblParcelNum").innerHTML = parcelnum;
			document.getElementById("lblSitusAddr").innerHTML = obj2.features[0].attributes.situs_address; situs_address = obj2.features[0].attributes.situs_address;
			var city_state_zip = obj2.features[0].attributes.situs_city + ", MO " + obj2.features[0].attributes.situs_zip;
			document.getElementById("lblSitusCityStateZip").innerHTML = city_state_zip;
			document.getElementById("lblLotSize").innerHTML = obj2.features[0].attributes.total_sqft.toLocaleString() + " Sq. Ft.";
			document.getElementById("lblBldgSqFt").innerHTML = obj2.features[0].attributes.tot_sqf_l_area.toLocaleString() + " Sq. Ft."; bldg_sqft = obj2.features[0].attributes.tot_sqf_l_area; // used for appeals form
			document.getElementById("lblNumBR").innerHTML = obj2.features[0].attributes.num_bedrooms; num_beds = obj2.features[0].attributes.num_bedrooms; // used for appeals form
			var half_baths = parseFloat(obj2.features[0].attributes.half_baths) * 0.5;
			var full_baths = parseFloat(obj2.features[0].attributes.full_baths);
			num_baths = full_baths + half_baths; // also used for appeals form
			document.getElementById("lblNumBaths").innerHTML = num_baths;
			if(obj2.features[0].attributes.year_built != "0") document.getElementById("lblYearBuilt").innerHTML = obj2.features[0].attributes.year_built;
			else document.getElementById("lblYearBuilt").innerHTML = "N/A";
			year_built = obj2.features[0].attributes.year_built_csect; // used for appeals form
			document.getElementById("lblTCA").innerHTML = obj2.features[0].attributes.tcacode; TCA = obj2.features[0].attributes.tcacode; // used for appeals form
			document.getElementById("lblUseCode").innerHTML = obj2.features[0].attributes.landuse_cd_descr; landusecode = obj2.features[0].attributes.landuse_cd_descr; // used for appeals form
			if(obj2.features[0].attributes.Exemption != null) document.getElementById("lblExemption").innerHTML = obj2.features[0].attributes.Exemption;
			else document.getElementById("lblExemption").innerHTML = "None";
			exemption = obj2.features[0].attributes.Exemption; // used for appeals form
			// legal description used for appeals form, but first need to replace '&' with "AND"
			/////////////////////////////////////////////////////////
			var templegal = obj2.features[0].attributes.Legal_Lines;
			legaldescription =  templegal.replace(/&/g, "AND");
			document.getElementById("lblLegalDescr").innerHTML = legaldescription;
			/////////////////////////////////////////////////////////
			nhood = obj2.features[0].attributes.nbhd; // used for appeals form

			/////////////// TAX YEAR TABLE COLUMN HEADINGS ///////////////
			document.getElementById("lblYear0").innerHTML = obj2.features[0].attributes.tax_year;
			document.getElementById("lblYear1").innerHTML = obj2.features[0].attributes.tax_year_pastyr1;
			document.getElementById("lblYear2").innerHTML = obj2.features[0].attributes.tax_year_pastyr2;
			document.getElementById("lblYear3").innerHTML = obj2.features[0].attributes.tax_year_pastyr3;

			/////////////// YEAR 0 ITEMS ///////////////
			/*document.getElementById("lblYear0AgLand").innerHTML = "$" + obj2.features[0].attributes.Ag_Land.toLocaleString(); land_ag_val = obj2.features[0].attributes.Ag_Land.toString(); // used for appeals form
			document.getElementById("lblYear0CommLand").innerHTML = "$" + obj2.features[0].attributes.Comm_Land.toLocaleString(); land_com_val = obj2.features[0].attributes.Comm_Land.toString(); // used for appeals form
			document.getElementById("lblYear0ResLand").innerHTML = "$" + obj2.features[0].attributes.Res_Land.toLocaleString(); land_res_val = obj2.features[0].attributes.Res_Land.toString(); // used for appeals form
			document.getElementById("lblYear0AgImp").innerHTML = "$" + obj2.features[0].attributes.Ag_Impr.toLocaleString(); imp_ag_val = obj2.features[0].attributes.Ag_Impr.toString(); // used for appeals form
			document.getElementById("lblYear0CommImp").innerHTML = "$" + obj2.features[0].attributes.Comm_Impr.toLocaleString(); imp_com_val = obj2.features[0].attributes.Comm_Impr.toString(); // used for appeals form
			document.getElementById("lblYear0ResImp").innerHTML = "$" + obj2.features[0].attributes.Res_Impr.toLocaleString(); imp_res_val = obj2.features[0].attributes.Res_Impr.toString(); // used for appeals form
			document.getElementById("lblYear0AgNC").innerHTML = "$" + obj2.features[0].attributes.Ag_Impr_New_Constr.toLocaleString(); newcon_ag_val = obj2.features[0].attributes.Ag_Impr_New_Constr.toString(); // is there an ag land new construction? used for appeals form
			var Comm_Land_New_Constr = parseFloat(obj2.features[0].attributes.Comm_Land_New_Constr);
			var Comm_Impr_New_Constr = parseFloat(obj2.features[0].attributes.Comm_Impr_New_Constr);
			var newcon_com_val_num = Comm_Land_New_Constr + Comm_Impr_New_Constr;
			newcon_com_val = newcon_com_val_num.toString(); // also used for appeals form, need to convert to string
			document.getElementById("lblYear0CommNC").innerHTML = "$" + newcon_com_val_num.toLocaleString();
			var Res_Land_New_Const = parseFloat(obj2.features[0].attributes.Res_Land_New_Constr);
			var Res_Impr_New_Const = parseFloat(obj2.features[0].attributes.Res_Impr_New_Constr);
			var newcon_res_val_num = Res_Land_New_Const + Res_Impr_New_Const;
			newcon_res_val = newcon_res_val_num.toString(); // also used for appeals form, need to convert to string
			document.getElementById("lblYear0ResNC").innerHTML = "$" + newcon_res_val_num.toLocaleString();*/
			document.getElementById("lblYear0TMV").innerHTML = "$" + obj2.features[0].attributes.Market_Value_Total.toLocaleString(); TMV = obj2.features[0].attributes.Market_Value_Total.toString(); // used for appeals form
			document.getElementById("lblYear0TAV").innerHTML = "$" + obj2.features[0].attributes.Assessed_Value_Total.toLocaleString(); TAV = obj2.features[0].attributes.Assessed_Value_Total.toString(); // used for appeals form
			document.getElementById("lblYear0TTV").innerHTML = "$" + obj2.features[0].attributes.Taxable_Value_Total.toLocaleString(); TTV = obj2.features[0].attributes.Taxable_Value_Total.toString(); // used for appeals form

			/////////////// YEAR 1 ITEMS ///////////////
			/*document.getElementById("lblYear1AgLand").innerHTML = "$" + obj2.features[0].attributes.Ag_Land_pastyr1.toLocaleString();
			document.getElementById("lblYear1CommLand").innerHTML = "$" + obj2.features[0].attributes.Comm_Land_pastyr1.toLocaleString();
			document.getElementById("lblYear1ResLand").innerHTML = "$" + obj2.features[0].attributes.Res_Land_pastyr1.toLocaleString();
			document.getElementById("lblYear1AgImp").innerHTML = "$" + obj2.features[0].attributes.Ag_Impr_pastyr1.toLocaleString();
			document.getElementById("lblYear1CommImp").innerHTML = "$" + obj2.features[0].attributes.Comm_Impr_pastyr1.toLocaleString();
			document.getElementById("lblYear1ResImp").innerHTML = "$" + obj2.features[0].attributes.Res_Impr_pastyr1.toLocaleString();
			document.getElementById("lblYear1AgNC").innerHTML = "$" + obj2.features[0].attributes.Ag_Impr_New_Constr_pastyr1.toLocaleString(); // is there an ag land new construction?
			var Comm_Land_New_Constr_pastyr1 = parseFloat(obj2.features[0].attributes.Comm_Land_New_Constr_pastyr1);
			var Comm_Impr_New_Constr_pastyr1 = parseFloat(obj2.features[0].attributes.Comm_Impr_New_Constr_pastyr1);
			var Comm_New_Constr_pastyr1 = Comm_Land_New_Constr_pastyr1 + Comm_Impr_New_Constr_pastyr1;
			document.getElementById("lblYear1CommNC").innerHTML = "$" + Comm_New_Constr_pastyr1.toLocaleString();
			var Res_Land_New_Const_pastyr1 = parseFloat(obj2.features[0].attributes.Res_Land_New_Constr_pastyr1);
			var Res_Impr_New_Const_pastyr1 = parseFloat(obj2.features[0].attributes.Res_Impr_New_Constr_pastyr1);
			var Res_New_Const_pastyr1 = Res_Land_New_Const_pastyr1 + Res_Impr_New_Const_pastyr1;
			document.getElementById("lblYear1ResNC").innerHTML = "$" + Res_New_Const_pastyr1.toLocaleString();*/
			document.getElementById("lblYear1TMV").innerHTML = "$" + obj2.features[0].attributes.Market_Value_Total_pastyr1.toLocaleString();
			document.getElementById("lblYear1TAV").innerHTML = "$" + obj2.features[0].attributes.Assessed_Value_Total_pastyr1.toLocaleString();
			document.getElementById("lblYear1TTV").innerHTML = "$" + obj2.features[0].attributes.Taxable_Value_Total_pastyr1.toLocaleString();

			/////////////// YEAR 2 ITEMS ///////////////
			/*document.getElementById("lblYear2AgLand").innerHTML = "$" + obj2.features[0].attributes.Ag_Land_pastyr2.toLocaleString();
			document.getElementById("lblYear2CommLand").innerHTML = "$" + obj2.features[0].attributes.Comm_Land_pastyr2.toLocaleString();
			document.getElementById("lblYear2ResLand").innerHTML = "$" + obj2.features[0].attributes.Res_Land_pastyr2.toLocaleString();
			document.getElementById("lblYear2AgImp").innerHTML = "$" + obj2.features[0].attributes.Ag_Impr_pastyr2.toLocaleString();
			document.getElementById("lblYear2CommImp").innerHTML = "$" + obj2.features[0].attributes.Comm_Impr_pastyr2.toLocaleString();
			document.getElementById("lblYear2ResImp").innerHTML = "$" + obj2.features[0].attributes.Res_Impr_pastyr2.toLocaleString();
			document.getElementById("lblYear2AgNC").innerHTML = "$" + obj2.features[0].attributes.Ag_Impr_New_Constr_pastyr2.toLocaleString();
			var Comm_Land_New_Constr_pastyr2 = parseFloat(obj2.features[0].attributes.Comm_Land_New_Constr_pastyr2);
			var Comm_Impr_New_Constr_pastyr2 = parseFloat(obj2.features[0].attributes.Comm_Impr_New_Constr_pastyr2);
			var Comm_New_Constr_pastyr2 = Comm_Land_New_Constr_pastyr2 + Comm_Impr_New_Constr_pastyr2;
			document.getElementById("lblYear2CommNC").innerHTML = "$" + Comm_New_Constr_pastyr2.toLocaleString();
			var Res_Land_New_Const_pastyr2 = parseFloat(obj2.features[0].attributes.Res_Land_New_Constr_pastyr2);
			var Res_Impr_New_Const_pastyr2 = parseFloat(obj2.features[0].attributes.Res_Impr_New_Constr_pastyr2);
			var Res_New_Const_pastyr2 = Res_Land_New_Const_pastyr2 + Res_Impr_New_Const_pastyr2;
			document.getElementById("lblYear2ResNC").innerHTML = "$" + Res_New_Const_pastyr2.toLocaleString();*/
			document.getElementById("lblYear2TMV").innerHTML = "$" + obj2.features[0].attributes.Market_Value_Total_pastyr2.toLocaleString();
			document.getElementById("lblYear2TAV").innerHTML = "$" + obj2.features[0].attributes.Assessed_Value_Total_pastyr2.toLocaleString();
			document.getElementById("lblYear2TTV").innerHTML = "$" + obj2.features[0].attributes.Taxable_Value_Total_pastyr2.toLocaleString();

			/////////////// YEAR 3 ITEMS ///////////////
			/*document.getElementById("lblYear3AgLand").innerHTML = "$" + obj2.features[0].attributes.Ag_Land_pastyr3.toLocaleString();
			document.getElementById("lblYear3CommLand").innerHTML = "$" + obj2.features[0].attributes.Comm_Land_pastyr3.toLocaleString();
			document.getElementById("lblYear3ResLand").innerHTML = "$" + obj2.features[0].attributes.Res_Land_pastyr3.toLocaleString();
			document.getElementById("lblYear3AgImp").innerHTML = "$" + obj2.features[0].attributes.Ag_Impr_pastyr3.toLocaleString();
			document.getElementById("lblYear3CommImp").innerHTML = "$" + obj2.features[0].attributes.Comm_Impr_pastyr3.toLocaleString();
			document.getElementById("lblYear3ResImp").innerHTML = "$" + obj2.features[0].attributes.Res_Impr_pastyr3.toLocaleString();
			document.getElementById("lblYear3AgNC").innerHTML = "$" + obj2.features[0].attributes.Ag_Impr_New_Constr_pastyr3.toLocaleString();
			var Comm_Land_New_Constr_pastyr3 = parseFloat(obj2.features[0].attributes.Comm_Land_New_Constr_pastyr3);
			var Comm_Impr_New_Constr_pastyr3 = parseFloat(obj2.features[0].attributes.Comm_Impr_New_Constr_pastyr3);
			var Comm_New_Constr_pastyr3 = Comm_Land_New_Constr_pastyr3 + Comm_Impr_New_Constr_pastyr3;
			document.getElementById("lblYear3CommNC").innerHTML = "$" + Comm_New_Constr_pastyr3.toLocaleString();
			var Res_Land_New_Const_pastyr3 = parseFloat(obj2.features[0].attributes.Res_Land_New_Constr_pastyr3);
			var Res_Impr_New_Const_pastyr3 = parseFloat(obj2.features[0].attributes.Res_Impr_New_Constr_pastyr3);
			var Res_New_Const_pastyr3 = Res_Land_New_Const_pastyr3 + Res_Impr_New_Const_pastyr3;
			document.getElementById("lblYear3ResNC").innerHTML = "$" + Res_New_Const_pastyr3.toLocaleString();*/
			document.getElementById("lblYear3TMV").innerHTML = "$" + obj2.features[0].attributes.Market_Value_Total_pastyr3.toLocaleString();
			document.getElementById("lblYear3TAV").innerHTML = "$" + obj2.features[0].attributes.Assessed_Value_Total_pastyr3.toLocaleString();
			document.getElementById("lblYear3TTV").innerHTML = "$" + obj2.features[0].attributes.Taxable_Value_Total_pastyr3.toLocaleString();

			/////////////// OWNER INFO ///////////////
			var owners_temp = obj2.features[0].attributes.owner_info;
			var ownaddr_temp = obj2.features[0].attributes.address_compl;
			var owners_array = owners_temp.split('|');
			var ownaddr_array = ownaddr_temp.split('|');
			owner = owners_array[0]; // for BOE appeal forms

			if(owners_array.length == 1)
			{
				firstowner.style.display = "block";
				secondowner.style.display = "none";
				otherowners.style.display = "none";
			}
			if(owners_array.length == 2)
			{
				firstowner.style.display = "block";
				secondowner.style.display = "block";
				otherowners.style.display = "none";
			}
			if(owners_array.length > 2)
			{
				firstowner.style.display = "block";
				secondowner.style.display = "block";
				otherowners.style.display = "block";
			}
			for(var i = 0; i < owners_array.length; i++)
			{
				if(i == 0)
				{
					var own1 = owners_array[i].replace(/\|/g,"|<br/>");
					document.getElementById("lblOwner1Name").innerHTML = own1;
					document.getElementById("lblOwner1Address").innerHTML = ownaddr_array[i];
				}
				if(i == 1)
				{
					// this is a cheesy way to clear the other owners list but whatever ...
					document.getElementById("lblOtherOwnersList").innerHTML = "";
					// back to the usual stuff ...
					var own2 = owners_array[i].replace(/\|/g,"|<br/>");
					document.getElementById("lblOwner2Name").innerHTML = own2;
					document.getElementById("lblOwner2Address").innerHTML = ownaddr_array[i];
				}
				if(i > 1)
				{
					document.getElementById("lblOtherOwnersList").innerHTML += owners_array[i] + "<br/>";
				}
			}

			//////////////// PHOTOS //////////////////
			/*var photos_temp = obj2.features[0].attributes.SigmaPics;
			if(photos_temp == null) document.getElementById("photos").innerHTML = "<div class='row'><div class='col-sm-11' style='font-size:1.5em;margin:2%;padding:2%;'><p class='text-center'>There are no photos available for this property</p></div></div>";
			else
			{
				var photos_temp_array = photos_temp.split('|');
				photoCount = photos_temp_array.length;
				for(var i = 0; i < photoCount; i++)
				{
					var temp1 = photos_temp_array[i].trim();
					var temp2 = temp1.replace("O:\\Pictures", "https://jcgis.jacksongov.org/AscendPics/Pictures");
					var temp3 = temp2.replace("O:\\MobileAssessorPhotos", "https://jcgis.jacksongov.org/AscendPics/MobileAssessorPhotos");
					var temp4 = temp3.replace("O:\\CameraPhotos", "https://jcgis.jacksongov.org/AscendPics/CameraPhotos");
					photos_array[i] = temp4.replace(/\\/g, "/");

					if (i == 0) document.getElementById("photos").innerHTML = "<img src='" + photos_array[i] + "' style='height:80%;margin:1%;' onclick='doModal(this.src);'/>";
					else document.getElementById("photos").innerHTML += "&nbsp&nbsp<img src='" + photos_array[i] + "' style='height:80%;margin:1%;' onclick='doModal(this.src);'/>";
				}
			}*/
		} // end of test for null obj2 feature

		// Check for appeals eligibility
		// https://jacksoncomo.maps.arcgis.com/home/item.html?id=ce81cea53d284da6b3acb624d3ed9ef0
		/*var appealsurl = "https://services3.arcgis.com/4LOAHoFXfea6Y3Et/arcgis/rest/services/Jackson_County_Board_of_Equalization_Public_2022_Final/FeatureServer/0/query?where=C_Parcel_E%3D%27" + parcelnum + "%27&outFields=Appeal_Type&returnGeometry=false&f=pjson";
		fetch(appealsurl).then(data => data.json()).then((result) =>
		{
			var obj1 = JSON.stringify(result);
			var obj2 = JSON.parse(obj1);
			if(obj2.features[0] != null)
			{
				checkapppeal.style.display = "block";
				appealedlastyear.style.display = "none";
				disagreeassessment.style.display = "none";
			}
			else
			{
				// check last year table
				var lastYearURL= "https://services3.arcgis.com/4LOAHoFXfea6Y3Et/ArcGIS/rest/services/AppealsReboot/FeatureServer/0/query?where=parcel_number%3D%27" + parcelnum + "%27&outFields=appeal_type&returnGeometry=false&f=pjson";
				fetch(lastYearURL).then(data => data.json()).then((result) =>
				{
					var lastyr1 = JSON.stringify(result);
					var lastyr2 = JSON.parse(lastyr1);
					if(lastyr2.features[0] != null)
					{
						if(lastyr2.features[0].attributes.appeal_type == "formal")
						{
							checkapppeal.style.display = "none";
							appealedlastyear.style.display = "block";
							disagreeassessment.style.display = "none";
						}
						else
						{
							checkapppeal.style.display = "none";
							appealedlastyear.style.display = "none";
							disagreeassessment.style.display = "block";
						}
					}
					else // no appeals this year or last
					{
						checkapppeal.style.display = "none";
						appealedlastyear.style.display = "none";
						disagreeassessment.style.display = "block";
					}
				});
			}
		});*/ // end of fetch for appeals url
	}); // end of fetch for url data function
} // end of getInfoAndPhotos function

// This is called from the photos section above
function doModal(imgsrc)
{
	theModal.style.display = "block";
	modalPhotos.src = imgsrc;
}

function getEconDistricts()
{
	var currentDate = new Date();
	var currentYear = currentDate.getFullYear();

	var CIDurl = "https://jcgis.jacksongov.org/arcgis/rest/services/Cadastral/ParcelViewer/FeatureServer/35/query?where=&geometry=" + xcoord + "%2C+" + ycoord + "&geometryType=esriGeometryPoint&spatialRel=esriSpatialRelIntersects&units=esriSRUnit_Foot&outFields=&returnGeometry=false&returnTrueCurves=false&returnIdsOnly=false&returnCountOnly=false&returnZ=false&returnM=false&returnDistinctValues=false&returnExtentOnly=false&featureEncoding=esriDefault&f=pjson";
	var TIFdistURL = "https://jcgis.jacksongov.org/arcgis/rest/services/Cadastral/ParcelViewer/FeatureServer/33/query?where=EFFECTIVEYEARFROM+<%3D%27" + currentYear + "%27+AND+EFFECTIVEYEARTO+>%3D%27" + currentYear + "%27&geometry=" + xcoord + "%2C+" + ycoord + "&geometryType=esriGeometryPoint&spatialRel=esriSpatialRelIntersects&units=esriSRUnit_Foot&outFields=Name%2C+EFFECTIVEYEARFROM%2C+EFFECTIVEYEARTO%2C+DURATION&returnGeometry=false&returnTrueCurves=false&returnIdsOnly=false&returnCountOnly=false&returnZ=false&returnM=false&returnDistinctValues=false&returnExtentOnly=false&featureEncoding=esriDefault&f=json";
	var TIFprojURL = "https://jcgis.jacksongov.org/arcgis/rest/services/Cadastral/ParcelViewer/FeatureServer/36/query?where=EFFECTIVEYEARFROM+<%3D%27" + currentYear + "%27+AND+EFFECTIVEYEARTO+>%3D%27" + currentYear + "%27&geometry=" + xcoord + "%2C+" + ycoord + "&geometryType=esriGeometryPoint&spatialRel=esriSpatialRelIntersects&units=esriSRUnit_Foot&outFields=Name%2C+EFFECTIVEYEARFROM%2C+EFFECTIVEYEARTO%2C+DURATION&returnGeometry=false&returnTrueCurves=false&returnIdsOnly=false&returnCountOnly=false&returnZ=false&returnM=false&returnDistinctValues=false&returnExtentOnly=false&featureEncoding=esriDefault&f=json";

	fetch(CIDurl).then(data => data.json()).then((resultCID) =>
	{
		var objCID = JSON.stringify(resultCID);
		if(objCID.includes("attributes"))
		{
			var objCIDparsed = JSON.parse(objCID);
			document.getElementById("lblCID").innerHTML = objCIDparsed.features[0].attributes.Name; // Community Improvement District name
		}
		else document.getElementById("lblCID").innerHTML = "Property is not in a CID for which Jackson County collects a tax or assessment";
	});
	fetch(TIFdistURL).then(data => data.json()).then((resultTIFdist) =>
	{
		var objTIFdist = JSON.stringify(resultTIFdist);
		if(objTIFdist.includes("attributes"))
		{
			var objTIFdistparsed = JSON.parse(objTIFdist);
			document.getElementById("lblTIFdist").innerHTML = objTIFdistparsed.features[0].attributes.Name; // TIF District name

			// start date stuff
			var rawfromdateDist = objTIFdistparsed.features[0].attributes.EFFECTIVEYEARFROM; // TIF District start date
			var datefromDist = new Date(rawfromdateDist);
			var yearfromDist = new Date(datefromDist);
			document.getElementById("lblTIFdistStartDate").innerHTML = yearfromDist.getFullYear();

			// end date stuff:
			var rawenddateDist = objTIFdistparsed.features[0].attributes.EFFECTIVEYEARTO; // TIF District end date
			var datetoDist = new Date(rawenddateDist);
			var yeartoDist = new Date(datetoDist);
			document.getElementById("lblTIFdistEndDate").innerHTML = yeartoDist.getFullYear();
			document.getElementById("lblTIFdistDuration").innerHTML = objTIFdistparsed.features[0].attributes.DURATION; // TIF District duration in years
		}
		else
		{
			document.getElementById("lblTIFdist").innerHTML = "No known TIF district for this parcel";
			document.getElementById("lblTIFdistStartDate").innerHTML = "N/A";
			document.getElementById("lblTIFdistEndDate").innerHTML = "N/A";
			document.getElementById("lblTIFdistDuration").innerHTML = "N/A";
		}
	});
	fetch(TIFprojURL).then(data => data.json()).then((resultTIFproj) =>
	{
		var objTIFproj = JSON.stringify(resultTIFproj);
		if(objTIFproj.includes("attributes"))
		{
			var objTIFprojparsed = JSON.parse(objTIFproj);
			document.getElementById("lblTIFprojOrd").innerHTML = objTIFprojparsed.features[0].attributes.Name; // TIF Project name

			// start date stuff
			var rawfromdateProj = objTIFprojparsed.features[0].attributes.EFFECTIVEYEARFROM; // TIF Project start date
			var datefromProj = new Date(rawfromdateProj);
			var yearfromProj = new Date(datefromProj);			
			document.getElementById("lblTIFprojStartDate").innerHTML = yearfromProj.getFullYear();

			// end date stuff
			var rawtodateProj = objTIFprojparsed.features[0].attributes.EFFECTIVEYEARTO; // TIF Project end date
			var datetoProj = new Date(rawtodateProj);
			var yeartoProj = new Date(datetoProj);
			document.getElementById("lblTIFprojEndDate").innerHTML = yeartoProj.getFullYear();

			document.getElementById("lblTIFprojDuration").innerHTML = objTIFprojparsed.features[0].attributes.DURATION; // TIF Project duration in years
		}
		else
		{
			document.getElementById("lblTIFprojOrd").innerHTML = "No known TIF project for this parcel";
			document.getElementById("lblTIFprojStartDate").innerHTML = "N/A";
			document.getElementById("lblTIFprojEndDate").innerHTML = "N/A";
			document.getElementById("lblTIFprojDuration").innerHTML = "N/A";
		}
	});
}

function getElectedOfficials()
{
	// These are elected officials common to the entire county and can be hard-coded here
	// ----------------------------------------------------------------------------------
	$('#lblJaCoExecName').text("Frank White");
	$('#lblJaCoExecParty').text("D");
	document.getElementById("hlJaCoExecWebsite").innerHTML = "<a href='http://www.jacksongov.org/395/County-Executive' target='_blank' style='color:blue;margin:0;padding:0'>View Website</a>";
	$('#lblMOgovName').text("Michael L Parson");
	$('#lblMOgovParty').text("R");
	document.getElementById("hlMOgovWebsite").innerHTML = "<a href='https://governor.mo.gov/' target='_blank' style='color:blue;margin:0;padding:0'>View Website</a>";
	$('#lblUSsen1Name').text("Eric Schmitt");
	$('#lblUSsen1Party').text("R");
	document.getElementById("hlUSsen1Website").innerHTML = "<a href='https://www.schmitt.senate.gov/' target='_blank' style='color:blue;margin:0;padding:0'>View Website</a>";
	$('#lblUSsen2Name').text("Josh Hawley");
	$('#lblUSsen2Party').text("R");
	document.getElementById("hlUSsen2Website").innerHTML = "<a href='https://www.hawley.senate.gov/' target='_blank' style='color:blue;margin:0;padding:0'>View Website</a>";
	// ----------------------------------------------------------------------------------

	// string URLs and json objects for county council, MO house of reps, MO senate and US rep
	// ------------------------------------------------------------------------------------------
	var JaCoAtLargeUrl = "https://jcgis.jacksongov.org/arcgis/rest/services/ElectionAdministration/LegislativeDistricts/MapServer/0/query?where=&text=&objectIds=&time=&geometry=" + xcoord + "%2C" + ycoord + "&geometryType=esriGeometryPoint&inSR=102698&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=DISTRICT%2C+Name%2C+Party%2C+WebSite&returnGeometry=false&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&resultOffset=&resultRecordCount=&f=json";
	var JaCoIndivUrl = "https://jcgis.jacksongov.org/arcgis/rest/services/ElectionAdministration/LegislativeDistricts/MapServer/1/query?where=&text=&objectIds=&time=&geometry=" + xcoord + "%2C" + ycoord + "&geometryType=esriGeometryPoint&inSR=102698&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=DISTRICT%2C+name%2C+Party%2C+WebSite&returnGeometry=false&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&resultOffset=&resultRecordCount=&f=json";
	var MoSenUrl = "https://jcgis.jacksongov.org/arcgis/rest/services/ElectionAdministration/ElectedOfficials/MapServer/1/query?where=&objectIds=&time=&geometry=" + xcoord + "%2C" + ycoord + "&geometryType=esriGeometryPoint&inSR=102698&spatialRel=esriSpatialRelIntersects&distance=&units=esriSRUnit_Foot&relationParam=&outFields=DISTRICT%2C+REPNAME%2C+Party%2C+WebSite&returnGeometry=false&maxAllowableOffset=&geometryPrecision=&outSR=&gdbVersion=&returnDistinctValues=false&returnIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&multipatchOption=&f=json";
	var MoRepUrl = "https://jcgis.jacksongov.org/arcgis/rest/services/ElectionAdministration/ElectedOfficials/MapServer/0/query?where=&text=&objectIds=&time=&geometry=" + xcoord + "%2C" + ycoord + "&geometryType=esriGeometryPoint&inSR=102698&spatialRel=esriSpatialRelWithin&relationParam=&outFields=DISTRICT%2C+REPNAME%2C+Party%2C+WebSite&returnGeometry=false&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&resultOffset=&resultRecordCount=&f=pjson";
	var UShouseUrl = "https://jcgis.jacksongov.org/arcgis/rest/services/ElectionAdministration/ElectedOfficials/MapServer/2/query?where=&text=&objectIds=&time=&geometry=" + xcoord + "%2C" + ycoord + "&geometryType=esriGeometryPoint&inSR=102698&spatialRel=esriSpatialRelWithin&distance=&units=esriSRUnit_Meter&relationParam=&outFields=DISTRICT%2C+REPNAME%2C+Party%2C+WebSite&returnGeometry=false&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=&havingClause=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&historicMoment=&returnDistinctValues=false&resultOffset=&resultRecordCount=&returnExtentOnly=false&datumTransformation=&parameterValues=&rangeValues=&quantizationParameters=&featureEncoding=esriDefault&f=pjson";

	// County at-large districts
	fetch(JaCoAtLargeUrl).then(data => data.json()).then((result) =>
	{
		var obj1 = JSON.stringify(result);
		var obj2 = JSON.parse(obj1);

		document.getElementById("lblJaCoAtLargeName").innerHTML = obj2.features[0].attributes.Name;
		document.getElementById("lblJaCoAtLargeParty").innerHTML = obj2.features[0].attributes.Party;
		document.getElementById("lblJaCoAtLargeDist").innerHTML = obj2.features[0].attributes.DISTRICT;
		if(obj2.features[0].attributes.WebSite == "" || obj2.features[0].attributes.WebSite == null || obj2.features[0].attributes.WebSite == " "|| obj2.features[0].attributes.WebSite == "N/A") document.getElementById("hlJaCoAtLargeWebsite").innerHTML = "Website N/A";
		else document.getElementById("hlJaCoAtLargeWebsite").innerHTML = "<a href='" + obj2.features[0].attributes.WebSite + "' target='_blank' style='color:blue'>View Website</a>";
	});

	// County individual districts
	fetch(JaCoIndivUrl).then(data => data.json()).then((result) =>
	{
		var obj1 = JSON.stringify(result);
		var obj2 = JSON.parse(obj1);
		
		document.getElementById("lblJaCoIndivName").innerHTML = obj2.features[0].attributes.name;
		document.getElementById("lblJaCoIndivParty").innerHTML = obj2.features[0].attributes.Party;
		document.getElementById("lblJaCoIndivDist").innerHTML = obj2.features[0].attributes.DISTRICT;
		if(obj2.features[0].attributes.WebSite == "" || obj2.features[0].attributes.WebSite == null || obj2.features[0].attributes.WebSite == " "|| obj2.features[0].attributes.WebSite == "N/A") document.getElementById("hlJaCoIndivWebsite").innerHTML = "Website N/A";
		else document.getElementById("hlJaCoIndivWebsite").innerHTML = "<a href='" + obj2.features[0].attributes.WebSite + "' target='_blank' style='color:blue;margin:0;padding:0'>View Website</a>";
	});
	
	// State senators
	fetch(MoSenUrl).then(data => data.json()).then((result) =>
	{	
		var obj1 = JSON.stringify(result);
		var obj2 = JSON.parse(obj1);

		document.getElementById("lblMOsenName").innerHTML = obj2.features[0].attributes.REPNAME;
		document.getElementById("lblMOsenParty").innerHTML = obj2.features[0].attributes.Party;
		document.getElementById("lblMOsenDist").innerHTML = obj2.features[0].attributes.DISTRICT;
		if(obj2.features[0].attributes.WebSite == "" || obj2.features[0].attributes.WebSite == null || obj2.features[0].attributes.WebSite == " "|| obj2.features[0].attributes.WebSite == "N/A") document.getElementById("hlMOsenWebsite").innerHTML = "Website N/A";
		else document.getElementById("hlMOsenWebsite").innerHTML = "<a href='" + obj2.features[0].attributes.WebSite + "' target='_blank' style='color:blue'>View Website</a>";
	});

	// State representatives
	fetch(MoRepUrl).then(data => data.json()).then((result) =>
	{
		var obj1 = JSON.stringify(result);
		var obj2 = JSON.parse(obj1);

		document.getElementById("lblMOrepName").innerHTML = obj2.features[0].attributes.REPNAME;
		document.getElementById("lblMOrepParty").innerHTML = obj2.features[0].attributes.Party;
		document.getElementById("lblMOrepDist").innerHTML = obj2.features[0].attributes.DISTRICT;
		if(obj2.features[0].attributes.WebSite == "" || obj2.features[0].attributes.WebSite == null || obj2.features[0].attributes.WebSite == " "|| obj2.features[0].attributes.WebSite == "N/A") document.getElementById("hlMOrepWebsite").innerHTML = "Website N/A";
		else document.getElementById("hlMOrepWebsite").innerHTML = "<a href='" + obj2.features[0].attributes.WebSite + "' target='_blank' style='color:blue'>View Website</a>";
	});

	// Federal (US House)
	fetch(UShouseUrl).then(data => data.json()).then((result) =>
	{
		var obj1 = JSON.stringify(result);
		var obj2 = JSON.parse(obj1);

		document.getElementById("lblUSHouseName").innerHTML = obj2.features[0].attributes.REPNAME;
		document.getElementById("lblUSHouseParty").innerHTML = obj2.features[0].attributes.Party;
		document.getElementById("lblUSHouseDist").innerHTML = obj2.features[0].attributes.DISTRICT;
		if(obj2.features[0].attributes.WebSite == "" || obj2.features[0].attributes.WebSite == null || obj2.features[0].attributes.WebSite == " "|| obj2.features[0].attributes.WebSite == "N/A") document.getElementById("hlUSHouseWebsite").innerHTML = "Website N/A";
		else document.getElementById("hlUSHouseWebsite").innerHTML = "<a href='" + obj2.features[0].attributes.WebSite + "' target='_blank' style='color:blue'>View Website</a>";
	});

	document.getElementById("electedtab").className = "nav-link";
}