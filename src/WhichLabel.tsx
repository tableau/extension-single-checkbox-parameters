import { Radio } from '@tableau/tableau-ui';
import * as React from 'react';
import { Col, Container, Row } from 'reactstrap';
/* tslint:disable:no-console */

export interface SelectorProps {
    allowableValues: any;
    enabled: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onClick: (e: React.ChangeEvent<HTMLInputElement>) => void;
    checked: number;
}

// Shows if setting has not yet been configured
export const WhichLabel: React.SFC<SelectorProps> = (props) => {
    console.log(`the whichlabel props`)
    const display = props.enabled ? (

        <div className='pt-2'>
            <div className='h4'>
                        Customize
                    </div>
            <div style={{paddingLeft: '10px' }}>
                Choose the label from the values (this will be the "checked" selection)
                </div>
            <Container>
                <Row>
                    //for showing more than two parameters
                   for(var i=0;i<props.allowableValues.allowableValues.length;i++){
                    <Col className='col-sm'>
                        <Radio
                            checked={props.checked === 1}
                            onChange={props.onChange}
                            name='which_radio'
                            value='(i==0)?1:0'   >
                            {props.allowableValues.allowableValues[i].formattedValue}
                        </Radio>
                    </Col>
                                    }
                </Row>
            </Container>
        </div>) : (<div />)

    return (
        <div>
            {display}
        </div>
    );
};
