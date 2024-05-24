"use client";

import { Editor } from "@tinymce/tinymce-react";

const Tiptap = () => {
  const handleEditorChange = (e: any) => {
    console.log("Content was updated:", e.target.getContent());
  };
  return (
    <Editor
      apiKey="w6g9sol29h1xe8o3lfx83cnc97lu26vwc7ivxd3n4ekk9tx5"
      init={{
        language: "fr_FR",
        plugins:
          "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate  mentions tinycomments tableofcontents footnotes mergetags autocorrect typography inlinecss markdown",
        toolbar:
          "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
        tinycomments_mode: "embedded",
        tinycomments_author: "Author name",
        mergetags_list: [
          { value: "First.Name", title: "First Name" },
          { value: "Email", title: "Email" },
        ],
      }}
      initialValue="Entrez votre texte ici, vous pouvez mettre en forme votre texte comme vous le souhaitez."
    />
  );
};

export default Tiptap;
