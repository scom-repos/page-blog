import { IUISchema, IDataSchema } from "@ijstech/components";

const propertiesSchema: IDataSchema = {
  type: 'object',
  properties: {
    title: {
      type: 'string'
    },
    titleFontColor: {
      type: 'string',
      format: 'color',
    },
    description: {
      type: 'string'
    },
    descriptionFontColor: {
      type: 'string',
      format: 'color',
    },
    linkUrl: {
      type: 'string'
    },
    linkTextColor: {
      type: 'string',
      format: 'color',
    },
    isExternal: {
      type: 'boolean'
    },
    date: {
      type: 'string',
      format: 'date'
    },
    dateColor: {
      type: 'string',
      format: 'color',
    },
    backgroundImageCid: {
      title: 'Background Image',
      type: 'string',
      format: 'data-cid'
    },
    backgroundImageUrl: {
      title: 'Url',
      type: 'string'
    },
    userName: {
      type: 'string'
    },
    userNameColor: {
      type: 'string',
      format: 'color',
    },
    avatar: {
      type: 'string'
    },
    backgroundColor: {
      type: 'string',
      format: 'color',
    }
  }
};

const propertiesUISchema: IUISchema = {
  type: "VerticalLayout",
  elements: [
    {
      type: "HorizontalLayout",
      elements: [
        {
          type: "Categorization",
          elements: [
            {
              type: "Category",
              label: "General settings",
              elements: [
                {
                  type: "VerticalLayout",
                  elements: [
                    {
                      type: "HorizontalLayout",
                      elements: [
                        {
                          type: "Control",
                          scope: "#/properties/title",
                        },
                      ],
                    },
                    {
                      type: "HorizontalLayout",
                      elements: [
                        {
                          type: "Control",
                          scope: "#/properties/description",
                        },
                      ],
                    },
                    {
                      type: "HorizontalLayout",
                      elements: [
                        {
                          type: "Control",
                          scope: "#/properties/linkUrl",
                        },
                      ],
                    },
                    {
                      type: "HorizontalLayout",
                      elements: [
                        {
                          type: "Control",
                          scope: "#/properties/isExternal",
                        },
                      ],
                    },
                    {
                      type: "HorizontalLayout",
                      elements: [
                        {
                          type: "Control",
                          scope: "#/properties/date",
                        },
                      ],
                    },
                    {
                      type: "HorizontalLayout",
                      elements: [
                        {
                          type: "Control",
                          scope: "#/properties/backgroundImageCid",
                        },
                      ],
                    },
                    {
                      type: "HorizontalLayout",
                      elements: [
                        {
                          type: "Control",
                          scope: "#/properties/backgroundImageUrl",
                        },
                      ],
                    },
                    {
                      type: "HorizontalLayout",
                      elements: [
                        {
                          type: "Control",
                          scope: "#/properties/userName",
                        },
                      ],
                    },
                    {
                      type: "HorizontalLayout",
                      elements: [
                        {
                          type: "Control",
                          scope: "#/properties/avatar",
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              type: "Category",
              label: "Theme settings",
              elements: [
                {
                  type: "VerticalLayout",
                  elements: [
                    {
                      type: "HorizontalLayout",
                      elements: [
                        {
                          type: "Control",
                          scope: "#/properties/titleFontColor",
                        },
                        {
                          type: "Control",
                          scope: "#/properties/descriptionFontColor",
                        },
                        {
                          type: "Control",
                          scope: "#/properties/linkTextColor",
                        },
                      ],
                    },
                    {
                      type: "HorizontalLayout",
                      elements: [
                        {
                          type: "Control",
                          scope: "#/properties/dateColor",
                        },
                        {
                          type: "Control",
                          scope: "#/properties/userNameColor",
                        },
                        {
                          type: "Control",
                          scope: "#/properties/backgroundColor",
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

export {
  propertiesSchema,
  propertiesUISchema
}