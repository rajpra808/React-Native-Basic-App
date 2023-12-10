import React, {PropsWithChildren, useState} from 'react';
import {StyleSheet} from 'react-native';
import {ExpandableSection, Image, Text, View} from 'react-native-ui-lib';
const chevronDown = require('../../assets/chevronDown.png');
const chevronUp = require('../../assets/chevronUp.png');

const styles = StyleSheet.create({
  icon: {
    alignSelf: 'center',
  },
});

export const Section: React.FC<
  PropsWithChildren<{
    title: string;
  }>
> = ({children, title}) => {
  const [expended, setExpended] = useState(false);

  const onExpand = () => {
    setExpended(!expended);
  };

  const getChevron = () => {
    if (expended) {
      return chevronDown;
    }
    return chevronUp;
  };
  const getHeaderElement = (title: string) => {
    return (
      <View margin-10 spread row style={{marginBottom: 15, height: 50}}>
        <Text grey10 text60>
          {title}
        </Text>
        <Image style={styles.icon} source={getChevron()} />
      </View>
    );
  };
  return (
    <View 
        marginV-s1 
        paddingH-s1
        bg-$backgroundElevated
      >
      <ExpandableSection
        top={false}
        expanded={expended}
        sectionHeader={getHeaderElement(title)}
        onPress={() => onExpand()}
      >
        <View padding-s2>{children}</View>
      </ExpandableSection>
    </View>
  );
};
