$(() => {
	const urlMap =
		"https://gist.githubusercontent.com/maxtanie/9d60bedc7ab202e2568fc8ebec0c09cd/raw/057b08d404106d2fa00283fd5a3ca1ece93bc3a8/map.geojson";
	const urlDepartments =
		"https://gist.githubusercontent.com/maxtanie/1a52d5eb8d88f2fe228cd4a77c17c0d4/raw/c5125950c3b74b98e158bad001eb0d76f0bf5733/map.geojson";
	// let output = "";
	let outputShops = "";
	// let outputs = "";
	let shows = "";
	let newDataShop = [];
	const data = [];
	let shopMax = [];
	const newData = [];
	let dataItems = [];
	let deptsData = [];
	const dataMap = [];
	const dataPolygon = [];
	let nums = [];
	let df = [];
	var count = 0;
	var countLayer = 0;
	var selectData = [];
	var inputdata = "";
	var dataName = "";
	let showsData = "";
	const names = [];
	const getFullData = [];
	var shopLocation = "";
	var fullShopMax = [];
	let str = []
	let strNom = []
	var counts = 0

	// Counties with the full map
	var counties = $.ajax({
		url: urlMap,
		dataType: "json",
		success: console.log("County data successfully loaded."),
		error: function (xhr) {
			alert(xhr.statusText);
		}
	});

	$.when(counties).done(function () {
		var base = {
			Empty: L.tileLayer(""),
			OpenStreetMap: L.tileLayer(
				"http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
				{
					attribution: "Map data &copy; OpenStreetMap contributors"
				}
			)
		};

		var map = L.map("map", {
			center: [46.7201676557, 2.13],
			zoom: 5.5,
			scrollWheelZoom: false,
			tap: false,
			dragging: false,
			touchZoom: false,
			boxZoom: false,
			grab: false,
			keyboard: false,
			layers: [base.Empty]
		});

		var baseLayers = {
			Mapbox: base.Empty
		};

		var control = L.control.layers(base, baseLayers).addTo(map);

		// Add requested external GeoJSON to map
		let uniqueData = [];
		
		// get color depending on population density value
		function getColor(d, points, feature) {
			
			points === "Point" ? uniqueData.push(feature) : uniqueData 
			console.log(... new set(uniqueData))
			// var newStr = "";
			// getFullData.push(feature);
			// getFullData.map(el => {
			// 	if (points === "Point") {
			// 		return console.log(el)
			// 	}
			// })

			const changeData = points === "Point" ? getFullData.push(feature) :
				uniqueData.includes(d) ? "red" : "blue";
			return changeData;
			
		}
		
		function style(feature) {
			const { fill } = feature.properties;
			const dataRegion = [];
			const dataNom = [];
			const red = "red";
			const yellow = "yellow";

			const getPolygon =
				feature.geometry.type === "Polygon" ||
				feature.geometry.type === "MultiPolygon"
					? dataPolygon.push(feature.properties.nom)
					: "";

			dataMap.push(feature.properties);

			dataMap.filter((datas) => {
				return dataRegion.push(datas.region);
			});
			dataMap.map((el, index) => {
				if (el.region === dataPolygon[index]) {
					return dataNom.push(el);
				}
			});
			// dataNom.map((el, index) => {
			// 	dataName = dataNom[index++].region;
			// 	return dataName
			// });
			// console.log(dataName)
			// console.log(dataPolygon)
			// const filterData = dataRegion.filter((datas,index) => {
			// 	if (datas === undefined) {
			// 		return dataRegion.pop();
			// 	}
			// })

			// function getStyles(firstData) {
			// 	return {
			// 		fillColor: firstData.includes(feature.properties.nom)
			// 			? fill
			// 			: "#FF7475",
			// 		weight: 3,
			// 		color: "#fff",
			// 		fill: "black",
			// 		dashArray: "2",
			// 		fillOpacity: 1,
			// 		strokeOpacity: 1
			// 	};
			// }

			// var newStr = "";
			// if (feature.geometry.type === "Point") {
			// 	newStr = feature.properties.region;
			// 	getFullData.push(newStr);
			// 	let uniqueData = [...new Set(getFullData)];
			// 	return getStyles("Île-de-France");
			// }
			// // var t = feature.geometry.type === "Point" ? getFullData.push(newStr) : ""
			// // console.log(t)

			// // let changeData = "";
			// let uniqueData = [...new Set(getFullData)];

			// const newUnique = uniqueData.filter(String);

			// return getStyles(["Corse"]);

			return {
				fillColor: getColor(feature.properties.nom, feature.geometry.type, feature.properties.region),
				weight: 3,
				color: "#fff",
				fill: "black",
				dashArray: "2",
				fillOpacity: 1,
				strokeOpacity: 1
			};
		}


		var geojsonMarkerOptions = {
			radius: 6,
			color: "blue",
			weight: 1,
			opacity: 1,
			fillOpacity: 0.8
		};

		function highlightFeature(e) {
			var layer = e.target;
			L.geojson.resetStyle();


			layer.setStyle({
				weight: 9,
				color: "red",
				dashArray: "",
				fillOpacity: 1
			});

			if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
				layer.bringToFront();
			}
		}

		function resetHighlight(e) {
			L.geojson.resetStyle(e.target);
		}


		function zoomToFeature(e) {
			map.fitBounds(e.target.getBounds(49));
		}

		function openLayer(e) {
			// alert(this._leaflet_id)
			var layers = e.target;
			// console.log(layers)
			var output = "";
			var outputsData = "";
			$(".controls").css({
				opacity: 1
			});

			$(".controls").click(() => {
				return onEachFeature();
			});

			// Return specific data onclick marker
			dataItems.filter((data, index) => {
				return data.shop === layers.feature.properties.shop
					? $(".grid-content .info-panel .marker-rich-infos")
							.html(` <div class="map-item">
					<a href="${data.url}" class="title">Greatwood ${data.shop} (${data.shopCode})</a>
					<p class="adress">${data.adress}</p>
					<a href="${data.url}" target="_blank" class="see-shop">Voir le magasin</a>
				  </div>
				  `)
					: "";
			});

			if (
				layers.feature.geometry.type === "Polygon" ||
				layers.feature.geometry.type === "MultiPolygon" ||
				layers.feature.geometry.type === "Point"
			) {
				dataItems.filter((datas) => {
					return datas.nom === layers.feature.properties.nom;
				});
				output = dataItems.map((el) => {
					return el.nom === layers.feature.properties.nom
						? layers.feature.properties
						: "";
				});
				// console.log(layers.feature)
			}
			const y = output.filter((data) => {
				return data !== "";
			});

			$(".grid-content .info-panel .context").html(
				`<h4>${layers.feature.properties.nom} (${y.length} Magasins)</h4>`
			);

			nums = dataItems;
			if (
				layers.feature.geometry.type === "Polygon" ||
				layers.feature.geometry.type === "MultiPolygon"
			) {
				countLayer += 1;
				nums.filter((data, index) => {
					if (
						data.nom.includes(layers.feature.properties.nom) &&
						countLayer <= 2
					) {
						selectData.push(nums[index]);
					} else {
						countLayer = 0;
						selectData.splice(index);
					}
				});

				console.log(selectData);

				selectData.map((datas) => {
					const { shop, shopCode, adress, url } = datas;

					outputsData += `
						<div class="map-item">
						<a href="${url}" class="title">Greatwood ${shop} (${shopCode})</a>
						<p class="adress">${adress}</p>
						<a href="${url}" target="_blank" class="see-shop">Voir le magasin</a>
					  </div>
					  `;

					return $(".grid-content .info-panel .marker-rich-infos").html(
						outputsData
					);
				});
			}

			if (y.length === 0) {
				$(".grid-content .info-panel .marker-rich-infos").html("");
			}

			map.removeLayer(kyCounties);
			$("#box").css({
				zIndex: 2000
			});

			// Counties with all departments
			var countiesDepartments = $.ajax({
				url: urlDepartments,
				dataType: "json",
				success: console.log("County Regions data successfully loaded."),
				error: function (xhr) {
					alert(xhr.statusText);
				}
			});

			$.when(countiesDepartments).done(function () {
				var base = {
					Empty: L.tileLayer(""),
					OpenStreetMap: L.tileLayer(
						"http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
						{
							attribution: "Map data &copy; OpenStreetMap contributors"
						}
					)
				};
				const coord = [];

				const x = e.target.feature.geometry.coordinates[0][1];
				const xVal = x[1];
				const yVal = x[0];

				console.log(`${xVal},${yVal}`);

				var box = L.map("box", {
					center: [48, 2],
					zoom: 8,
					maxZoom: 12,
					scrollWheelZoom: false,
					tap: false,
					dragging: false,
					touchZoom: false,
					boxZoom: false,
					grab: false,
					keyboard: false,
					layers: [base.Empty]
				});

				function onEachFeature(feature, layer) {
					const coords = [];
					const { shop, shopCode, adress, url, nom, region } =
						feature.properties;
					var popupContent = `<h3>${shop}</h3>`;

					if (
						feature.geometry.type &&
						feature.properties.region === e.target.feature.properties.nom
					) {
						popupContent += feature.properties.popupContent;
						//  coords.push(feature.geometry.coordinates)
						//   L.Polygon(coords).addTo(box),
						// layer.bindPopup('<pre>'+JSON.stringify(feature.properties,null,' ').replace(/[\{\}"]/g,'')+'</pre>')
					} else {
						console.log("sorry");
					}
					layer.on({
						click: openLayer,
					});
					if (feature.geometry.type === "Point") {
						deptsData.push(feature.properties);
						layer.bindPopup(`<h3>Greatwood ${shop}</h3>`, {
							closeButton: false,
							offset: L.point(0, -5)
						});
						layer.on("mouseover", function () {
							layer.openPopup();

						});
						layer.on("mouseout", function () {
							layer.closePopup();
						});
					}
					//   if (feature.geometry.type === "Polygon" || feature.geometry.type === "MultiPolygon") {
					//     layer.bindPopup(`<h3>${nom}</h3>`, { closeButton: false, offset: L.point(0, -5) });
					//  }
				}
				L.geoJSON(countiesDepartments.responseJSON, {
					filter: function (feature, layer) {
						var output = "";
						if (
							feature.geometry.type === "Point" &&
							feature.properties.region === e.target.feature.properties.nom
						) {
							dataItems.push(feature.properties);

							dataItems = dataItems.filter(function (element) {
								return element !== undefined;
							});

							const vals = dataItems.map(function (data) {
								dataItems.sort((a, b) => {
									return a.shopCode - b.shopCode;
								});
								return data;
							});

							for (var i = 0; i < vals.length; i++) {
								const { shop, shopCode, adress, url } = vals[i];
								output += `
								<div class="map-item">
								<a href="${url}" class="title">Greatwood ${shop} (${shopCode})</a>
								<p class="adress">${adress}</p>
								<a href="${url}" target="_blank" class="see-shop">Voir le magasin</a>
							  </div>`;
								$(".grid-content .info-panel .marker-rich-infos").html(output);
							}
						}
						if (
							feature.geometry &&
							feature.properties.region === e.target.feature.properties.nom
						) {
							// If the property "underConstruction" exists and is true, return false (don't render features under construction)

							const num = 0;
							var output = "";
							newData.push(feature.geometry.type);
							// console.log(newData)
							dataItems.push(feature.properties.region);
							newData.filter((datas) => {
								if (
									datas === "Polygon" ||
									datas === "Point" ||
									datas === "MultiPolygon"
								) {
									newData.pop();
									dataItems.pop();
									$(".grid-content .info-panel .context").html(
										`<h4>${feature.properties.region} (${
											feature.geometry.type === "Point"
												? `${dataItems.length} Magasins`
												: `${dataItems.length} Magasin`
										})</h4>`
									);
								} else {
									return "";
								}
							});

							return feature.properties.underConstruction !== undefined
								? !feature.properties.underConstruction
								: true;
						} else {
							return null;
						}
					},
					style: style,
					zoomToFeature: zoomToFeature,
					onEachFeature: onEachFeature
				}).addTo(box.flyTo(new L.LatLng(xVal, yVal)));
			});
		}

		const sorting = [];
		// Get and output all the regions inside the default map
		function onEachFeature(feature, layer) {
			const shopName = $("#shop_name");
			const { shop, shopCode, adress, url, nom, region } = feature.properties;

			data.push(feature.geometry.type);

			data.filter((datas) => {
				if (
					datas === "Polygon" ||
					datas === "Point" ||
					datas === "MultiPolygon"
				) {
					feature.properties.url ? shopMax.push(feature.properties) : shopMax;

					data.pop();
				}
			});

			shopMax.sort((a, b) => {
				return a.shopCode - b.shopCode;
			});

			// const b = dataMap.push(feature.geometry.type);
			// const filterData = dataMap.filter(datas => {
			//   return datas.type !== "Polygon" || datas.type !== "MultiPolygon"
			// })

			// console.log(filterData)
			var popupContent = `<h3>${nom}</h3>`;

			if (shopCode && shop) {
				data.push(shop);
				const shopLength = data.length;

				outputShops += `<option value="${url}">Greatwood ${shop}</option>
        `;
				// output += `
				// <div class="map-item" title="${feature.properties.nom}">
				//   <h2 class="title">Greatwood ${shop} (${shopCode})</h2>
				//   <p>${adress}</p>
				//   <a href="${url}" target="_blank" class="see-shop">Voir le magasin</a>
				// </div>
				// ` ;

				// $(".grid-content .info-panel-title").html(`<h3>Magasins Greatwood</h3>`)
				// // $(".grid-content .info-panel .marker-rich-infos").html(output)
				$("#shop_name").html(outputShops);
			}
			if (feature.properties && feature.properties.popupContent) {
				popupContent += feature.properties.popupContent;
			}
			layer.on({
				click: openLayer
			});

			if (feature.geometry.type === "Point") {
				const nameData = [
					"Île-de-France",
					"Bourgogne-Franche-Comté",
					"Hauts-de-France"
				];
				console.log(layer);
				for (var i = 0; i <= nameData.length; i++) {
					feature.properties.region.includes(nameData[i])
						? names.push(feature.properties.region)
						: "";
				}
				//  shopMax.map(el => {
				//       if (el.region.includes("")) {
				//         return layer.bindPopup(`<h3>${nom} </h3>`, {
				//           closeButton: false,
				//           offset: L.point(30, -5)
				//         });
				//       }
				//     })
				layer.off("click");

				// } if ( feature.geometry.type === "Polygon") {
				// 	let shopLength = [];
				// 	console.log(shopMax.map(el => {

				// 		if (el.region.includes("Île-de-France")) {
				// 			shopLength.push(el.region);
				// 			var t = shopLength;
				// 			console.log(t.length)
				// 		} else {
				// 			return "no"
				// 		}
				// 	}))
				// } else {
			} else {
				layer.bindPopup(`<h3>${nom} </h3>`, {
					closeButton: false,
					offset: L.point(30, -5)
				});
				layer.on({
					mouseover : highlightFeature,
					mouseout: resetHighlight
				})
				layer.on("mouseover", function () {
					layer.openPopup();
				});
				layer.on("mouseout", function () {
					layer.closePopup();
				});
			}
		}
		var kyCounties = L.geoJSON(counties.responseJSON, {
			filter: function (feature, layer) {
				if (feature.properties) {
					// If the property "underConstruction" exists and is true, return false (don't render features under construction)
					// console.log(feature.properties.shopCode);
					return feature.properties.underConstruction !== undefined
						? !feature.properties.underConstruction
						: true;
				}
				return false;
			},

			style: style,
			// style: function (feature) {
			// 	const getData =
			// 		feature.geometry.type === "Point"
			// 			? feature.properties.region
			// 			: "Corse";
			// 	return {
			// 		fillColor: feature.properties.nom === getData ? "red" : "blue"
			// 	};
			// },
			pointToLayer: function (feature, latlng) {
				return new L.CircleMarker(
					latlng,
					{
						radius: 2,
						fillColor: "black",
						weight: 1,
						opacity: 1,
						fillOpacity: 0.5
					},
					{ draggable: false }
				);
			},
			onEachFeature: onEachFeature,
		}).addTo(map);

		fullShopMax = shopMax;

		function showFullData() {
			counts += 1;
			if (shopLocation === "" && counts <2) {
				return fullShopMax.map((el) => {
					const shopCodeShort = el.shopCode;
					let newShop = shopCodeShort.toString();
					newShop = newShop.substring(0, 2);
					showsData += `
					  <div class="map-item">
					  <a href="${el.url}" class="title">Greatwood ${el.shop} (${newShop})</a>
					  <p class="adress">${el.adress}</p>
					  <a href="${el.url}" target="_blank" class="see-shop">Voir le magasin</a>
					</div>
					`;
					$(".grid-content .info-panel .marker-rich-infos").html(showsData);
					$(".grid-content .info-panel .context").html(
						`<h4>Magasin Greatwood <br/> <p>France (${fullShopMax.length} Magasins)</p></h4>`
					);
				});
			} 
		}

		// Output datalist filter and sort
		let changeData = shopMax.map((el) => {
			const shopCodeShort = el.shopCode;
			let newShop = shopCodeShort.toString();
			newShop = newShop.substring(0, 2);

				showsData += `
				  <div class="map-item">
				  <a href="${el.url}" class="title">Greatwood ${el.shop} (${newShop})</a>
				  <p class="adress">${el.adress}</p>
				  <a href="${el.url}" target="_blank" class="see-shop">Voir le magasin</a>
				</div>
				`;
				$(".grid-content .info-panel .marker-rich-infos").html(showsData);
				$(".grid-content .info-panel .context").html(
					`<h4>Magasin Greatwood <br/> <p>France (${shopMax.length} Magasins)</p></h4>`
				);
		});

		// Output shop by shopcode and shop name onclick
		$("#shop_location_btn").click(() => {
		
			
				console.log(shopMax)
		
				shopMax.filter((datas,index) => {
					const shopCodeShort = datas.shopCode;
					shopLocation = $("#shop_location").val();
					// $(".msg-error").html(shopLocation)
					let newShop = shopCodeShort.toString().substring(0, 2)
					str.push(datas.shop);
					strNom.push(datas.nom)
					const matched = (s) => {
						const p = Array.from(s).reduce((a, v, i) => `${a}[^${s.substr(i)}]*?${v}`, '');
						const re = RegExp(p);
						
						return str.filter(v => v.match(re));
					};

					const matchedNom = (s) => {
						const p = Array.from(s).reduce((a, v, i) => `${a}[^${s.substr(i)}]*?${v}`, '');
						const re = RegExp(p);
						
						return strNom.filter(v => v.match(re));
					};

					if (shopLocation === "") {
						return showFullData();
					}
					if (
						shopLocation
					) {
						kyCounties = L.geoJSON(counties.responseJSON, {
							filter: function (feature, layer) {
								// if (feature.geometry.type === "Point") {

								// 	map.eachLayer((layer) => {
								// 		if (shopLocation.includes(datas.nom)) {
								// 			var featureShop = feature.properties.shopCode.toString().substring(0, 2);
								// 			// layer._leaflet_id = parseInt(featureShop)
											
								// 			layer.feature.properties.nom == matchedNom(shopLocation).includes(datas.nom) ? layer.setStyle({
								// 				weight: 9,
								// 				color: "orange",
								// 				dashArray: "",
								// 				fillOpacity: 1
								// 			}) : ""

								// 			console.log(layer)
								// 		}
								// 	});
								// }
								if (
									feature.geometry.type === "Polygon" ||
									feature.geometry.type === "MultiPolygon"
								) {
									map.eachLayer((layer) => {
										if (typeof layer._latlngs !== "undefined") {
											layer.feature.properties.nom.includes(shopLocation)
												? layer.setStyle({
												fillColor: "#FF7475",
												fillOpacity: 1
											})
												: layer.setStyle({
													fillColor: "#ffb5b5",
													color: "#fff",
													dashArray: "",
													fillOpacity: 1
												})
											
											layer.feature.properties.nom.includes(shopLocation)
												? layer.on("click") : layer.off('click')
												layer.feature.properties.nom.includes(shopLocation) ? layer.on("mouseover", function () {
													layer.openPopup();
													highlightFeature
												})
												 : layer.on("mouseover", function () {
													layer.closePopup();
												});
												
												
											
										}
									});
								}
							
								if (feature.properties.shopCode == shopLocation) {
									// If the property "underConstruction" exists and is true, return false (don't render features under construction)
									var selectRegion = feature.properties.region;

									return feature.properties.underConstruction !== undefined
										? !feature.properties.underConstruction
										: true;
								}
								return false;
							}
						});
					}
					if (
						matched(shopLocation).includes(datas.shop) || 
						shopLocation.includes(datas.shop.toLowerCase()) || newShop == shopLocation ||
						newShop[0] == shopLocation ||
						shopLocation.includes(datas.shopCode) || shopLocation.includes(datas.shop.toLowerCase()) || shopLocation.includes(datas.shop.toUpperCase())
					) {
						console.log(shopLocation)
						console.log(changeData);
						newDataShop.push(datas);
						shopMax = newDataShop;
						shows += `
							<div class="map-item">
							<h2 class="title">Greatwood ${datas.shop} (${newShop})</h2>
							<p>${datas.adress}</p>
							<a href="${datas.url}" target="_blank" class="see-shop">Voir le magasin</a>
						  </div>
						  `;
						
						$(".grid-content .info-panel .context").html(
							`<h4>Magasins Greatwood <br/> <br/>Votre recherche "${shopLocation}" a retourné ${shopMax.length} magasin(s)</h4><b style='margin-top:-15px; display: inline-block'>France</b> (${shopMax.length} Magasins) `
						);
						$(".grid-content .info-panel .marker-rich-infos").html(shows);
					} else {
						//   newDataShop.push(datas);
						//   newDataShop.pop();
						//   shopMax = newDataShop;
						counts = 0
						console.log(shopMax)
						shopMax = newDataShop;
						console.log(shopLocation);
						inputdata = shopLocation;
					}
				});
			 
		});

		$("#shop_location").keypress((e) => {
			if (e.target.value === "") {
			}
		});
	});
});
