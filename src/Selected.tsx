import * as React from 'react';

import { Button } from '@tableau/tableau-ui';

declare global {
    interface Window { tableau: any; }
}

export interface SelectedProps {
    onClear: () => void;
    selected: string;
}

// An individual setting that has been set
export const Selected: React.SFC<SelectedProps> = (props) => {
    return (
        <div className='d-flex flex-row'>
            <div className='p-2 w-100'>
            <i>The parameter <b>{props.selected}</b> has been selected</i>


            </div>
            <div className='p-2 flex-shrink-1'>

            <Button onClick={props.onClear} style={{ marginLeft: '12px' }}>Clear</Button>
            </div>
        </div>

    );
};
