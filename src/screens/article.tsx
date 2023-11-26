import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {Text, View} from 'react-native-ui-lib';
import {observer} from 'mobx-react';
import {useNavigation, useRoute} from '@react-navigation/native';
import { useWindowDimensions } from 'react-native';
import RenderHtml from 'react-native-render-html';

import {NavioScreen} from 'rn-navio';

import {services, useServices} from '@app/services';
import {useAppearance} from '@app/utils/hooks';
import { useStores } from '@app/stores';

export type Params = {
  type?: 'push' | 'show';
  articleId?: string;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 20,
    margin: 10,
  },
});

export const Article: NavioScreen = observer(() => {
  useAppearance(); // for Dark Mode
  const navigation = useNavigation();
  const {params: _p} = useRoute(); // this is how to get passed params with navio.push('Screen', params)
  const params = _p as Params; // use as params?.type
  const {t, navio} = useServices();
  const {content} = useStores();
  const [data, setData] = useState({title: 'Not Updated Yet', body: {html: `
  <p style='text-align:center;'>
    Hello World!
  </p>`}});
  const [body, setBody] = useState()
  const { width } = useWindowDimensions();

  
  // const {ui} = useStores();

  // State

  // Methods

  // Start
  useEffect(() => {
    configureUI();
    if(params.articleId) {
      let articles = content.value["articles"];
      console.log(articles);
      
      setData(articles[params.articleId]);
    }
  }, [params, content]);

  // UI Methods
  const configureUI = () => {
    navigation.setOptions({});
  };

  // UI Methods

  return (
    <View flex bg-bgColor>
      <ScrollView contentInsetAdjustmentBehavior="always">
        {/* Product Page example related */}
        {!!params?.articleId ? (
          <View>
            <View margin-s2 marginV-s2 paddingH-s3>
              <Text>ProductId: {data["title"]}</Text>
            </View>
            <View centerV margin-s4 marginV-s3 style={styles.container}>
              <RenderHtml
                contentWidth={width-50}
                source={data['body']}
                tagsStyles={{a: {color:'#58585A',textDecorationLine:'none', fontSize:16, fontFamily:'Montserrat-Bold',lineHeight: 23},p:{fontFamily:'Montserrat-Regular**',lineHeight: 23,color:'#58585A',fontSize:17,marginBottom:16}}} 
              />
            </View>
          </View>
        ) : null}
      </ScrollView>
    </View>
  );
});

Article.options = props => ({
  headerBackTitleStyle: false,
  title: `${services.t.do('article.title')} ${(props?.route?.params as Params)?.type ?? ''}`,
});
