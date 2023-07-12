import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import pokemonService from '../../services/pokemonService';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const Description = ({specieUrl, textStyle = {}}) => {
  const [description, setDescription] = useState(0);

  useEffect(() => {
    pokemonService.getDescription(specieUrl).then(data => {
      // remove new line characters from description
      const flavor = data.flavor_text_entries.find(
        (i: {language: {name: string}}) => i.language.name === 'en',
      );
      const regex = new RegExp('\\n', 'g');
      const fixedDescription = flavor.flavor_text.replace(regex, ' ');
      setDescription(fixedDescription);
      return () => {
        setDescription('');
      };
    });
  }, []);

  return description ? (
    <View>
      <Text style={textStyle}>{description}</Text>
    </View>
  ) : (
    <SkeletonPlaceholder borderRadius={4}>
      <View style={{width: '100%', height: 20, marginTop: 5}} />
      <View style={{width: '100%', height: 20, marginTop: 5}} />
      <View style={{width: '80%', height: 20, marginTop: 5}} />
    </SkeletonPlaceholder>
  );
};

export default Description;
