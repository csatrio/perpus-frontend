import React, {PureComponent} from 'react';
import InputSelect from './InputSelect'
import InputCheckbox from './InputCheckbox'
import InputRadio from './InputRadio'
import InputRegular from './InputRegular'
import InputDatepicker from './InputDatepicker'

export default class InputForm extends PureComponent {
    static defaultProps = {
        fields: [],
        model: {},
        title: 'InputForm'
    };

    constructor(props) {
        super(props);
        this.elements = {}
    }

    clearValues() {
        Object.keys(this.elements).forEach((key) => {
            const element = this.elements[key]
            if (typeof(element) !== 'undefined' && element.current !== null) {
                element.current.value = '';
                this.props.model[key] = ''
            }
        })
    }

    render() {
        const model = this.props.model
        return (
            <React.Fragment>
                {this.props.fields.map((item, index) => {
                    const fieldType = typeof(item.type) !== 'undefined' ? item.type : 'input';
                    this.elements[item.accessor] = React.createRef();
                    const elementReference = this.elements[item.accessor];

                    // render select box
                    if (fieldType === 'select') {
                        return <InputSelect item={item} model={model} ref={elementReference} key={index}/>

                    }

                    // render checkbox
                    else if (fieldType === 'checkbox') {
                        return <InputCheckbox item={item} model={model} ref={elementReference} key={index}/>
                    }

                    // render radio
                    else if (fieldType === 'radio') {
                        return <InputRadio item={item} model={model} ref={elementReference} key={index}/>
                    }

                    // render datepicker
                    else if (fieldType === 'datepicker') {
                        return <InputDatepicker item={item} model={model} ref={elementReference} key={index}/>
                    }

                    // render regular input
                    return <InputRegular fieldType={fieldType} item={item} model={model}
                                         ref={elementReference} key={index}/>
                })}
            </React.Fragment>
        );
    }

}
