import {Marker, Popup, useMapEvents} from "react-leaflet";
import {useEffect, useState} from "react";
import clientRequest from "../../../utills/request/clientRequest";
import PATHS from "../../../utills/constants/servicesPaths";
import MarkerClusterGroup from "react-leaflet-markercluster";
import 'react-leaflet-markercluster/dist/styles.min.css';
import {Button, Card} from "react-bootstrap";
import {isoToLocalDateTimeForShow} from "../../../utills/dates";
import {getImageUrlByIdRequest} from "../../../utills/request/requests/requests";

const EventMarkers = (props) => {
    // const[events, setEvents] = useState([]);
    // const[selectedEvent, setSelectedEvent] = useState(null)
    // const [selectedEventImageUrl, setSelectedEventImageUrl] = useState(null)
    // const [clusterKey, setClusterKey] = useState(0)

    // useEffect(() => {
    //     console.log('SELECT EVENT:')
    //     console.log(selectedEvent)
    //     if (selectedEvent && selectedEvent.picturesRefs.length > 0) {
    //         getImageUrlByIdRequest(selectedEvent.picturesRefs[0], true)
    //             .then(response => {
    //                 if (response.status === 200) {
    //                     return response.text()
    //                 } else {
    //                     throw response
    //                 }
    //             })
    //             .then(url => {
    //                 setSelectedEventImageUrl(url)
    //             })
    //     } else {
    //         setSelectedEventImageUrl(null)
    //     }
    // }, [selectedEvent])
    //
    // const onMapMove = () => {
    //     incrementClusterKey()
    //     fetchEvents()
    // }
    //
    // const incrementClusterKey = () => {
    //     setClusterKey(clusterKey + 1)
    // }
    //
    // const fetchEvents = () => {
    //     const bounds = map.getBounds()
    //     clientRequest(`${PATHS.eventServiceAPI}/event/all-in-poly`, 'POST', {
    //         geoJsonPolygon: {
    //             type: 'Polygon',
    //             coordinates: [
    //                 [
    //                     [bounds.getNorthWest().lat, bounds.getNorthWest().lng],
    //                     [bounds.getSouthWest().lat, bounds.getSouthWest().lng],
    //                     [bounds.getSouthEast().lat, bounds.getSouthEast().lng],
    //                     [bounds.getNorthEast().lat, bounds.getNorthEast().lng],
    //                     [bounds.getNorthWest().lat, bounds.getNorthWest().lng]
    //                 ]
    //             ]
    //         }
    //     })
    //         .then(response => {
    //             if (response.status === 200) {
    //                 response.json().then(eventsResponse => {
    //                     console.log(eventsResponse)
    //                     setEvents(eventsResponse)
    //                 })
    //             }
    //         })
    // }
    //
    // const map = useMapEvents({
    //     moveend: onMapMove,
    // });

    return (
        <MarkerClusterGroup key={props.clusterKey}>
            {props.events.map(event => (
                <Marker key={event.id} position={[event.point.x, event.point.y]} eventHandlers={{
                    click: () => {
                        props.onMarkerSelect(event)
                    }
                }}>
                    {/*<Popup onOpen={() => {*/}
                    {/*    console.log('OPEN')*/}
                    {/*    setSelectedEvent(event)*/}
                    {/*}} onClose={() => {*/}
                    {/*    console.log('CLOSE')*/}
                    {/*    setSelectedEvent(null)*/}
                    {/*}}>*/}
                    {/*    <Card style={{ width: '14rem'}}>*/}
                    {/*        {!!selectedEventImageUrl && (*/}
                    {/*            <Card.Img variant="left" src={selectedEventImageUrl} />*/}
                    {/*        )}*/}
                    {/*        <Card.Body>*/}
                    {/*            <Card.Title>{event.name}</Card.Title>*/}
                    {/*            <Card.Text>*/}
                    {/*                {isoToLocalDateTimeForShow(event.dateTime)}*/}
                    {/*            </Card.Text>*/}
                    {/*            <a href={`/event/${event.id}`}><Button variant="primary">More details</Button></a>*/}
                    {/*        </Card.Body>*/}
                    {/*    </Card>*/}
                    {/*</Popup>*/}
                </Marker>
            ))}
        </MarkerClusterGroup>
    )
}

export default EventMarkers