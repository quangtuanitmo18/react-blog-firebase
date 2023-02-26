import { Field } from "components/field";
import { Label } from "components/label";
import React from "react";
import ReactQuill, { Quill } from "react-quill";
import ImageUploader from "quill-image-uploader";
import "react-quill/dist/quill.snow.css";
import { useMemo } from "react";
import { useRef } from "react";
import { useEffect } from "react";
Quill.register("modules/imageUploader", ImageUploader);

const QuillContent = ({ content, setContent }) => {
  const quillRef = useRef();

  useEffect(() => {
    const quill = quillRef.current.querySelector(".quill");
    const quillBounding = quill.getBoundingClientRect();
    window.addEventListener("scroll", () => {
      const windowScrollY = window.scrollY;
      if (windowScrollY >= quillBounding.top) {
        quill.classList.add("sticky");
        if (windowScrollY >= quillBounding.top + quill.scrollHeight - 20) {
          quill.classList.remove("sticky");
        }
      }
    });
  }, []);

  const modules = useMemo(
    () => ({
      toolbar: [
        ["bold", "italic", "underline", "strike"],
        ["blockquote"],
        [{ header: 1 }, { header: 2 }], // custom button values
        [{ list: "ordered" }, { list: "bullet" }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ["link", "image"],
      ],
    }),
    []
  );
  return (
    <div className="grid grid-cols-1 mb-10 gap-x-10">
      <Field>
        <Label>Content</Label>
        <div className="w-full entry-content" ref={quillRef}>
          <ReactQuill
            theme="snow"
            value={content}
            onChange={setContent}
            modules={modules}
          />
        </div>
      </Field>
    </div>
  );
};

export default QuillContent;
