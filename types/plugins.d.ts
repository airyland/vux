import { PluginObject } from 'vue';

/** loading plugin */
export const LoadingPlugin: PluginObject<undefined>;

interface LoadingOptions {
  text: string;
  onShow?: () => void;
  onHide?: () => void;
}

interface LoadingPluginImp {
  show(options: string | LoadingOptions): void;
  hide(): void;
  isVisible(): boolean;
}

interface VuxPlugins {
  loading: LoadingPluginImp;
}

/** alert plugin */
export const AlertPlugin: PluginObject<undefined>;

interface AlertOptions {
  title: string;
  content: string;
  onShow?: () => void;
  onHide?: () => void;
  isVisible(): boolean;
}

interface AlertPluginImp {
  show(options: AlertOptions | string): void;
  hide(): void;
}

interface VuxPlugins {
  alert: AlertPluginImp;
}

/** toast plugin */
declare const ToastPlugin: PluginObject<ToastOptions>;

interface VuxPlugins {
  toast: ToastPluginImp;
}
type ToastPosition = 'default' | 'top' | 'middle' | 'bottom';

interface ToastPluginImp {
  show(options: string | ToastOptions): void;
  hide(): void;
  text(text: string, position: ToastPosition): void;
  isVisible(): boolean;
}

interface ToastOptions {
  position?: ToastPosition;
  onShow?: () => void;
  onHide?: () => void;
  text?: string;
  isShowMask?: boolean;
  width?: string;
  type?: 'success' | 'warn' | 'cancel' | 'text';
  time?: number;
}
