import {
  Slate,
  Editable,
  withReact,
  ReactEditor,
  RenderElementProps,
  useSlateStatic,
  useSelected,
  useFocused,
} from "slate-react";
import {
  createEditor,
  Descendant,
  Transforms,
  Range,
  Point,
  Element as SlateElement,
  Editor,
} from "slate";
import {
  useState,
  useCallback,
  useMemo,
  FC,
  FormEvent,
  useEffect,
  useLayoutEffect,
} from "react";
import { useSelector, useDispatch } from "react-redux";
import { withHistory } from "slate-history";
import {
  BulletedListElement,
  CustomEditor as CustomEditorType,
  ImageElement as ImageElementType,
} from "./custom-types";
import isUrl from "is-url";
import imageExtensions from "image-extensions";
import React, { LegacyRef, PropsWithChildren } from "react";
import { empty, gql, useMutation } from "@apollo/client";
import InsertImageButton from "./InsertImageButton";
import { RootState } from "../../redux/rootReducer";

interface BaseProps {
  className: string;
  [key: string]: unknown;
}

//type OrNull<T> = T | null;
export const Icon = React.forwardRef(
  (
    { className, ...props }: PropsWithChildren<BaseProps>,
    ref: LegacyRef<HTMLSpanElement>
  ) => (
    <span
      {...props}
      ref={ref}
      style={{
        fontSize: "18px",
        verticalAlign: "text-bottom",
      }}
    />
  )
);

export const Button = React.forwardRef(
  (
    {
      className,
      active,
      reversed,
      ...props
    }: PropsWithChildren<
      {
        active: boolean;
        reversed: boolean;
      } & BaseProps
    >,
    ref: LegacyRef<HTMLSpanElement>
  ) => (
    <span
      {...props}
      ref={ref}
      style={{
        cursor: "pointer",
        color: `${
          reversed ? (active ? "white" : "#aaa") : active ? "black" : "#ccc"
        }`,
      }}
    />
  )
);
/**MARKDOWN VIEW */
type IShortCut =
  | "*"
  | "-"
  | "+"
  | ">"
  | "#"
  | "##"
  | "###"
  | "####"
  | "#####"
  | "######";

type VALUES =
  | "list-item"
  | "block-quote"
  | "heading-one"
  | "heading-two"
  | "heading-four"
  | "heading-three"
  | "heading-five"
  | "heading-six";

type objectType = { [key in IShortCut]: VALUES };
const SHORTCUTS: objectType = {
  "*": "list-item",
  "-": "list-item",
  "+": "list-item",
  ">": "block-quote",
  "#": "heading-one",
  "##": "heading-two",
  "###": "heading-three",
  "####": "heading-four",
  "#####": "heading-five",
  "######": "heading-six",
};

const Element = ({ attributes, children, element }: RenderElementProps) => {
  switch (element.type) {
    case "block-quote":
      return <blockquote {...attributes}>{children}</blockquote>;
    case "bulleted-list":
      return <ul {...attributes}>{children}</ul>;
    case "heading-one":
      return <h1 {...attributes}>{children}</h1>;
    case "heading-two":
      return <h2 {...attributes}>{children}</h2>;
    case "heading-three":
      return <h3 {...attributes}>{children}</h3>;
    case "heading-four":
      return <h4 {...attributes}>{children}</h4>;
    case "heading-five":
      return <h5 {...attributes}>{children}</h5>;
    case "heading-six":
      return <h6 {...attributes}>{children}</h6>;
    case "list-item":
      return <li {...attributes}>{children}</li>;
    // case "image":
    //   return <Image attributes={attributes} children={children} />;
    default:
      return <p {...attributes}>{children}</p>;
  }
};

const withShortcuts = (editor: CustomEditorType) => {
  const { deleteBackward, insertText } = editor;
  editor.insertText = (text) => {
    const { selection } = editor;

    if (text === " " && selection && Range.isCollapsed(selection)) {
      const { anchor } = selection;
      const block = Editor.above(editor, {
        match: (n) => Editor.isBlock(editor, n),
      });
      const path = block ? block[1] : [];
      const start = Editor.start(editor, path);
      const range = { anchor, focus: start };
      const beforeText = Editor.string(editor, range);
      const type = SHORTCUTS[beforeText as IShortCut];

      if (type) {
        Transforms.select(editor, range);
        Transforms.delete(editor);
        const newProperties: Partial<SlateElement> = {
          type: type,
        };
        Transforms.setNodes<SlateElement>(editor, newProperties, {
          match: (n) => Editor.isBlock(editor, n),
        });

        if (type === "list-item") {
          const list: BulletedListElement = {
            type: "bulleted-list",
            children: [],
          };
          Transforms.wrapNodes(editor, list, {
            match: (n) =>
              !Editor.isEditor(n) &&
              SlateElement.isElement(n) &&
              n.type === "list-item",
          });
        }

        return;
      }
    }

    insertText(text);
  };

  editor.deleteBackward = (...args) => {
    const { selection } = editor;

    if (selection && Range.isCollapsed(selection)) {
      const match = Editor.above(editor, {
        match: (n) => Editor.isBlock(editor, n),
      });

      if (match) {
        const [block, path] = match;
        const start = Editor.start(editor, path);

        if (
          !Editor.isEditor(block) &&
          SlateElement.isElement(block) &&
          block.type !== "paragraph" &&
          Point.equals(selection.anchor, start)
        ) {
          const newProperties: Partial<SlateElement> = {
            type: "paragraph",
          };
          Transforms.setNodes(editor, newProperties);

          if (block.type === "list-item") {
            Transforms.unwrapNodes(editor, {
              match: (n) =>
                !Editor.isEditor(n) &&
                SlateElement.isElement(n) &&
                n.type === "bulleted-list",
              split: true,
            });
          }

          return;
        }
      }

      deleteBackward(...args);
    }
  };

  return editor;
};

/**Treat Image */
const withImages = (editor: CustomEditorType) => {
  const { insertData, isVoid } = editor;

  editor.isVoid = (element) => {
    return element.type === "image" ? true : isVoid(element);
  };

  editor.insertData = (data) => {
    const text = data.getData("text/plain");
    const { files } = data;

    if (files && files.length > 0) {
      for (const file of files) {
        const reader = new FileReader();
        const [mime] = file.type.split("/");

        if (mime === "image") {
          reader.addEventListener("load", () => {
            const url = reader.result;
            if (typeof url === "string") insertImage(editor, url);
          });

          reader.readAsDataURL(file);
        }
      }
    } else if (isImageUrl(text)) {
      insertImage(editor, text);
    } else {
      insertData(data);
    }
  };

  return editor;
};

const insertImage = (editor: CustomEditorType, url: string) => {
  const text = { text: "" };
  const image: ImageElementType = { type: "image", url, children: [text] };
  Transforms.insertNodes(editor, image);
};

const Image = ({
  attributes,
  children,
  element: imageElement,
}: RenderElementProps) => {
  const editor = useSlateStatic();
  const element = imageElement as ImageElementType;

  const path = ReactEditor.findPath(editor, element);

  const selected = useSelected();
  const focused = useFocused();
  return (
    <div {...attributes}>
      {children}
      <div contentEditable={false} style={{ display: "relative" }}>
        <img
          src={element.url}
          style={{
            display: "block",
            maxWidth: "100%",
            maxHeight: "20em",
            boxShadow: `${selected && focused ? "0 0 0 3px #B4D5FF" : "none"}`,
          }}
          alt="잘못된 이미지입니다."
        />
        <Button
          onClick={() => {
            Transforms.removeNodes(editor, { at: path });
          }}
          style={{
            display: `${selected && focused ? "inline" : "none"}`,
            position: "absolute",
            top: "0.5em",
            left: "0.5em",
            backgroundColor: "white",
            cursor: "pointer",
          }}
        >
          <Icon>delete</Icon>
        </Button>
      </div>
    </div>
  );
};

export const isImageUrl = (url: string) => {
  if (!url) return false;
  if (!isUrl(url)) return false;
  const ext = new URL(url).pathname.split(".").pop();
  if (ext) return imageExtensions.includes(ext);
  return false;
};

const ImageElement = (props: RenderElementProps) => {
  const { attributes, children, element } = props;
  switch (element.type) {
    case "image":
      return <Image {...props} />;
    default:
      return <p {...attributes}>{children}</p>;
  }
};
/*Editor */

const CustomEditor: FC<{ pageId: number }> = ({ pageId }) => {
  const pageInfo = useSelector<RootState, { [name: number]: string[] }>(
    (state) => state.pageInfo
  );
  // const initialValue: Descendant[] = [
  //   { type: "paragraph", children: [{ text: "" }] },
  // ];

  const initialValue = (): Descendant[] => {
    if (pageInfo[+pageId].length > 0) {
      const newData: Descendant[] = [];
      pageInfo[pageId].forEach((info) => {
        newData.push(JSON.parse(info));
      });
      console.log("newData", newData, typeof newData);
      return newData;
    }
    return [{ type: "paragraph", children: [{ text: "" }] }];
  };

  const [value, setValue] = useState<Descendant[]>(initialValue);

  useEffect(() => {
    console.log("실행됨 포항항");
    if (pageInfo[+pageId].length > 0) {
      const newData: Descendant[] = [];
      pageInfo[pageId].forEach((info) => {
        newData.push(JSON.parse(info));
      });
      editor.children = newData;
      setValue(newData);
    }
  }, [pageId]);

  function resetEditor() {
    const emptyValue: Descendant[] = [
      ...value,
      { type: "paragraph", children: [{ text: "secondLine" }] },
    ];
    editor.children = emptyValue;
    setValue(emptyValue);
  }
  const renderElement = useCallback(
    (props) => {
      if (props.element.type === "image") return <ImageElement {...props} />;
      return <Element {...props} />;
    },
    [pageId]
  );

  // const editor = useMemo(
  //   () => withImages(withShortcuts(withReact(withHistory(createEditor())))),
  //   [pageId]
  // );
  const [editor] = useState(
    withImages(withShortcuts(withReact(withHistory(createEditor()))))
  );

  return (
    <Slate
      editor={editor}
      value={value}
      onChange={(newValue) => {
        setValue(newValue);
      }}
    >
      <button onClick={resetEditor}>Clear Text</button>

      <InsertImageButton insertImage={insertImage} />
      <Editable
        renderElement={(e) => {
          return renderElement(e);
        }}
        placeholder="Write some markdown..."
      />
    </Slate>
  );
};

export default CustomEditor;
