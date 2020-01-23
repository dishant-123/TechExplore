import React, { Component } from 'react'
import './GoogleMaps.css'
class GoogleMaps extends Component {
    componentDidMount(){
        this.renderMap();
    }
    renderMap = () =>{
        loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyAMqQjWfHN3cp2jXovcEDVGmuTMRfUiAfg&callback=initMap")
        window.initMap = this.initMap
    }
     initMap = () =>{
        var map = new window.google.maps.Map(document.getElementById('map'), {
          center: {lat: 30.516458, lng: 76.659207},
          zoom: 15,
         // marker:{position:{lat: 30.483997, lng: 76.593948},map:map,title:'hello'}
        });
        var marker = new window.google.maps.Marker({
            position: {lat: 30.516458, lng: 76.659207},
            map: map,
            title: 'Hello World!'
          });
          marker.setMap(map);
     }
    render() {
        return (
            <React.Fragment>
                <h5>You can see your location on google maps here..</h5>
                <div id = "map" style={{width:'100%',height:'400px'}}></div>
            </React.Fragment>
        )
    }
}
function loadScript(url) {
    var index = window.document.getElementsByTagName('script')[0]
    var script = window.document.createElement('script');
    script.src = url
    script.async = true
    script.defer=  true
    script.marker = true
    index.parentNode.insertBefore(script,index);//to keep your script at very begging of all the script.
}
export default GoogleMaps
