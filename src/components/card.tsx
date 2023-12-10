import React from 'react';
import {Card, Modifiers, View} from 'react-native-ui-lib';
import {useServices} from '../services';

type ArticleProps = Modifiers.MarginModifiers &
  Modifiers.FlexModifiers & {
    id: string;
    title?: string;
    description?: string;
    index?: number;
    image?: any;
  };

const getImageUrl = (image: any) => {
  return `https:${image?.url}`;
};

export const ArticleCard: React.FC<ArticleProps> = ({
  id,
  title,
  description,
  image,
  index,
  ...modifiers
}) => {
  const {t, navio} = useServices();

  const checkOutArticle = (id: string) =>
    navio.N.navigate('ArticlePageStack', {
      screen: 'ArticlePage',
      params: {articleId: id},
    });

  return (
    <View {...modifiers} marginV-s1 paddingH-s1>
      <Card
        row
        height={160}
        style={{marginBottom: 15}}
        borderRadius={10}
        bg-$backgroundElevated
        activeOpacity={1}
        activeScale={0.96}
        onPress={() => checkOutArticle(id)}
      >
        <Card.Image source={{uri: getImageUrl(image)}} style={{width: 115, height: '100%'}} />
        {renderTextSection(title, description, index)}
      </Card>
    </View>
  );
};

function renderTextSection(title?: string, description?: string, index?: number): any {
  return (
    <Card.Section
      content={[
        {text: title, text60: true, $textDefault: true},
        {text: description, text70: true, $textDefault: true},
        {text: index, text50: true, $textDisabled: true},
      ]}
      style={{padding: 20, flex: 1}}
    />
  );
}
