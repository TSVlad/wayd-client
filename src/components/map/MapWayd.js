import { MapContainer, TileLayer } from 'react-leaflet'
import LocationMarker from "./LocationMarker";

const MapWayd = () => {

    return (
        <div className={'wayd-map-container'}>
            <MapContainer center={[59.57, 30.19]} zoom={13} scrollWheelZoom={true} id={'wayd-map'}>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <LocationMarker/>
            </MapContainer>
        </div>
    )
}

export default MapWayd