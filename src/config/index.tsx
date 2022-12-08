import {
  Module,
  customModule,
  customElements,
  ControlElement,
  Input,
  Datepicker,
  Upload,
  moment
} from '@ijstech/components';
import { textareaStyle, uploadStyle } from './config.css';
import { IConfig } from '@blog/global';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      ['pageblock-blog-config']: ControlElement;
    }
  }
}

@customModule
@customElements("pageblock-blog-config")
export default class Config extends Module {
  private edtTitle: Input;
  private edtDesc: Input;
  private edtViewAllUrl: Input;
  private edtDate: Datepicker;
  private edtUsername: Input;
  private edtBackground: string;
  private edtAvatar: string;
  private edtBackgroundElm: Upload;
  private edtAvatarElm: Upload;
  private edtOverlay: Input;

  get data() {
    const _data: IConfig = {
      title: this.edtTitle.value || "",
      description: this.edtDesc.value || "",
      viewAllUrl: this.edtViewAllUrl.value || "",
      date: this.edtDate.value|| moment(),
      userName: this.edtUsername.value || '',
      background: this.edtBackground || '',
      avatar: this.edtAvatar || '',
      overlay: this.edtOverlay.value || ''
    };
    return _data
  }

  set data(config: IConfig) {
    this.edtTitle.value = config.title || "";
    this.edtDesc.value = config.description || "";
    this.edtViewAllUrl.value = config.viewAllUrl || "";
    this.edtUsername.value = config.userName || "";
    this.edtOverlay.value = config.overlay || "";
    this.edtDate.value = config.date || moment();
    if (config.background && this.edtBackgroundElm) {
      this.edtBackgroundElm.preview(config.background)
    }
    if (config.avatar && this.edtAvatarElm) {
      this.edtAvatarElm.preview(config.avatar)
    }
  }

  async onChangedImage(source: Upload, files: File[], prop: 'edtBackground' | 'edtAvatar') {
    const file = files[0];
    this[prop] = await source.toBase64(file) as string || '';
  }

  onRemovedImage(prop: 'edtBackground' | 'edtAvatar') {
    this[prop] = '';
  }

  init() {
    super.init();
    this.edtDate.value = moment();
  }

  render() {
    return (
      <i-vstack id="pnlConfig" gap='0.5rem' padding={{ top: '1rem', bottom: '1rem', left: '1rem', right: '1rem' }}>
        <i-label caption="Background:"></i-label>
        <i-upload
          id="edtBackgroundElm"
          maxHeight={200}
          maxWidth={200}
          class={uploadStyle}
          onChanged={(source: Upload, files: File[]) => this.onChangedImage(source, files, 'edtBackground')}
          onRemoved={() => this.onRemovedImage('edtBackground')}
        ></i-upload>
        <i-label caption="Title:"></i-label>
        <i-input id="edtTitle" width="100%"></i-input>
        <i-label caption="Description:"></i-label>
        <i-input
          id="edtDesc"
          class={textareaStyle}
          width="100%"
          height="auto"
          resize="auto-grow"
          inputType='textarea'
        ></i-input>
        <i-label caption="Link:"></i-label>
        <i-input id="edtViewAllUrl" width="100%"></i-input>
        <i-label caption="Avatar:"></i-label>
        <i-upload
          id="edtAvatar"
          maxHeight={200}
          maxWidth={200}
          class={uploadStyle}
          onChanged={(source: Upload, files: File[]) => this.onChangedImage(source, files, 'edtAvatar')}
          onRemoved={() => this.onRemovedImage('edtAvatar')}
        ></i-upload>
        <i-label caption="Text overlay:"></i-label>
        <i-input id="edtOverlay" width="100%"></i-input>
        <i-label caption="Date:"></i-label>
        <i-datepicker id="edtDate" width="100%"></i-datepicker>
        <i-label caption="User name:"></i-label>
        <i-input id="edtUsername" width="100%"></i-input>
      </i-vstack>
    )
  }
}