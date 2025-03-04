import { Module, customModule } from '@ijstech/components';
import ScomPageBlog from '@scom/page-blog';

@customModule
export default class Main extends Module {
  private blogEl: ScomPageBlog

  init() {
    super.init();
    const config = this.blogEl.getConfigurators()[0];
    if (config?.setTag) {
      config.setTag({
        titleFontSize: '1rem',
        light: {
          titleColor: 'red',
          descriptionColor: 'blue',
          linkColor: 'green',
          dateColor: 'yellow',
          userNameColor: 'purple',
          backgroundColor: 'black'
        },
        dark: {
          titleColor: 'red',
          descriptionColor: 'blue',
          linkColor: 'green',
          dateColor: 'yellow',
          userNameColor: 'purple',
          backgroundColor: 'black'
        }
      })
    }
  }

  render() {
    return <i-panel>
      <i-page-blog
        id="blogEl"
        display='block'
        width={300}
        data={{
          "title": "IJS Makes Strategic Investment into Impossible Finance Leveraging OpenSwap’s Booster Queue Technology",
          "backgroundImageUrl": "//cdn.ijsweb.com/assets/8421b8b3-2d0d-4c79-8126-e8c80d254dda/IF_OS_TF.png",
          "avatar": "//cdn.ijsweb.com/assets/8421b8b3-2d0d-4c79-8126-e8c80d254dda/IF_OS_TF.png",
          "userName": "IJS",
          "date": "2022-02-11",
          "link": "https://www.ijs.network/defi2+-protocol/liquidity-queue-framework"
      }}
      ></i-page-blog>
    </i-panel>
  }
}