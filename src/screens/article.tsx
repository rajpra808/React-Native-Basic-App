import React, {useEffect, useMemo, useState} from 'react';
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
import { Row } from '@app/components/row';
import { HeaderButton } from '@app/components/button';

export type Params = {
  type?: 'push' | 'show';
  articleId?: string;
};

interface RenderHtmlProps {
  contentWidth: number; // Adjust the type accordingly
  source: any; // Adjust the type accordingly
  tagsStyles?: Record<string, any>; // Adjust the type accordingly
}


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
    Not FOUND!
  </p>`}});
  const { width } = useWindowDimensions();

  // Start
  useEffect(() => {
    if(params.articleId) {
      let articles = content.value["articles"]; 
      let article = articles[params.articleId]
      setData(article);
      configureUI(article.title, params.articleId);
    }
  }, [params, content, navigation]);

  const refresh = () =>{
    console.log("Hello")
  }
  // UI Methods
  const configureUI = (title: string, id: string) => {
    navigation.setOptions({
      title: title,
      headerRight: () => (
        <Row>
          <HeaderButton onPress={refresh} label="Save" />
        </Row>
      ),
    });
  };
  
  const MemoizedRenderHtml: React.FC<RenderHtmlProps> = React.memo(({ contentWidth, source, tagsStyles }) => (
    <RenderHtml contentWidth={contentWidth} source={source} tagsStyles={tagsStyles} />
  ));

  const memoizedBody = useMemo(() => data['body'], [data['body']]);
  // UI Methods
  const tagsStyles= {a: {color:'#58585A',textDecorationLine:'none', fontSize:16, fontFamily:'Montserrat-Bold',lineHeight: 23},p:{fontFamily:'Montserrat-Regular**',lineHeight: 23,color:'#58585A',fontSize:17,marginBottom:16}}
  return (
    <View flex bg-bgColor>
      <ScrollView contentInsetAdjustmentBehavior="always">
        {/* Product Page example related */}
        {!!params?.articleId ? (
          <View>
            <View centerV margin-s4 marginV-s3 style={styles.container}>
              <MemoizedRenderHtml
                contentWidth={width - 50}
                source={memoizedBody}
                tagsStyles={tagsStyles}
              />

              {/* <RenderHtml
                contentWidth={width-50}
                source={memoizedBody}
                tagsStyles={tagsStyles}
              /> */}
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
