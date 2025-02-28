import { Module, customModule } from '@ijstech/components';
import Blog from '@scom/scom-blog';

@customModule
export default class Main extends Module {
  set maxWidth(value: number | string) {
      this.style.maxWidth = "";
  }
  render() {
    return <i-panel>
      <i-scom-blog
        display='block'
        width={300}
        data={{
          "title": "IJS Makes Strategic Investment into Impossible Finance Leveraging OpenSwap’s Booster Queue Technology",
          "backgroundImageUrl": "//cdn.ijsweb.com/assets/8421b8b3-2d0d-4c79-8126-e8c80d254dda/IF_OS_TF.png",
          "avatar": "//cdn.ijsweb.com/assets/8421b8b3-2d0d-4c79-8126-e8c80d254dda/IF_OS_TF.png",
          "userName": "IJS",
          "date": "2022-02-11",
          "linkUrl": "https://www.ijs.network/defi2+-protocol/liquidity-queue-framework"
      }}
      ></i-scom-blog>
    </i-panel>
  }
}