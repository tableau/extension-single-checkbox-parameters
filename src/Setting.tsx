import * as React from 'react';
import { Selected } from './Selected';
import { Selector } from './Selector';

declare global {
    interface Window { tableau: any; }
}

export interface SettingProps {
    config: boolean;
    enabled: boolean;
    list: string[];
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    onClear: () => void;
    onClick: () => void;
    selected: string;
}

export const Setting: React.SFC<SettingProps> = (props) => {
    const env = window.tableau.extensions.environment;
    let warning: any = (<div />)
    if (env !== undefined) {
        if (env.operatingSystem === 'mac' && env.tableauVersion.includes('2018') && !props.config) {
            warning = (<div style={{ color: 'red', fontStyle: 'italic', fontSize:'8pt' }}>Known issue: Please select dropdown values with your keyboard.</div>)
        }
    }

    return (
        <React.Fragment>
            <div>
            {renderSelectElement(props)}
            </div>

            <div>
                {warning}
            </div>
        </React.Fragment>
    );
};

Setting.displayName = 'Setting';

function renderSelectElement(props: SettingProps): JSX.Element {
    const { config, enabled, list,  onChange, onClear, onClick, selected } = props;


    return config ? <Selected onClear={onClear} selected={selected} /> :
                    <Selector enabled={enabled} list={list} onChange={onChange} onClick={onClick} selected={selected} />;
}
