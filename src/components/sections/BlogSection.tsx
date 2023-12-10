import React, { useEffect, useState } from 'react';
import {View} from 'react-native-ui-lib';
import {Section} from '../section';
import {ArticleCard} from '../card';
import { useStores } from '@app/stores';
import { runInAction } from 'mobx';

type Props = {};

const renderArticles = (articles: any) => (
  articles.map((article: any) => (
    <ArticleCard
      key={article.id}
      id={article.id}
      title={article.title}
      description={article.description}
      index = {article.index}
      image = {article.image}
    />
  ))
);

const renderSections = (data:any) => (
  data.map((section:any) => (
    <Section key={section.id} title={section.title}>
      {renderArticles(section.articles)}
    </Section>
  ))
);


export const BlogSection: React.FC<Props> = ({}) => {
  const [data, setData]  = useState<any[]>([])
  const {content} = useStores();

  useEffect(() => {
    const sections = content.value["sections"]
    if(sections) {
      const sectionsArray = Object.values(sections) as any[];
      // Sort the array based on the 'index' property
      sectionsArray.sort((a, b) => a.index - b.index);

      runInAction(() => {
        // Sort articles within each section
        sectionsArray.forEach(section=> {
          if (section.articles) {
            section.articles.sort((a: { index: number; }, b: { index: number; }) => a.index - b.index);
          }
        });
        
        setData(sectionsArray)
      });
    }
  }, [content]);
  return (
    <View>
      {renderSections(data)}
    </View>
  );
};