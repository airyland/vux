import { App } from 'vue';
import Button from '../button/index';
import Icon from '../icon/index';
import Loading from '../loading/index';

  function install(app: App) {
    const packages = [Button,Icon,Loading];
    packages.forEach((item: any) => {
      app.component(item.name, item);
    });
  }
  export { Button,Icon,Loading  };
  export default install;