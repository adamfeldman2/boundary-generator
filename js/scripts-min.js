"use strict";function initMap(){map=new google.maps.Map(document.getElementById("map"),{zoom:12,scrollwheel:!1,center:{lat:43.653254,lng:-79.384132},mapTypeId:"roadmap",mapTypeControl:!1,zoomControlOptions:{position:google.maps.ControlPosition.LEFT_TOP},streetViewControlOptions:{position:google.maps.ControlPosition.LEFT_TOP},styles:[{featureType:"administrative",elementType:"all",stylers:[{visibility:"off"}]},{featureType:"administrative",elementType:"geometry.stroke",stylers:[{visibility:"on"}]},{featureType:"administrative",elementType:"labels",stylers:[{visibility:"on"},{color:"#716464"},{weight:"0.01"}]},{featureType:"administrative.country",elementType:"labels",stylers:[{visibility:"on"}]},{featureType:"landscape",elementType:"all",stylers:[{visibility:"simplified"}]},{featureType:"landscape.natural",elementType:"geometry",stylers:[{visibility:"simplified"}]},{featureType:"landscape.natural.landcover",elementType:"geometry",stylers:[{visibility:"simplified"}]},{featureType:"poi",elementType:"all",stylers:[{visibility:"simplified"}]},{featureType:"poi",elementType:"geometry.fill",stylers:[{visibility:"simplified"}]},{featureType:"poi",elementType:"geometry.stroke",stylers:[{visibility:"simplified"}]},{featureType:"poi",elementType:"labels.text",stylers:[{visibility:"simplified"}]},{featureType:"poi",elementType:"labels.text.fill",stylers:[{visibility:"simplified"}]},{featureType:"poi",elementType:"labels.text.stroke",stylers:[{visibility:"simplified"}]},{featureType:"poi.attraction",elementType:"geometry",stylers:[{visibility:"on"}]},{featureType:"road",elementType:"all",stylers:[{visibility:"on"}]},{featureType:"road.highway",elementType:"all",stylers:[{visibility:"off"}]},{featureType:"road.highway",elementType:"geometry",stylers:[{visibility:"on"}]},{featureType:"road.highway",elementType:"geometry.fill",stylers:[{visibility:"on"}]},{featureType:"road.highway",elementType:"geometry.stroke",stylers:[{visibility:"simplified"},{color:"#a05519"},{saturation:"-13"}]},{featureType:"road.local",elementType:"all",stylers:[{visibility:"on"}]},{featureType:"transit",elementType:"all",stylers:[{visibility:"simplified"}]},{featureType:"transit",elementType:"geometry",stylers:[{visibility:"simplified"}]},{featureType:"transit.station",elementType:"geometry",stylers:[{visibility:"on"}]},{featureType:"water",elementType:"all",stylers:[{visibility:"simplified"},{color:"#84afa3"},{lightness:52}]},{featureType:"water",elementType:"geometry",stylers:[{visibility:"on"}]},{featureType:"water",elementType:"geometry.fill",stylers:[{visibility:"on"}]}]}),displayBoundaryButton.addEventListener("click",function(){this.classList.add("inactive"),document.getElementById("remove-boundary").classList.remove("inactive"),getNewCoords(),setPolygon=new google.maps.Polygon({paths:polygonCoords,strokeColor:"#5a8c7d",strokeOpacity:.8,strokeWeight:2,fillColor:"#5a8c7d",fillOpacity:.35}),addPolygon()})}function getNewCoords(){for(var e=new google.maps.LatLngBounds,t=!1,i=0;i<getLat.length;i++)""!==getLat[i].value&&""!==getLng[i].value||(t=!0);if(!0!==t){polygonCoords.length=0;for(var l=0;l<getLat.length;l++)polygonCoords.push(new google.maps.LatLng(parseFloat(getLat[l].value),parseFloat(getLng[l].value)));for(var o=0;o<polygonCoords.length;o++)e.extend(polygonCoords[o]);map.fitBounds(e)}else displayBoundaryButton.classList.add("active"),displayBoundaryButton.classList.remove("inactive"),document.getElementById("remove-boundary").classList.add("inactive"),upperButtonWrapper.classList.add("error"),polygonCoords.length=0}function addPolygon(){for(var e=!1,t=0;t<getLat.length;t++)""!==getLat[t].value&&""!==getLng[t].value||(e=!0);var i=upperButtonWrapper;setPolygon.setMap(map),upperButtonWrapper.classList.contains("error")||getReminder.classList.add("active"),i.classList.contains("error")&&!1===e&&(upperButtonWrapper.classList.remove("error"),getReminder.classList.add("active")),removePolygon()}function removePolygon(){document.getElementById("remove-boundary").addEventListener("click",function(){setPolygon.setMap(null),this.classList.add("inactive"),getReminder.classList.remove("active"),displayBoundaryButton.classList.remove("inactive"),upperButtonWrapper.classList.remove("error")})}function addCoordinate(){var e=document.getElementsByClassName("lower-button-wrapper")[0];document.getElementById("add-coord").addEventListener("click",function(){var t=document.getElementsByClassName("coordinate-input-wrapper").length;t++;var i=document.createElement("div");i.setAttribute("class","coordinate-input-wrapper");var l=document.createElement("span"),o=document.createTextNode(t);l.appendChild(o),i.appendChild(l);var a=document.createElement("input");a.setAttribute("type","text"),a.setAttribute("class","lat"),a.setAttribute("placeholder","Latitude");var s=document.createElement("span"),r=document.createTextNode(",");s.appendChild(r);var n=document.createElement("input");n.setAttribute("type","text"),n.setAttribute("class","lng"),n.setAttribute("placeholder","Longitude"),i.appendChild(a),i.appendChild(s),i.appendChild(n),e.insertAdjacentElement("beforebegin",i)})}function removeCoordinate(){var e=document.getElementById("remove-coord"),t=document.getElementsByClassName("coordinate-input-wrapper").length,i=document.getElementsByClassName("coordinate-input-wrapper");e.addEventListener("click",function(){i[i.length-1].parentNode.removeChild(i[i.length-1]),t--})}function init(){addCoordinate(),removeCoordinate()}var getLat=document.getElementsByClassName("lat"),getLng=document.getElementsByClassName("lng"),upperButtonWrapper=document.getElementsByClassName("upper-button-wrapper")[0],displayBoundaryButton=document.getElementById("display-boundary"),getReminder=document.querySelector(".lower-button-wrapper span"),polygonCoords=[],map=void 0,setPolygon=void 0;init();