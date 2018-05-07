import { sync } from 'vuex-router-sync';
import store from 'store/app';
import router from './router';
import app from './app.vue';
import App from 'app';
import Layout from 'component/layout/app';
import {
  Button,
  Input,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Table,
  TableColumn,
  Form,
  FormItem,
  Pagination
} from 'element-ui';
import Vue from 'vue';

App.component(Button.name, Button);
App.component(Input.name, Input);
App.component(Menu.name, Menu);
App.component(Submenu.name, Submenu);
App.component(MenuItem.name, MenuItem);
App.component(MenuItemGroup.name, MenuItemGroup);
App.component(Table.name, Table);
App.component(TableColumn.name, TableColumn);
App.component(Form.name, Form);
App.component(FormItem.name, FormItem);
App.component(Pagination.name, Pagination);

console.log('这是app', app);

App.component(Layout.name, Layout);

sync(store, router);

export default App.init({
  base: '/app',
  ...app,
  router,
  store
});
