import React, {useCallback, useEffect, useState} from 'react';
import {ScrollView} from 'react-native';
import {Text, View} from 'react-native-ui-lib';
import Constants from 'expo-constants';
import * as Application from 'expo-application';
import {If} from '@kanzitelli/if-component';
import {observer} from 'mobx-react';
import {useNavigation} from '@react-navigation/native';
import {NavioScreen} from 'rn-navio';

import {services, useServices} from '@app/services';
import {useStores} from '@app/stores';
import {Section} from '@app/components/section';
import {BButton, HeaderButton} from '@app/components/button';
import {Reanimated2} from '@app/components/reanimated2';
import {Row} from '@app/components/row';
import {useAppearance} from '@app/utils/hooks';
import {BlogSection} from '@app/components/sections/BlogSection';

export const Main: NavioScreen = observer(({}) => {
  useAppearance();
  const navigation = useNavigation();
  const {content,counter, ui} = useStores();
  const {t, api, navio} = useServices();

  // State (local)
  const [loading, setLoading] = useState(false);

  // API Methods
  const getCounterValue = useCallback(async () => {
    setLoading(true);
    try {
      const {value} = await api.counter.get();

      counter.set('value', value);
    } catch (e) {
      console.log('[ERROR]', e);
    } finally {
      setLoading(false);
    }
  }, [api.counter, counter]);

  const getContentValue = useCallback(async () => {
    setLoading(true);
    try {
      const data = await api.content.get();
      content.set('value', data);
    } catch (e) {
      console.log('[ERROR]', e);
    } finally {
      setLoading(false);
    }
  }, [api.content, content]);

  // Methods
  const handleCounterDec = () => counter.set('value', counter.value - 1);
  const handleCounterInc = () => counter.set('value', counter.value + 1);
  const handleCounterReset = () => counter.set('value', 0);

  // Start
  useEffect(() => {
    configureUI();
    getCounterValue();
    getContentValue();
  }, []);

  // UI Methods
  const configureUI = () => {
    navigation.setOptions({
      headerRight: () => (
        <Row>
          <HeaderButton onPress={handleCounterDec} label="Dec" />
          <HeaderButton onPress={handleCounterInc} label="Inc" />
        </Row>
      ),
    });
  };

  return (
    <View flex bg-bgColor>
      <ScrollView contentInsetAdjustmentBehavior="always">
        <BlogSection/>
        <Section title="MobX">
          <View centerV>
            <Text marginB-s2 text60R textColor>
              App launches: {ui.appLaunches}
            </Text>

            <Text marginB-s2 text60R textColor>
              Counter:{' '}
              <If
                _={loading}
                _then={<Text textColor>Loading...</Text>}
                _else={<Text textColor>{counter.value}</Text>}
              />
            </Text>

            <Row>
              <BButton margin-s1 label=" - " onPress={handleCounterDec} />
              <BButton margin-s1 label=" + " onPress={handleCounterInc} />
              <BButton margin-s1 label="reset" onPress={handleCounterReset} />
            </Row>
          </View>
        </Section>

        <Section title="API">
          <BButton margin-s1 label="Update counter value from API" onPress={getCounterValue} />
        </Section>
      </ScrollView>
    </View>
  );
});
Main.options = () => ({
  title: services.t.do('home.title'),
});
