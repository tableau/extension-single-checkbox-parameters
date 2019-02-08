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

            <div>
                <div className='h5'>
                * Choose the label from the values (this will be the "checked" selection)
                </div>
                <Container>
                    <Row>
                        <Col className='col-sm'>
                        <Radio
                    checked={props.checked===0}
                    onChange={props.onChange}
                    name='which_radio'
                    value='0' >
                    {props.allowableValues.allowableValues[0].formattedValue} 
                    <br />

                </Radio>
                        </Col>
                        <Col className='col-sm'>
                        <Radio
                    checked={props.checked===1}
                    onChange={props.onChange}
                    name='which_radio'
                    value='1'   >
                    {props.allowableValues.allowableValues[1].formattedValue} 

                </Radio>
                        </Col>
                    </Row>
                </Container>
                
        

               
            

        </div>) : (<div />)


    return (
        <div className='selector'>
            {display}

        </div>
    );
};


