import React, { TextareaHTMLAttributes} from 'react';
import './styles.css';

interface TexteareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label: string;
    name: string;
}


const Textearea: React.FC<TexteareaProps> = ({label, name, ...rest }) => {
    return (
        <div className="textarea-block">
            <label htmlFor={name}>{label}</label>
            <textarea id={name} {...rest} />
        </div>
    );
}

export default Textearea;