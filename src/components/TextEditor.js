import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import styled from "styled-components";

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
  color: black;
  padding: 5px 5px;
  font-size: 16px;
  font-weight: 500;
  font-family: "Montserrat Alternates", sans-serif;
  margin-bottom: 10px;
  .ck-editor__editable {
    min-height: 200px;
  }
`;
