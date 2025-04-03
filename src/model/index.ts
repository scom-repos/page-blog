import { IBlogItem, IBlogSettings } from '../interface';

interface IOptions {
  onUpdateBlock?: () => void;
  onUpdateTheme?: () => void;
}

export class Model {
  private _data: IBlogItem = {
    title: '',
    backgroundImageUrl: '',
    backgroundImageCid: ''
  };
  private _tag: IBlogSettings = {
    light: {},
    dark: {}
  };
  private _options: IOptions;

  constructor(options: IOptions) {
    this._options = options;
  }

  get tag() {
    return this._tag;
  }

  set tag(value: IBlogSettings) {
    this._tag = value;
  }

  get data() {
    return this._data;
  }

  set data(value: IBlogItem) {
    this._data = value;
  }

  async setData(data: IBlogItem) {
    this._data = data;
    this._options?.onUpdateBlock();
  }

  private getData() {
    return this._data;
  }

  setTag(value: IBlogSettings) {
    const newValue = value || {};
    for (let prop in newValue) {
      if (newValue.hasOwnProperty(prop)) {
        if (prop === 'light' || prop === 'dark') this.updateTag(prop, newValue[prop]);
        else this._tag[prop] = newValue[prop];
      }
    }
    this._options?.onUpdateTheme();
    this._options?.onUpdateBlock();
  }

  private updateTag(type: 'light' | 'dark', value: any) {
    this._tag[type] = this._tag[type] || {};
    for (let prop in value) {
      if (value.hasOwnProperty(prop)) this._tag[type][prop] = value[prop];
    }
  }

  private getTag() {
    return this._tag;
  }

  getConfigurators() {
    return [
      {
        name: 'Builder Configurator',
        target: 'Builders',
        getData: this.getData.bind(this),
        setData: async (data: IBlogItem) => {
          await this.setData({ ...data })
        },
        getTag: this.getTag.bind(this),
        setTag: this.setTag.bind(this)
      },
      {
        name: 'Emdedder Configurator',
        target: 'Embedders',
        getData: this.getData.bind(this),
        setData: this.setData.bind(this),
        getTag: this.getTag.bind(this),
        setTag: this.setTag.bind(this)
      }
    ]
  }
}