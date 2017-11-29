import React from 'react';

import ReactMapboxGl, { Layer, Feature, Source } from "react-mapbox-gl";

import mapboxgl from 'mapbox-gl'

const Map = ReactMapboxGl({
    accessToken: "pk.eyJ1Ijoic2N1bGxlbiIsImEiOiJ1UVAwZ19BIn0.wn4ltQcyl9P5j3bAmNJEPg"
});

mapboxgl.accessToken = 'pk.eyJ1Ijoic2N1bGxlbiIsImEiOiJ1UVAwZ19BIn0.wn4ltQcyl9P5j3bAmNJEPg'


export default class Main extends React.Component {


    static defaultProps = {
        
    };

    state = {
        initialLoad: 0,
        panLoadAvg: 0,
        panLoadArray: [],
        zoomLoadAvg: 0,
        zoomLoadArray: [],
        rasterMode: 'tiled'
    };

    clearSelectedModal = () => {
        this.setState(() => ({ selectedOption: undefined }));
    }

    startPanningMap = (func) => {

        this.firstRenderDate = new Date();
        console.log('setting first render start time')

        let panValue = 500;

        switch (this.mapIsMoving) {
            case 0:

                if (this.state.panLoadArray.length === 4)
                    this.setState({
                        panLoadArray: []
                    })

                this.map.panBy([panValue, 0], {duration: 0})

                this.mapIsMoving = 1;
                break;
            case 1:
                this.map.panBy([0, panValue], {duration: 0})

                this.mapIsMoving = 2;
                break;
            case 2:
                this.map.panBy([-panValue, 0], {duration: 0})

                this.mapIsMoving = 3;
                break;
            case 3:
                this.map.panBy([0, -panValue], {duration: 0})
                this.mapIsMoving = 4;
                break;
        }

        func();

    };

    changeRasterMode = (e) => {
        console.log(e);

        this.setState({
            rasterMode: e.target.value
        })


        if (e.target.value === 'raw') {

            console.log()

            if (this.map.getLayer('raw_layer') !== undefined)
                this.map.removeLayer('raw_layer');
            if (this.map.getLayer('tile_layer') !== undefined)
                this.map.removeLayer('tile_layer');
            if (this.map.getLayer('mipmap1_layer') !== undefined)
                this.map.removeLayer('mipmap1_layer');
            if (this.map.getLayer('mipmap2_layer') !== undefined)
                this.map.removeLayer('mipmap2_layer');
            if (this.map.getLayer('mipmap3_layer') !== undefined)
                this.map.removeLayer('mipmap3_layer');

            if (this.map.getLayer('raw_layer') === undefined) {

                this.map.addLayer({
                    id: 'raw_layer',
                    type: 'raster',
                    source: 'raw_source'
                });

                console.log('adding raw layer')
            }
        }

        if (e.target.value === 'tiled') {

            console.log()

            if (this.map.getLayer('raw_layer') !== undefined)
                this.map.removeLayer('raw_layer');
            if (this.map.getLayer('tile_layer') !== undefined)
                this.map.removeLayer('tile_layer');

            if (this.map.getLayer('mipmap1_layer') !== undefined)
                this.map.removeLayer('mipmap1_layer');
            if (this.map.getLayer('mipmap2_layer') !== undefined)
                this.map.removeLayer('mipmap2_layer');
            if (this.map.getLayer('mipmap3_layer') !== undefined)
                this.map.removeLayer('mipmap3_layer');

            if (this.map.getLayer('tile_layer') === undefined) {

                this.map.addLayer({
                    id: 'tile_layer',
                    type: 'raster',
                    source: 'tile_source'
                });

                console.log('adding tile layer')
            }
        }

        if (e.target.value === 'mipmap') {

            if (this.map.getLayer('raw_layer') !== undefined)
                this.map.removeLayer('raw_layer');

            if (this.map.getLayer('tile_layer') !== undefined)
                this.map.removeLayer('tile_layer');

            if (this.map.getLayer('mipmap1_layer') !== undefined)
                this.map.removeLayer('mipmap1_layer');

            if (this.map.getLayer('mipmap2_layer') !== undefined)
                this.map.removeLayer('mipmap2_layer');

            if (this.map.getLayer('mipmap3_layer') !== undefined)
                this.map.removeLayer('mipmap3_layer');

            console.log(this.map.getZoom());

                if (this.map.getZoom() <= 8) {

                    if (this.map.getLayer('mipmap3_layer') === undefined) {
                        this.map.addLayer({
                            id: 'mipmap3_layer',
                            type: 'raster',
                            source: 'mipmap3_source'
                        });
                        console.log('adding mipmap layer zoomed out')

                        this.map.getLayer('mipmap3_layer');
                    }
                } else if (this.map.getZoom() <= 9 && this.map.getZoom() > 8) {

                    if (this.map.getLayer('mipmap2_layer') === undefined) {
                        this.map.addLayer({
                            id: 'mipmap2_layer',
                            type: 'raster',
                            source: 'mipmap2_source'
                        });

                        console.log('adding mipmap layer mid zoom')
                    }

                } else if (this.map.getZoom() > 9) {
                    if (this.map.getLayer('mipmap1_layer') === undefined) {
                        this.map.addLayer({
                            id: 'mipmap1_layer',
                            type: 'raster',
                            source: 'mipmap1_source'
                        });
                        console.log('adding mipmap layer close zoom')
                    }
                }
        }
    }

    startZoomMap(zoom) {
        this.map.setZoom(zoom);
        this.firstRenderDate = new Date();

    }

    // Lifecycle methods
    componentDidMount() {
        console.log('componentDidMount() component mounted on the DOM');

        this.continue = false;
        this.firstRender = true;
        this.initialLoad = true;
        this.panCount = 1;

        this.mapIsMoving = -1;
        this.mapIsZooming = -1;

        this.map = new mapboxgl.Map({
            container: this.mapContainer,
            style: 'mapbox://styles/mapbox/empty-v9',
            center: [-5.125, 51.835],
            zoom: 8,
            interactive: false
        });

        this.map.on('zoomend', (e) => {
            console.log(e);

            if (this.map.getLayer('mipmap1_layer') !== undefined)
                this.map.removeLayer('mipmap1_layer');
            if (this.map.getLayer('mipmap2_layer') !== undefined)
                this.map.removeLayer('mipmap2_layer');
            if (this.map.getLayer('mipmap3_layer') !== undefined)
                this.map.removeLayer('mipmap3_layer');

            console.log('map zoom ', this.map.getZoom());

            if (this.state.rasterMode === 'mipmap') {
                if (this.map.getZoom() <= 8) {
                    if (this.map.getLayer('mipmap3_layer') === undefined) {
                        this.map.addLayer({
                            id: 'mipmap3_layer',
                            type: 'raster',
                            source: 'mipmap3_source'
                        });
                        console.log('===================================adding mipmap layer zoomed out')
                    }
                } else if (this.map.getZoom() <= 9 && this.map.getZoom() > 8) {
                    if (this.map.getLayer('mipmap2_layer') === undefined) {
                        this.map.addLayer({
                            id: 'mipmap2_layer',
                            type: 'raster',
                            source: 'mipmap2_source'
                        });
                        console.log('=============================adding mipmap layer mid zoom')
                    }

                } else if (this.map.getZoom() > 9) {
                    if (this.map.getLayer('mipmap1_layer') === undefined) {
                        this.map.addLayer({
                            id: 'mipmap1_layer',
                            type: 'raster',
                            source: 'mipmap1_source'
                        });
                        console.log('=======================adding mipmap layer close zoom')
                    }

                }
            }
        });

        this.map.on('render', (e) => {
            // console.log('still rendering' + new Date());
            // console.log(e)

            let waitValue = 6000;

            if (this.firstRender && this.initialLoad === true) {
                this.firstRenderDate = new Date();
                console.log('setting inital load start time')
                this.firstRender = false;
            }

            clearTimeout(this.lastRender);

            this.lastRender = setTimeout(() => {
                console.log('okay, that actually was the last render call')

                this.firstRender = true;

                this.lastRenderDate = new Date();

                if (this.mapIsMoving !== -1) {

                    console.log('------------------- PAN LOAD TIME total render time required: ', this.lastRenderDate.getTime() - this.firstRenderDate.getTime() - waitValue)

                    this.setState((prevState) => {

                        let updatedArray = prevState.panLoadArray.concat((this.lastRenderDate.getTime() - this.firstRenderDate.getTime() - waitValue))

                        let arraySum = updatedArray.reduce((prev, curr) => {
                            return prev + curr;
                        });

                        let arrayAvg = arraySum / updatedArray.length;

                        return {
                            panLoadArray: updatedArray,
                            panLoadAvg: arrayAvg
                        }
                    })

                    if (this.mapIsMoving === 4)
                        this.startPanningMap(() => {this.mapIsMoving = -1});
                    else
                        this.startPanningMap(() => {console.log('nothing is happening')});


                    console.log('Inside this map is Moving' + this.mapIsMoving);



                }


                if (this.mapIsZooming !== -1) {

                    console.log('------------------- Zoom LOAD TIME total render time required: ', this.lastRenderDate.getTime() - this.firstRenderDate.getTime() - waitValue)
                    this.mapIsZooming = -1;

                    console.log('inside map is zooming' + this.mapIsZooming)

                    this.setState((prevState) => {

                        let updatedArray = prevState.zoomLoadArray.concat((this.lastRenderDate.getTime() - this.firstRenderDate.getTime() - waitValue))

                        let arraySum = updatedArray.reduce((prev, curr) => {
                            return prev + curr;
                        });

                        let arrayAvg = arraySum / updatedArray.length;

                        return {
                            zoomLoadArray: updatedArray,
                            zoomLoadAvg: arrayAvg
                        }
                    })
                }

                if (this.initialLoad && ((this.lastRenderDate.getTime() - this.firstRenderDate.getTime() - waitValue) > 250)) {
                    console.log('========= INITIAL LOAD TIME total render time required: ', this.lastRenderDate.getTime() - this.firstRenderDate.getTime() - waitValue)
                    this.initialLoad = false;
                    
                    // reduce the wait value after the initial load is ffinished
                    waitValue = 2500;
                    this.setState({
                        initialLoad: this.lastRenderDate.getTime() - this.firstRenderDate.getTime() - waitValue
                    });
                }
            }, waitValue);

        });

        this.map.on('moveend', (e) => {
            console.log('map stoped moving' + new Date());
        })

        this.map.on('dataloading', (e) => {
            console.log('data loading')
        })

        this.map.on('styledata', (e) => {

            if (this.map.getSource('raw_source') === undefined) {
                this.map.addSource('raw_source', {
                    type: 'image',
                    url: '/result3.png',
                    coordinates: [[-5.934201771700001, 52.3140232376],
                        [-4.3240754497, 52.3430543844],
                        [-4.2954215353, 51.3560798434],
                        [-5.8707891485, 51.3280532478]]
                });
                console.log('adding source')
            }

            if (this.map.getSource('mipmap1_source') === undefined) {
                this.map.addSource('mipmap1_source', {
                    type: 'image',
                    url: '/result_75.png',
                    coordinates: [[-5.934201771700001, 52.3140232376],
                        [-4.3240754497, 52.3430543844],
                        [-4.2954215353, 51.3560798434],
                        [-5.8707891485, 51.3280532478]]
                });
                console.log('adding source')

            }

            if (this.map.getSource('mipmap2_source') === undefined) {
                this.map.addSource('mipmap2_source', {
                    type: 'image',
                    url: '/result_50.png',
                    coordinates: [[-5.934201771700001, 52.3140232376],
                        [-4.3240754497, 52.3430543844],
                        [-4.2954215353, 51.3560798434],
                        [-5.8707891485, 51.3280532478]]
                });
                console.log('adding source')

            }

            if (this.map.getSource('mipmap3_source') === undefined) {
                this.map.addSource('mipmap3_source', {
                    type: 'image',
                    url: '/result_25.png',
                    coordinates: [[-5.934201771700001, 52.3140232376],
                        [-4.3240754497, 52.3430543844],
                        [-4.2954215353, 51.3560798434],
                        [-5.8707891485, 51.3280532478]]
                });
                console.log('adding source')

            }

            if (this.map.getSource('tile_source') === undefined) {
                this.map.addSource('tile_source', {
                    "type": "raster",
                    "tiles": [
                        "http://localhost:8081/tiles4/{z}/{x}/{y}.png"
                    ],
                    "scheme": "tms",
                    "tileSize": 256


                });
                console.log('adding tile source')
            }


            // set layer based on rasterMode
            if( this.state.rasterMode === 'tiled') {

                if (this.map.getLayer('tile_layer') === undefined) {


                    this.map.addLayer({
                        id: 'tile_layer',
                        type: 'raster',
                        source: 'tile_source'
                    });

                    console.log('adding layer')
                }
            } else if (this.state.rasterMode === 'raw') {
                if (this.map.getLayer('raw_layer') === undefined) {


                    this.map.addLayer({
                        id: 'raw_layer',
                        type: 'raster',
                        source: 'raw_source'
                    });

                    console.log('adding layer')
                }


            } else if (this.state.rasterMode === 'mipmap') {
                if (this.map.getZoom() <= 8) {
                    if (this.map.getLayer('mipmap3_layer') === undefined) {
                        this.map.addLayer({
                            id: 'mipmap3_layer',
                            type: 'raster',
                            source: 'mipmap3_source'
                        });
                        console.log('adding mipmap layer zoomed out')
                    }
                } else if (this.map.getZoom() <= 9 && this.map.getZoom() > 8) {
                    if (this.map.getLayer('mipmap2_layer') === undefined) {
                        this.map.addLayer({
                            id: 'mipmap2_layer',
                            type: 'raster',
                            source: 'mipmap2_source'
                        });
                        console.log('adding mipmap layer mid zoom')
                    }

                } else if (this.map.getZoom() > 9) {
                    if (this.map.getLayer('mipmap1_layer') === undefined) {
                        this.map.addLayer({
                            id: 'mipmap1_layer',
                            type: 'raster',
                            source: 'mipmap1_source'
                        });
                        console.log('adding mipmap layer close zoom')
                    }
                }


            }



        });

    }

    componentDidUpdate(prevProps, prevState) {
        console.log('componentDidUpdate() state value or prop values have changed');
    }

    componentWillUnmount() {
        console.log('componentWillUnmount() when the component will no longer be on the screen')

       
    }
    // Lifecycle methods are not available on Stateless functional component
    render () {

        let fileStringComplete = './30' + '.geojson';

        console.log(fileStringComplete)

        let that = this;

        fetch(fileStringComplete).then(function(response) {
            return response.json();

        }).then(function(myJSON) {
            let newArray = [];

            console.log(myJSON)

            for (let feature of myJSON.features) {

                if (feature.properties.name.slice(-3) === 'UUC') {


                    feature.name = '30' + 'UUC';
                    console.log(feature);

                    newArray.push(feature);

                }
            }

            console.log('New Array: ', newArray)


        });

        const style =  {
                gridColumn: "span 1",
                gridRow: "span 1",
                height: "600px",
                width: "600px"
            }
        ;

        return (

            <div className="main-container">
                <h1>Raster Data Source Testing</h1>
                <div className="mapContainer" style={style} ref={el => this.mapContainer = el}/>

                    <div className="controls">
                        <button onClick={() => {
                            this.mapIsMoving = 0;
                            this.startPanningMap(() => { undefined });
                        }} disabled={ this.state.initialLoad === 0 }>Start Moving Map</button>
                        <button onClick={() => {
                            this.mapIsZooming = 0;
                            this.startZoomMap(8);
                        }} disabled={ this.state.initialLoad === 0 || this.mapIsZooming !== -1}>Scale Map Out</button>
                        <button onClick={() => {
                            this.mapIsZooming = 0;
                            this.startZoomMap(9);
                        }} disabled={ this.state.initialLoad === 0 || this.mapIsZooming !== -1}>Scale Map Mid</button>
                        <button onClick={() => {
                            this.mapIsZooming = 0;
                            this.startZoomMap(12);
                        }} disabled={ this.state.initialLoad === 0 || this.mapIsZooming !== -1}>Scale Map In</button> <br/>

                        <label>
                            <input type="radio" value="raw" onChange={this.changeRasterMode} checked={this.state.rasterMode === 'raw'} />
                            Raw Raster
                        </label>

                        <label>
                            <input type="radio" value="mipmap"  onChange={this.changeRasterMode} checked={this.state.rasterMode === 'mipmap'} />
                            MipMap Raster
                        </label>
                        <label>
                            <input type="radio" value="tiled"  onChange={this.changeRasterMode} checked={this.state.rasterMode === 'tiled'} />
                            Tiled Raster
                        </label>

                        <p>Initial Load Time: {this.state.initialLoad}</p>
                        <p>Pan Avg Load Time: {this.state.panLoadAvg}</p>
                        <p>Pan {this.mapIsMoving + 1}</p>
                        <p>Pan Load Times:</p>
                        <ul>{ this.state.panLoadArray.map((item, count) => {
                            return (<li>Pan {count}: {item}</li>);
                        })}
                        </ul>
                        {/*<div className="leaflet-map" ref={ref => this.leafletMap = ref}></div>*/}
                        {/*</Map>*/}

                        <p>Zoom Avg Load Time: {this.state.zoomLoadAvg}</p>
                        <p>Zoom {this.mapIsZooming + 1}</p>
                        <p>Zoom Load Times:</p>
                        <ul>{ this.state.zoomLoadArray.map((item, count) => {
                            return (<li>Zoom {count}: {item}</li>);
                        })}
                        </ul>

                        {console.log(this.mapIsZooming)}

                    </div>
            </div>
        );
    }

}