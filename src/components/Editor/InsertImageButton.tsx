import { useMutation, gql } from "@apollo/client";
import { FC, useState } from "react";
import { useSlateStatic } from "slate-react";
import { isImageUrl } from "./Editor";
const SEND_FILE = gql`
  mutation uploadImage($file: Upload!) {
    uploadImage(file: $file) {
      url
    }
  }
`;
const InsertImageButton: FC<{ insertImage: Function }> = ({ insertImage }) => {
  const [attachment, setAttachment] = useState();
  const editor = useSlateStatic();
  const [upload] = useMutation(SEND_FILE, {
    onCompleted: (data) => {
      const url = data.uploadImage.url;
      if (url && !isImageUrl(url)) {
        alert("URL is not an image");
        return;
      } else if (url) insertImage(editor, url);
    },
    onError: (e) => {
      console.log("에러 뜸 ", e);
    },
  });
  return (
    <form
      onSubmit={(e: any) => {
        e.preventDefault();
        upload({
          variables: {
            file: attachment,
          },
        });
      }}
    >
      <label htmlFor="fileInput">ADD IMAGE</label>
      <input
        type="file"
        onChange={(e: any) => setAttachment(e.target.files[0])}
      ></input>
      <button type="submit">제출</button>
    </form>
  );
};

export default InsertImageButton;
