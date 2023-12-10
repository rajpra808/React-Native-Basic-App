import {Navio} from 'rn-navio';

import {Main} from '@app/screens/main';
import {Settings} from '@app/screens/settings';
import {Article} from '@app/screens/article';

import {useAppearance} from '@app/utils/hooks';
import {
  screenDefaultOptions,
  tabScreenDefaultOptions,
  getTabBarIcon,
} from '@app/utils/designSystem';
import {services} from '@app/services';
import {Saved} from './screens/saved';

// NAVIO
export const navio = Navio.build({
  screens: {
    Main,
    Settings,
    Article,
    Saved,

    // for .pushStack example
    ArticlePage: {
      component: Article,
      options: {
        headerShown: true,
      },
    },
  },
  stacks: {
    MainStack: ['Main', 'Article'],

    SavedStack: {
      screens: ['Saved', 'Article'],
    },

    // for .pushStack example
    ArticlePageStack: {
      screens: ['ArticlePage'],
      containerOptions: {
        headerShown: false,
        // title: 'Article Page',
      },
    },
  },
  tabs: {
    // main 3 tabs
    AppTabs: {
      content: {
        MainTab: {
          stack: 'MainStack',
          options: () => ({
            title: 'Home',
            tabBarIcon: getTabBarIcon('Home'),
          }),
        },
        PlaygroundTab: {
          stack: 'SavedStack',
          options: () => ({
            title: 'Saved',
            tabBarIcon: getTabBarIcon('bookmarked'),
          }),
        },
        SettingsTab: {
          stack: ['Settings'],
          options: () => ({
            title: services.t.do('settings.title'),
            tabBarIcon: getTabBarIcon('SettingsTab'),
          }),
        },
      },
    },
  },
  root: 'AppTabs',
  hooks: [useAppearance],
  defaultOptions: {
    stacks: {
      screen: screenDefaultOptions,
    },
    tabs: {
      screen: tabScreenDefaultOptions,
    },
  },
});

export const getNavio = () => navio;
export const NavioApp = navio.App;
