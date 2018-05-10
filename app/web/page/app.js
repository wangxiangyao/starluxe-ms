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
  Pagination,
  Tag,
  Radio,
  RadioGroup,
  RadioButton,
  Select,
  Option,
  OptionGroup,
  DatePicker
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
App.component(Tag.name, Tag);
App.component(Input.name, Input);
App.component(Radio.name, Radio);
App.component(RadioGroup.name, RadioGroup);
App.component(RadioButton.name, RadioButton);
App.component(Select.name, Select);
App.component(Option.name, Option);
App.component(OptionGroup.name, OptionGroup);
App.component(DatePicker.name, DatePicker);

console.log('这是app', app);

App.component(Layout.name, Layout);

sync(store, router);

export default App.init({
  base: '/app',
  ...app,
  router,
  store
});
