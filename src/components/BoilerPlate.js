import React from 'react';

// import components (with webpack, can leave off the .js of the imported file)
import Options from './Options';
import Header from './Header';
import OptionModal from './OptionModal';


export default class BoilerPlate extends React.Component {
    
    static defaultProps = {
        options: ['Webpack configured with babel, presets: env, react, class properties',
                    'SASS styling setup'],
    };

    state = {
        options: this.props.options,
        selectedOption: undefined
    };

    clearSelectedModal = () => {
        this.setState(() => ({ selectedOption: undefined }));
    }

    addOption = (optionText) => {

        if (!optionText) {
            return 'Enter valid value to add item';
        } else if (this.state.options.indexOf(optionText) > -1) {
            return 'This option already exists!';
        }
        
        // this.setState((prevState) => {
        //     // should not mutate state or prevState, use concat to create a new array
        //     // prevState.options.push(optionText);

        //     // concat creates a new array by passing an array
        //     // or if non array value, it "pushes" the element and returns the new array
        //     // not changing the existing reference

        //     return {
        //         options: prevState.options.concat(optionText)
        //     }
        // });
            
        this.setState((prevState) => ({ options: prevState.options.concat(optionText) }));
    }

    handleDeleteOptions = () => {
        
        // arrow functions implicit returns (one line expression)
        // to do an implicit return of an object, use parentheses ()
        // this.setState(() => {
        //     return {
        //         options: []
        //     }    
        // });

        // es6 arrow func implicit return of an object
        this.setState(() => ({ options: [] }) );

    }

    handleDeleteOption = (option) => {
        console.log('Trying to remove option', option)

        this.setState((prevState) => ({
            options: prevState.options.filter((item) => item !== option)
        }));
    }
    
    render () {
        const title = 'React 16 Boilerplate';
        const subtitle = 'November 2017: Based on AndrewMead\'s React Course 2';
        
        //const options = [];

        console.log(this.state.options)

        return (
            <div className="">
                <Header title={title} subtitle={subtitle}/>
                <div className="container">
                    <div className="widget">
                        <Options options={this.state.options} 
                                    removeAll={this.handleDeleteOptions} 
                                    handleDeleteOption={this.handleDeleteOption} />
                        </div>
                </div>
                <OptionModal selectedOption={this.state.selectedOption} handleClearSelection={this.clearSelectedModal}/>
            </div>
        );
    }

        // Lifecycle methods
        componentDidMount() {
            console.log('componentDidMount() component mounted on the DOM');
    
            // fetching data from local storage
            // local storage only works with strings
            // setting an int will result it being converted to string
            // for complex data items convert to JSON string first
            
            try {
                const ls = window.localStorage;
                
                
                const optionsJSONstring = ls.getItem('options');
                
                const options = JSON.parse(optionsJSONstring);
                console.log('fetched saved data', options);
                if (options) {
                    this.setState(() => ( { options }))
                }
            } catch (e) {
                console.log(e)
            }
            
        }
    
        componentDidUpdate(prevProps, prevState) {
            console.log('componentDidUpdate() state value or prop values have changed');
            // have access to this.state, this.props
            // alos have prevProps, prevState
                    // saving data to local storage
            
            if (prevState.options.length !== this.state.options.length && this.state.options.length !== 0) {
                const ls = window.localStorage;
                
                ls.setItem('options', JSON.stringify(this.state.options));
                console.log('saved data');
            }
        }
    
        componentWillUnmount() {
            console.log('componentWillUnmount() when the component will no longer be on the screen')
        
        
    
        }
        // Lifecycle methods are not available on Stateless functional component
    

}