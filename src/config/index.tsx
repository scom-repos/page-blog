import {
  Module,
  customModule,
  customElements,
  ControlElement,
  Input,
  Datepicker,
  Upload,
  moment,
  Checkbox
} from '@ijstech/components';
import { textareaStyle, uploadStyle, noWrapStyle } from './config.css';
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
  private edtLink: Input;
  private edtDate: Datepicker;
  private edtUsername: Input;
  private edtBackground: string = '';
  private edtAvatar: string = '';
  private edtBackgroundElm: Upload;
  private edtAvatarElm: Upload;
  private textOverlayCheck: Checkbox;
  private isExternalCheck: Checkbox;

  get data() {
    const _data: IConfig = {
      title: this.edtTitle.value || "",
      description: this.edtDesc.value || "",
      linkUrl: this.edtLink.value || "",
      date: this.edtDate.value|| moment(),
      userName: this.edtUsername.value || '',
      backgroundImage: this.edtBackground || '',
      avatar: this.edtAvatar || '',
      textOverlay: this.textOverlayCheck.checked,
      isExternal: this.isExternalCheck.checked
    };
    return _data
  }

  set data(config: IConfig) {
    this.edtTitle.value = config.title || "";
    this.edtDesc.value = config.description || "";
    this.edtLink.value = config.linkUrl || "";
    this.edtUsername.value = config.userName || "";
    this.edtDate.value = config.date || moment();
    this.textOverlayCheck.checked = config.textOverlay || false;
    this.isExternalCheck.checked = config.isExternal || false;
    if (config.backgroundImage && this.edtBackgroundElm)
      this.edtBackgroundElm.preview(config.backgroundImage)
    if (config.avatar && this.edtAvatarElm)
      this.edtAvatarElm.preview(config.avatar)
  }

  async onChangedImage(source: Upload, files: File[], prop: 'edtBackground' | 'edtAvatar') {
    const file = files[0];
    this[prop] = file ? await source.toBase64(file) as string : '';
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
        <i-hstack>
          <i-label caption="Background Image"></i-label>
          <i-label caption="*" font={{ color: 'red' }} margin={{left: '4px'}}></i-label>
          <i-label caption=":"></i-label>
        </i-hstack>
        <i-upload
          id="edtBackgroundElm"
          maxHeight={200}
          maxWidth={200}
          class={uploadStyle}
          onChanged={(source: Upload, files: File[]) => this.onChangedImage(source, files, 'edtBackground')}
          onRemoved={() => this.onRemovedImage('edtBackground')}
        ></i-upload>
        <i-hstack>
          <i-label caption="Title"></i-label>
          <i-label caption="*" font={{ color: 'red' }} margin={{left: '4px'}}></i-label>
          <i-label caption=":"></i-label>
        </i-hstack>
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
        <i-label caption="Link URL:"></i-label>
        <i-input id="edtLink" width="100%"></i-input>
        <i-checkbox id="isExternalCheck" caption='External Link' checked={false}></i-checkbox>
        <i-checkbox id="textOverlayCheck" caption='Text Overlay' checked={false}></i-checkbox>
        <i-label caption="Avatar:"></i-label>
        <i-upload
          id="edtAvatarElm"
          maxHeight={200}
          maxWidth={200}
          class={uploadStyle}
          onChanged={(source: Upload, files: File[]) => this.onChangedImage(source, files, 'edtAvatar')}
          onRemoved={() => this.onRemovedImage('edtAvatar')}
        ></i-upload>
        <i-label caption="Date:"></i-label>
        <i-datepicker id="edtDate" width="100%"></i-datepicker>
        <i-label caption="User name:"></i-label>
        <i-input id="edtUsername" width="100%"></i-input>
      </i-vstack>
    )
  }
}
