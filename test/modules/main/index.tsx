import { Module, customModule } from '@ijstech/components';
import Blog from '@scom/scom-blog';

@customModule
export default class Main extends Module {
  set maxWidth(value: number | string) {
      this.style.maxWidth = "";
  }
  render() {
    return <i-panel>
      <i-scom-blog data={{
        title: 'Title',
        description: 'Description',
        backgroundImage: 'https://images.unsplash.com/photo-1676715051398-ce7f932dcd5f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1146&q=80',
        date: '01/01/2001',
        userName: 'User',
        avatar: 'https://images.unsplash.com/photo-1678198628337-e0f4abe54593?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=765&q=80'
      }}></i-scom-blog>
    </i-panel>
  }
}