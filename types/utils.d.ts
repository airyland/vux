export type OptionsListItem =
  | string
  | { value?: string; label?: string; key?: string | number | object; type?: string };

export type OptionListItem<TKey = string | number | object> =
  | string
  | { value?: string; label?: string; key?: TKey; type?: string };

export type FormPreviewFooterButton = {
  style: 'default' | 'primary';
  text: string;
  /**
   * click event handler
   *
   * name -> the 'name' attribute(or prop?) of FormPreview
   */
  onButtonClick?: (name: string) => void;
  link?: string;
};

// declarations for Compnent Msg
/** button model in Msg Component */
export interface MsgButton {
  type: 'default' | 'primary';
  text: string;
  onClick?: () => void;
  link?: string;
}
type MsgIcon = 'success' | 'warn' | 'info' | 'waiting';
export interface MsgPropsModel {
  title: string;
  content: string;
  icon?: MsgIcon;
  buttons?: MsgButton[];
}