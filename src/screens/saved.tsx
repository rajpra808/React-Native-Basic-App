import React, {useCallback, useEffect, useState} from 'react';
import {ScrollView} from 'react-native';
import {Colors, LoaderScreen, View} from 'react-native-ui-lib';
import {observer} from 'mobx-react';
import {useNavigation} from '@react-navigation/native';
import {NavioScreen} from 'rn-navio';

import {services, useServices} from '@app/services';
import {useStores} from '@app/stores';
import {HeaderButton} from '@app/components/button';
import {Row} from '@app/components/row';
import {useAppearance} from '@app/utils/hooks';
import {BlogSection} from '@app/components/sections/BlogSection';

export const Saved: NavioScreen = observer(({}) => {
  useAppearance();
  const navigation = useNavigation();
  const {content} = useStores();

  // State (local)
  const [loading, setLoading] = useState(false);

  const getSavedArticles = () => {

  }
  
  function refresh(): void {
    console.log("Refreshed")
}

  // Start
  useEffect(() => {
    configureUI();
    getSavedArticles();
  }, [content]);

  // UI Methods
  const configureUI = () => {
    navigation.setOptions({
      headerRight: () => (
        <Row>
          <HeaderButton onPress={refresh} label="Refresh" />
        </Row>
      ),
    });
  };

  return (
    <View flex bg-bgColor>
      {loading ? <LoaderScreen message={'Getting Data from Server'} color={Colors.grey40$2}/>: <ScrollView contentInsetAdjustmentBehavior="always">
        <BlogSection />
      </ScrollView>}
    </View>
  );
});

Saved.options = () => ({
  title: services.t.do('home.title'),
});

