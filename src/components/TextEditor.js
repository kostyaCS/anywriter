import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import styled from 'styled-components';

function MyEditor({ editorData, onEditorChange }) {

    const handleEditorChange = (event, editor) => {
        const data = editor.getData();
        onEditorChange(data);
    };

    return (
        <MainEditor>
            <CKEditor
                editor={ClassicEditor}
                data={editorData}
                onChange={handleEditorChange}
            />
        </MainEditor>
    );
}

export default MyEditor;

const MainEditor = styled.div`
    background-color: #ffffff;
    border: 2px solid #000000;
    color: black;
    border-radius: 15px;
    padding: 5px 5px;
    font-size: 16px;
    min-height: 40%;
    font-weight: 500;
    font-family: "Montserrat Alternates", sans-serif;
    box-shadow: 5px 5px 0 0 #81ADC8;
    margin-bottom: 10px;
`;
