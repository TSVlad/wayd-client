import {MapContainer, TileLayer, useMap} from 'react-leaflet'
import LocationMarker from "./LocationMarker";
import {Alert} from "react-bootstrap";
import {connect} from "react-redux";
import EventMarkers from "./EventMarkers";
import 'leaflet/dist/leaflet.css';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import L from 'leaflet'

const MapWayd = (props) => {

    let DefaultIcon = L.icon({
        iconUrl: icon,
        shadowUrl: iconShadow
    });
    L.Marker.prototype.options.icon = DefaultIcon;

    return (
        <div className={'wayd-map-container'}>
            <MapContainer center={[59.57, 30.19]} zoom={13} scrollWheelZoom={true} id={'wayd-map'}>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <LocationMarker startByDefault={true}/>
                <EventMarkers/>

                {props.showUnsuccessfulLoginAlert &&
                <Alert id="unsuccessful-login-alert" variant="danger">
                    Incorrect username or password!
                </Alert>}
            </MapContainer>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        showUnsuccessfulLoginAlert: state.showUnsuccessfulLoginAlert
    }
}


export default connect(mapStateToProps)(MapWayd)