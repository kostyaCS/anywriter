import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

function MyEditor({ editorData, onEditorChange }) {

    const handleEditorChange = (event, editor) => {
        const data = editor.getData();
        onEditorChange(data);
    };

    return (
        <div>
            <h2>CKEditor 5 Example</h2>
            <CKEditor
                editor={ClassicEditor}
                data={editorData}
                onChange={handleEditorChange}
            />
            <h2>Editor Data:</h2>
            <div dangerouslySetInnerHTML={{ __html: editorData }} />
        </div>
    );
}

export default MyEditor;
