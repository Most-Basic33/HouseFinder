import React, { useCallback, useEffect, useState, useRef } from 'react'
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react'
import { API_KEY } from './Api'
import './Map.css'
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete'
import { Combobox, ComboboxInput, ComboboxPopover, ComboboxList, ComboboxOption } from '@reach/combobox'
import "@reach/combobox/styles.css"
import { connect } from 'react-redux'
import { requestHomes } from '../../ducks/reducer'
import house1 from './house1.png'

const MapContainer = (props) => {
    const date = new Date(),
        hours = date.getHours(),
        minutes = date.getMinutes(),
        seconds = date.getSeconds()
 
    const [markers, setMarkers] = useState([])
    const [selected, setSelected] = useState(null)
    const [homes, setHomes] = useState([])
   const [addressLat, setAddressLat] = useState([])


    //Use Ref when you want retain state without causing a re-render
    const mapRef = useRef()

    const initialCenter = {
        lat: 33.4373,
        lng: -112.0078
    }
    const onMapLoad = useCallback((map) => {
        mapRef.current = map
    }, []);
    // console.log(markers) // console.log(this.state.API_KEY)
    const dash = () => {
        props.history.push('/dash')
    }



    useEffect(() => {
        requestHomes()
        setHomes(props.homes)


    }, [homes])



    console.log(markers)
    useEffect(() => {
        if (homes) {
           // let spots = [];
            homes.map(async (locations, index) => {
                console.log(locations.address)
                const { address } = locations
                const results = await getGeocode({ address })
                const spot = await getLatLng(results[0])
                  
                
            //    spots.push(spot)
              //  console.log(spots)
                
                console.log(spot)
                
                setAddressLat( addressLat => [...addressLat, spot])

            })
            console.log(addressLat)
        }

    }, [homes])

    function Locate({ panTo }) {
        return <button
            className='locate_button'
            onClick={() => {
                navigator.geolocation.getCurrentPosition((position) => {
                    // panTo(position)
                    const latlng = { lat: position.coords.latitude, lng: position.coords.longitude }
                    console.log(latlng)
                    panTo(latlng)
                    console.log(position)
                }, () => null);
            }}
        >Locate Me</button>
    }

    const fetchPlaces = (mapProps, map) => {
        const { google } = mapProps;
        const service = new props.google.maps.places.PlacesService(map)
        mapRef.current = map

    }

    const panTo = useCallback((spot) => {
        // console.log(lat)
        console.log(mapRef)
        mapRef.current.panTo(spot)
        mapRef.current.setZoom(15)
    }, [])

    const Search = ({ panTo }) => {
        const { ready,
            value,
            suggestions: { status, data },
            setValue,
            clearSuggestions, } = usePlacesAutocomplete({
                requestOptions: {
                    location: { lat: () => 33.4373, lng: () => -112.0078 },
                    radius: 300 * 1000,
                }
            });
        return <div className='search_div'>
            <Combobox
                onSelect={async (address) => {
                    setValue(address, false)
                    clearSuggestions();
                    try {
                        const results = await getGeocode({ address })
                        const spot = await getLatLng(results[0])
                        //console.log(spot)

                        panTo(spot)

                        console.log(results[0])
                    } catch (err) {
                        console.log(err)
                    }

                }}
            >
                <ComboboxInput
                    value={value}
                    onChange={(e) => {
                        setValue(e.target.value)
                    }}
                    disabled={!ready}
                    placeholder='Enter Search Address'
                />
                <ComboboxPopover>
                    <ComboboxList>


                        {status === "OK" && data.map(({ id, description }) =>
                            <ComboboxOption
                                key={id}
                                value={description} />)}
                    </ComboboxList>
                </ComboboxPopover>


            </Combobox>
        </div>
    }
    console.log(addressLat)
    // console.log(homes)
    // console.log(props)
    const mapClicked = useCallback((mapProps, map, event) => {
        // console.log(mapProps)
        // console.log(map)
        // console.log(event.latLng.lat())

        setMarkers((current => [...current, {
            lat: event.latLng.lat(),
            lng: event.latLng.lng(),
            time: new Date()
        }]))

    }, [])

    return (

        <div>
            <div id='onMap'>
                <button onClick={dash}>Close</button>
                <h1> Home Finder</h1>
            </div>
            <Search panTo={panTo} />
            <Locate panTo={panTo} />
            <Map
                google={props.google}
                zoom={14}
                onClick={mapClicked}
                onReady={fetchPlaces}
                centerAroundCurrentLocation={true}
                initialCenter={initialCenter}
                onLoad={onMapLoad}
            >
                {markers.map(marker => <Marker
                    key={marker.time.toISOString()}
                    onCloseClick={() => {
                        setSelected(null)
                    }}
                    position={{ lat: marker.lat, lng: marker.lng }}
                    onClick={() => {
                        setSelected(marker)
                    }}
                />)}
                {selected ? (<InfoWindow
                    position={{ lat: selected.lat, lng: selected.lng }}
                    visible={true}

                >
                    <div>
                        <h2>Here a player click</h2>
                        <p>{`${hours}:${minutes}:${seconds}`}</p>



                    </div>
                </InfoWindow>) : null}
                {addressLat.map((ele,i)=>{
                  return(
                    <Marker 
                    key={ele.id}
                    icon={house1}
                position={{
                    lat:(ele.lat),
                    lng:(ele.lng)
                }}
                />
                  )
              })}  
              
               

            </Map>
        </div>
    )
}
const mapStateToProps = reduxState => {
    return {
        homes: reduxState.homes
    }
}

export default GoogleApiWrapper({
    apiKey: API_KEY,
    libraries: ['places'],
    LoadingContainer: MapContainer
})(connect(mapStateToProps, { requestHomes })(MapContainer))