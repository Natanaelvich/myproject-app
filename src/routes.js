import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
// Screens
import MainScreen from './pages/Main';
import SearchScreen from './pages/Search/result';
import Pedidos from './pages/Pedidos';
import User from './pages/User';
import Menu from './pages/Menu';
import Buy from './pages/Menu/buy';
import Carrinho from './pages/Carrinho';
// Custom tabbar component
import CustomFooterTabBar from './components/CustomFooterTabBar';
// Tabbar icon sources
import HomeIcon from './assets/home.png';
import SearchIcon from './assets/search-black.png';
import OrdersIcon from './assets/order.png';
import ProfileIcon from './assets/profile.png';
import {createStackNavigator} from 'react-navigation-stack';

const compra = createStackNavigator(
  {
    Menu: {
      screen: Menu,
      navigationOptions: {
        title: 'Menu',
        bottomTabBarVisible: false,
      },
    },
    Buy: {
      screen: Buy,
      navigationOptions: {
        title: 'Buy',
      },
    },
    Carrinho: {
      screen: Carrinho,
      navigationOptions: {
        title: 'Carrinho',
      },
    },
  },
  {
    headerMode: 'none',
  },
);

const stackMenu = createStackNavigator(
  {
    MainScreen: {
      screen: MainScreen,
    },
    Compra: {
      screen: compra,
    },
  },
  {
    headerMode: 'none',
  },
);
//  verify routnavigation and desable tabbottom
stackMenu.navigationOptions = ({navigation}) => {
  let tabBarVisible;
  if (navigation.state.routes.length > 0) {
    navigation.state.routes.map(route => {
      if (route.routeName === 'Compra') {
        tabBarVisible = false;
      } else {
        tabBarVisible = true;
      }
    });
  }
  return {
    tabBarVisible,
  };
};
//  bottomNavigator with icons
const TabRoutes = createBottomTabNavigator(
  {
    Home: {
      screen: stackMenu,
      navigationOptions: {
        tabBarIcon: () => HomeIcon,
        tabBarLabel: 'Início',
      },
    },
    Search: {
      screen: SearchScreen,
      navigationOptions: {
        tabBarIcon: () => SearchIcon,
        tabBarLabel: 'Buscar',
      },
    },
    Orders: {
      screen: Pedidos,
      navigationOptions: {
        tabBarIcon: () => OrdersIcon,
        tabBarLabel: 'Pedidos',
      },
    },
    Profile: {
      screen: User,
      navigationOptions: {
        tabBarIcon: () => ProfileIcon,
        tabBarLabel: 'Perfil',
      },
    },
  },
  {
    defaultNavigationOptions: () => ({
      tabBarComponent: CustomFooterTabBar,
      tabBarOptions: {
        activeTintColor: 'orange',
        inactiveTintColor: '#666',
      },
    }),
  },
);

export default createAppContainer(TabRoutes);
