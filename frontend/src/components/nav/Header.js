import React from 'react';
import DehazeIcon from '@material-ui/icons/Dehaze';

export default function Header(props) {

    const {onToggleMenu} = props;

    return (
        <>
            <header>
                <label>Hola</label>
                <div className="header-toggle">
                    <button onClick={() => onToggleMenu()}><DehazeIcon/></button>
                </div>
            </header>
        </>
    );
}