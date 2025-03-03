import { IConfig, IPageBlockAction, ISettings } from '../interface';
import { propertiesSchema, propertiesUISchema, themeSchema } from './formSchema';
import { IDataSchema } from '@ijstech/components';

interface IOptions {
  onUpdateBlock?: () => void;
  onUpdateTheme?: () => void;
}

export class Model {
  private _data: IConfig = {
    title: '',
    backgroundImageUrl: '',
    backgroundImageCid: ''
  };
  private _tag: ISettings = {
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

  set tag(value: ISettings) {
    this._tag = value;
  }

  get data() {
    return this._data;
  }

  set data(value: IConfig) {
    this._data = value;
  }

  async setData(data: IConfig) {
    this._data = data;
    this._options?.onUpdateBlock();
  }

  private getData() {
    return this._data;
  }

  setTag(value: ISettings) {
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
        getActions: () => {
          return this._getActions(propertiesSchema, themeSchema);
        },
        getData: this.getData.bind(this),
        setData: async (data: IConfig) => {
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

  private _getActions(propertiesSchema: IDataSchema, themeSchema: IDataSchema) {
    const actions: IPageBlockAction[] = [
      {
        name: 'Edit',
        icon: 'edit',
        command: (builder: any, userInputData: any) => {
          let _oldData: IConfig = {
            title: '',
            backgroundImageUrl: '',
            backgroundImageCid: ''
          };
          let _oldTag = {}
          const [generalSettings, themeSettings] = userInputData;

          return {
            execute: async () => {
              _oldData = { ...this._data };

              if (builder?.setData) builder.setData(generalSettings)
              this.setData(generalSettings);

              if (themeSettings) {
                _oldTag = { ...this._tag };
                if (builder) builder.setTag(themeSettings);
                else this.setTag(themeSettings);
              }
            },
            undo: () => {
              this._data = { ..._oldData };
              if (builder?.setData) builder.setData(_oldData);
              this.setData(_oldData);

              if (themeSettings) {
                this._tag = { ..._oldTag };
                if (builder) builder.setTag(this._tag);
                else this.setTag(this._tag);
              }
            },
            redo: () => { }
          }
        },
        userInputDataSchema: propertiesSchema,
        userInputUISchema: propertiesUISchema
      }
    ];
    return actions;
  }
}