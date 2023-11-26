import React from 'react';
import {Text} from 'react-native-ui-lib';
import {useServices} from '../../services';
import {BButton} from '../button';
import {Section} from '../section';
import {randomNum} from '../../utils/help';
import {Row} from '../row';

type Props = {};

export const BlogSection: React.FC<Props> = ({}) => {
  const {t, navio} = useServices();

  // Methods
  const stacksPushWithParams = () =>
    navio.N.navigate('ProductPageStack', {
      screen: 'ProductPage',
      params: {articleId: '791utKaPbZoCNrerX72x1C'},
    }); // in order to pass params to a stack you will need to use react-navigation instance `navio.N` and using `.navigate()` as you would do using react-navigation.
  
  return (
    <Section title={t.do('section.navio.title')}>
      <BButton
        flex
        marginV-s1
        marginR-s1
        size="small"
        label={t.do('section.navio.button.stacks.push_with_params')}
        onPress={stacksPushWithParams}
      />
    </Section>
  );
};



{/* <Section title="Section One">
<View>
  <Text> Hello World </Text>
</View>
</Section> */}