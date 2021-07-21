import { useState, useEffect } from 'react';
import axios from 'axios';
import { Icon } from 'semantic-ui-react';

export default function SkillDisplay({ label, level }) {
    const [editable, setEditable] = useState(false);
    return (
        <div>
            <div>
            <div><h4>{label}</h4></div>
            <div><h5>{level}</h5></div>
            </div>
            <div>afficher icone</div>
        </div>
    );
}