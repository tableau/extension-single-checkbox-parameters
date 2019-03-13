import * as React from 'react';

import { Button, ButtonProps, DropdownSelect, DropdownSelectProps } from '@tableau/tableau-ui';

export interface SelectorProps {
    enabled: boolean;
    list: string[];
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    onClick: () => void;
    selected: string;
}

// Shows if setting has not yet been configured
export const Selector: React.SFC<SelectorProps> = (props) => {
    const dropdownSelectProps: DropdownSelectProps = {
        className: 'dropdown-select',
        disabled: !props.enabled,
        kind: 'line',
        onChange: props.onChange,
        onSelect: props.onChange,
        value: props.selected,
    };

    const buttonProps: ButtonProps = {
        disabled: !props.enabled || props.selected === '',
        kind: 'filledGreen',
        onClick: props.onClick,
        style: { marginLeft: '12px' },
    };

    return (
        <div className='d-flex flex-row'>
            <div className='p-2 w-100'>
                <DropdownSelect {...dropdownSelectProps} className='w-100'>
                    {props.list.map(option => <option key={option}>{option}</option>)}
                </DropdownSelect>
            </div>
            <div className='p-2 flex-shrink-1'>
                <Button {...buttonProps}>Set</Button>
            </div>
        </div>
    );
};
