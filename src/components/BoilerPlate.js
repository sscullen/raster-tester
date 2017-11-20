import React from 'react';

import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";
import DrawControl from 'react-mapbox-gl-draw';

const Map = ReactMapboxGl({
    accessToken: "pk.eyJ1Ijoic2N1bGxlbiIsImEiOiJ1UVAwZ19BIn0.wn4ltQcyl9P5j3bAmNJEPg"
});

export default class BoilerPlate extends React.Component {
    

 

    static defaultProps = {
        
    };

    state = {
    };

    setupCallbacks = (map) => {
        console.log('setting up event listeners now that the styles have finished loading!');
        
        map.on('draw.create', (e) => {
            console.log('ive created a polygon');
            console.log('heres what was created', e)
        })
    }

    clearSelectedModal = () => {
        this.setState(() => ({ selectedOption: undefined }));
    }


    // Lifecycle methods
    componentDidMount() {
        console.log('componentDidMount() component mounted on the DOM');
    }

    componentDidUpdate(prevProps, prevState) {
        console.log('componentDidUpdate() state value or prop values have changed');
    }

    componentWillUnmount() {
        console.log('componentWillUnmount() when the component will no longer be on the screen')

       
    }
    // Lifecycle methods are not available on Stateless functional component
    render () {

        return (
            <div className="">
                <h1>Mapbox Test</h1>
                <Map
                style="mapbox://styles/mapbox/streets-v9"
                containerStyle={{
                  height: "90vh",
                  width: "90vw"
                }}
                onStyleLoad={(map) => this.setupCallbacks(map)}>
                  <Layer
                    type="symbol"
                    id="marker"
                    layout={{ "icon-image": "marker-15" }}>
                    <Feature coordinates={[-0.481747846041145, 51.3233379650232]}/>
                  </Layer>
                  <DrawControl />
              </Map>
            </div>
        );
    }

}