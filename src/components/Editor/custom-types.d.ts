import { Descendant, BaseEditor } from "slate";
import { ReactEditor } from "slate-react";
import { HistoryEditor } from "slate-history";

export type BlockQuoteElement = {
  type: "block-quote";
  align?: string;
  children: Descendant[];
};

export type BulletedListElement = {
  type: "bulleted-list";
  align?: string;
  children: Descendant[];
};

export type CheckListItemElement = {
  type: "check-list-item";
  checked: boolean;
  children: Descendant[];
};

export type EditableVoidElement = {
  type: "editable-void";
  children: EmptyText[];
};

export type HeadingOneElement = {
  type: "heading-one";
  align?: string;
  children: Descendant[];
};

export type HeadingTwoElement = {
  type: "heading-two";
  align?: string;
  children: Descendant[];
};
export type HeadingThreeElement = {
  type: "heading-three";
  align?: string;
  children: Descendant[];
};
export type HeadingFourElement = {
  type: "heading-four";
  align?: string;
  children: Descendant[];
};
export type HeadingFiveElement = {
  type: "heading-five";
  align?: string;
  children: Descendant[];
};
export type HeadingSixElement = {
  type: "heading-six";
  align?: string;
  children: Descendant[];
};

export type CodeElement = {
  type: "code";
  align?: string;
  chlidren: Descendant[];
};

export type ImageElement = {
  type: "image";
  url?: string;
  children: Descendant[];
};
//type 맞출려면 위애랑 똑같이 해야할듯/..?

export type LinkElement = { type: "link"; url: string; children: Descendant[] };

export type ButtonElement = { type: "button"; children: Descendant[] };

export type ListItemElement = { type: "list-item"; children: Descendant[] };

export type MentionElement = {
  type: "mention";
  character: string;
  children: CustomText[];
};

export type ParagraphElement = {
  type: "paragraph";
  align?: string;
  children: Descendant[];
};

export type TableElement = { type: "table"; children: TableRow[] };

export type TableCellElement = { type: "table-cell"; children: CustomText[] };

export type TableRowElement = { type: "table-row"; children: TableCell[] };

export type TitleElement = { type: "title"; children: Descendant[] };

export type VideoElement = {
  type: "video";
  url: string;
  children: EmptyText[];
};

type CustomElement =
  | BlockQuoteElement
  | BulletedListElement
  | CheckListItemElement
  | EditableVoidElement
  | HeadingOneElement
  | HeadingTwoElement
  | HeadingThreeElement
  | HeadingFiveElement
  | HeadingFourElement
  | HeadingSixElement
  | ImageElement
  | LinkElement
  | ButtonElement
  | ListItemElement
  | MentionElement
  | ParagraphElement
  | TableElement
  | TableRowElement
  | TableCellElement
  | TitleElement
  | VideoElement;

export type CustomText = {
  bold?: boolean;
  italic?: boolean;
  code?: boolean;
  text: string;
};

export type EmptyText = {
  text: string;
};

export type CustomEditor = BaseEditor & ReactEditor & HistoryEditor;

//export type CustomElement = { type: "paragraph"; children: CustomText[] };
//export type CustomText = { text: string };

declare module "slate" {
  interface CustomTypes {
    Editor: CustomEditor;
    Element: CustomElement;
    Text: CustomText | EmptyText;
  }
}
