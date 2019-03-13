import * as React from 'react';
import { SingleCheckbox } from './SingleCheckbox';
import { SingleToggle } from './SingleToggle';
import './style.css';

/* tslint:disable:no-console */

declare global {
    interface Window { tableau: any; }
}

let dashboard: any; // object to hold the Tableau Dashboard
let unregisterHandler: any;  // object to hold Events

interface State {
    bg: any,
    checked: boolean;
    label: any;
    param_config: boolean;
    param_type: string;
    parameter: string;
    selector_type: string;
    show_name: boolean;
    txt: any;
    uiDisabled: boolean;
    valueFalse: any;
    valueTrue: any;
    which_label: number;
}

interface Settings {
    configured: string;
    which_label: string;
    parameter: string;
    bg: string;
    txt: string;
    selector_type: string;
    show_name: string;
}

// define what we will store in Extension Settings
let settings: Settings = {
    bg: '#F3F3F3',
    configured: 'false',
    parameter: '',
    selector_type: 'checkbox',
    show_name: 'false',
    txt: '#000000',
    which_label: ''
}

const getAll = () => {
    settings = {
        ...window.tableau.extensions.settings.getAll()
    }
}

// helper function
function fakeWhiteOverlay(hex: string) {
    const rgb = hexToRgb(hex);
    if (rgb) {
        return `rgb(${Math.min(Math.floor(rgb.r / 2) + 127, 255)}, ${Math.min(Math.floor(rgb.g / 2) + 127, 255)}, ${Math.min(Math.floor(rgb.b / 2) + 127, 255)})`;
    } else {
        return '#ffffff';
    }
}

// helper function
function hexToRgb(hex: string) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        b: parseInt(result[3], 16),
        g: parseInt(result[2], 16),
        r: parseInt(result[1], 16),
    } : null;
}

class BooleanFilter extends React.Component {
    public state: State = {
        bg: '#F3F3F3',  // default tableau background color
        checked: false,
        label: '',
        param_config: false,
        param_type: '',
        parameter: '',
        selector_type: 'checkbox',
        show_name: false,
        txt: '#000000',
        uiDisabled: false,
        valueFalse: '',
        valueTrue: '',
        which_label: 0
    }


    public constructor(props: any) {
        super(props)
        this.onChange = this.onChange.bind(this)
        this.onChangeToggle = this.onChangeToggle.bind(this)
        this.setParamData = this.setParamData.bind(this)
        this.resetParams = this.resetParams.bind(this)
        this.eventChange = this.eventChange.bind(this)
    }

    // Pops open the configure page if extension isn't configured
    public configure = (): void => {
        // unregister event handler
        try {
            unregisterHandler();
            console.log('Unregistering Event Handler');
        }
        catch (err) {
            console.log('Ignore error handler as it is not set yet.');
        }

        const popupUrl = (window.location.origin.includes('localhost')) ? `${window.location.origin}/#/config` : `${window.location.origin}/extension-single-checkbox-parameters/#/config`;
        const payload = '';
        window.tableau.extensions.ui.displayDialogAsync(popupUrl, payload, { height: 650, width: 450 }).then((closePayload: string) => {
            console.log(`returning from Configure! ${closePayload}`)
            if (closePayload === 'true') {
                this.getParamData();


            }
            else {
                this.resetParams();

            }
        }).catch((error: any) => {
            if (window.tableau.extensions.settings.get('configured') !== 'true') {
                this.resetParams()
            }
            switch (error.errorCode) {
                case window.tableau.ErrorCodes.DialogClosedByUser:
                    console.log('Dialog was closed by user.');
                    break;
                default:
                    console.error(error.message);
            }
        });
    }

    // Once we have mounted, we call to initialize
    public componentWillMount() {
        window.tableau.extensions.initializeAsync({ configure: this.configure }).then(() => {
            getAll();
            if (settings.configured === 'true') {
                this.getParamData();
            } else {
                this.configure();
            }
        });
    }

    // reset all parameters
    public resetParams = () => {
        this.setState({
            bg: '#F3F3F3',
            label: '',
            param_config: false,
            param_type: '',
            parameter: '',
            selector_type: 'checkbox',
            show_name: false,
            txt: '#000000',
            uiDisabled: false,
            valueFalse: '',
            valueTrue: '',
            which_label: 0
        })
    }

    // this function handles loading and of stored values and live params 
    public getParamData = (): void => {
        getAll()
        try {
            unregisterHandler()
            console.log(`Unregistering Event Handler`)
        }
        catch (err) {
            console.log(`Ignore error handler as it isn't set yet.`)
        }
        dashboard = window.tableau.extensions.dashboardContent.dashboard;
        dashboard.findParameterAsync(settings.parameter)
            .then((param: any) => {
                const indexFalse = settings.which_label === '0' ? 1 : 0
                const indexTrue = settings.which_label === '0' ? 0 : 1
                const currLabel = param.allowableValues.allowableValues[indexTrue].formattedValue
                this.setState((prevState) => ({
                    bg: (settings.bg ? fakeWhiteOverlay(settings.bg) : '#ffffff'),
                    checked: param.currentValue.formattedValue === currLabel ? true : false,
                    label: currLabel,
                    param_config: true,
                    param_type: param.dataType,
                    parameter: param.name,
                    selector_type: settings.selector_type,
                    show_name: settings.show_name === 'true' ? true : false,
                    txt: settings.txt,
                    valueFalse: param.allowableValues.allowableValues[indexFalse].formattedValue,
                    valueTrue: param.allowableValues.allowableValues[indexTrue].formattedValue,
                }))
                document.body.style.backgroundColor = settings.bg;
                document.body.style.color = settings.txt;
                unregisterHandler = param.addEventListener(window.tableau.TableauEventType.ParameterChanged, this.eventChange)
            }
            )
    }

    // if there is an event change then update the value of the parameter
    public eventChange = (): void => {
        dashboard.findParameterAsync(this.state.parameter).then((param: any) => {
            // if the current (real) parameter formatted value = the value that is displayed
            if (param.currentValue.formattedValue === this.state.valueTrue) {
                this.setState({ checked: true })
            }
            else {
                this.setState({ checked: false })
            }
        })
    }

    // this function is for a user clicking the checkbox in the checkbox parameter
    public onChange = (e: any): void => {

        this.setState({ checked: e.target.checked })
        this.setParamData(e.target.checked)
    }

    // this function is when a user changes the toggle/switch
    public onChangeToggle = (isChecked: boolean, e: any, id: any): void => {
        this.setState({ checked: isChecked })
        this.setParamData(isChecked)
    }

    // set the parametr value based on the checkbox value
    public setParamData = (checked: boolean) => {
        dashboard.findParameterAsync(this.state.parameter).then((param: any) => {
            // Disable the checkbox first, re-enable it when returning from the promise
            this.setState((prevState)=>({
                uiDisabled: true
            }))
            if (checked) {
                param.changeValueAsync(this.state.valueTrue)
                .then(()=>{
                    this.setState((prevState)=>({
                        uiDisabled: false
                    }))
                })
            }
            else {
                param.changeValueAsync(this.state.valueFalse)
                .then(()=>{
                    this.setState((prevState)=>({
                        uiDisabled: false
                    }))
                })
            }
        })
    }

    public render() {
        const str = 'Please Configure this extension!'
        let display = (<div>{str}</div>)

        if (!this.state.param_config) {
            display = (<div>{str}</div>)
        }
        else if (this.state.selector_type === 'checkbox') {
            display = (<SingleCheckbox 
                onChange={this.onChange} 
                onClick={this.onChange} 
                checked={this.state.checked} 
                uiDisabled={this.state.uiDisabled}
                label={this.state.label} 
                txt={this.state.txt} 
                bg={this.state.bg} 
                parameter={this.state.parameter}
                show_name={this.state.show_name}
            />)
        }
        else {
            display = (<SingleToggle 
                onChange={this.onChangeToggle} 
                checked={this.state.checked} 
                uiDisabled={this.state.uiDisabled}
                label={this.state.label} 
                txt={this.state.txt} 
                bg={this.state.bg} 
                parameter={this.state.parameter}
                show_name={this.state.show_name}
            />)
        }

        return (
            <div className='container p-0 m-0 d-flex flex-fill w-100 align-self-center' style={{ height: '100%' }} >
                {display}
            </div>
        )
    }
}

export default BooleanFilter;