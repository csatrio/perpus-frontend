import React, {PureComponent} from 'react';
import InputSelect from './InputSelect'
import InputCheckbox from './InputCheckbox'
import InputRadio from './InputRadio'
import InputRegular from './InputRegular'
import InputDatepicker from './InputDatepicker'
import InputModel from './InputModel'
import {toSearchFields} from '../../helpers/formdecorator';

export default class InputForm extends PureComponent {
    static defaultProps = {
        fields: undefined,
        model: undefined,
        title: 'InputForm'
    };

    elements = {}
    hasAnnotatedModel = false

    constructor(props) {
        super(props);
        this.hasAnnotatedModel = typeof(props.model.constructor.annotatedFields) !== 'undefined'
        if (typeof(props.fields) !== 'undefined') {
            this.fields = props.fields
            return
        }
        else if (this.hasAnnotatedModel) {
            this.fields = toSearchFields(props.model)
            return
        } else {
            throw new Error('Must have at least either annotated model or fields property')
        }
    }

    clearValues() {
        Object.keys(this.elements).forEach((key) => {
            const element = this.elements[key]
            if (typeof(element) !== 'undefined' && element.current !== null) {
                element.current.clear();
            }
        })
    }

    render() {
        const model = this.props.model
        return (
            <React.Fragment>
                {this.fields.map((item, index) => {
                    const fieldType = typeof(item.type) !== 'undefined' ? item.type : 'input';
                    const isModel = typeof(item.model) !== 'undefined'
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

                    // render model
                    else if (isModel) {
                        return <InputModel item={item} model={model} ref={elementReference} key={index}/>
                    }

                    // render regular input
                    return <InputRegular fieldType={fieldType} item={item} model={model}
                                         ref={elementReference} key={index}/>
                })}
            </React.Fragment>
        );
    }

}
