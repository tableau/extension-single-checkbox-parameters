import { Radio } from '@tableau/tableau-ui';
import * as React from 'react';
import { Col, Container, Row } from 'reactstrap';

/* tslint:disable:no-console */

export interface SelectorProps {
    enabled: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onClick: (e: React.ChangeEvent<HTMLInputElement>) => void;
    checked: string;
}

// Shows if setting has not yet been configured
export const SelectorType: React.SFC<SelectorProps> = (props) => {

    return (
        <div style={{ display: props.enabled ? '' : 'none' }} className='pt-2'>
            <div className='h5'>
                * Choose the label from the values (this will be the "checked" selection)
                </div>
            <Container>
                <Row>
                    <Col className='col-sm'>
                        <Radio
                            checked={props.checked === 'checkbox'}
                            onChange={props.onChange}
                            name='which_selector'
                            value='checkbox' >
                            Checkbox
                    <br />
                        </Radio>
                    </Col>
                    <Col className='col-sm'>
                        <Radio
                            checked={props.checked === 'toggle'}
                            onChange={props.onChange}
                            name='which_selector'
                            value='toggle'   >
                            Toggle
                </Radio>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};