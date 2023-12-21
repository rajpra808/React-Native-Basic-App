import React, {useCallback, useEffect, useState} from 'react';
import {ScrollView} from 'react-native';
import {Colors, LoaderScreen, View} from 'react-native-ui-lib';
import {observer} from 'mobx-react';
import {useNavigation} from '@react-navigation/native';
import {NavioScreen} from 'rn-navio';
import { runInAction } from 'mobx';

import {services, useServices} from '@app/services';
import {useStores} from '@app/stores';
import {HeaderButton} from '@app/components/button';
import {Row} from '@app/components/row';
import {useAppearance} from '@app/utils/hooks';
import {BlogSection} from '@app/components/sections/BlogSection';

export const Main: NavioScreen = observer(({}) => {
  useAppearance();
  const navigation = useNavigation();
  const {content} = useStores();
  const {api} = useServices();

  // State (local)
  const [loading, setLoading] = useState(false);

  const fetchContent = async () =>{
    setLoading(true);
    content.clearStoredData()
    try {
      const data = await api.content.get();
      runInAction(() => {
        content.set('value', data);
      });
    } catch (e) {
      console.log('[ERROR]', e);
    } finally {
      setLoading(false);
    }
  }

  const getContentValue = useCallback(async () => {
    fetchContent()
  }, [api.content, content]);

  const refresh = () => fetchContent();

  // Start
  useEffect(() => {
    configureUI();
    getContentValue();
  }, []);

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

Main.options = () => ({
  title: services.t.do('home.title'),
});
