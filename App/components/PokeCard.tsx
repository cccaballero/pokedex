import React, {memo, useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';

interface PokeCardParams {
  id: number;
  name?: string;
  number?: number | null;
  apiEndpoint?: string;
  onPokemonTap?: any;
}

// PokeCard implemented as a PureComponent for list rendering optimization
const PokeCard = memo(function PokeCard({
  id,
  name = '',
  number = null,
  apiEndpoint = '',
  onPokemonTap = null,
}: PokeCardParams) {
  // need to store component width because react native can't handle dimensions form URL loaded images properly
  const [viewWidth, setViewWidth] = useState(0);

  return (
    <View style={styles.container}>
      <TouchableHighlight
        disabled={!(onPokemonTap && apiEndpoint)}
        onPress={() => {
          onPokemonTap(name, number, apiEndpoint);
        }}
        underlayColor="white">
        <View
          onLayout={event => {
            setViewWidth(event.nativeEvent.layout.width);
          }}>
          <Image
            style={{width: viewWidth, height: viewWidth}}
            source={{
              uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
            }}
          />
          {name && <Text style={styles.title}>{name}</Text>}
          {number && (
            <Text style={styles.subtitle}>
              {number.toString().padStart(3, '0')}
            </Text>
          )}
        </View>
      </TouchableHighlight>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#c4e3d4',
    borderRadius: 25,
  },
  title: {
    marginTop: 10,
    textAlign: 'center',
    marginBottom: 5,
    fontWeight: 'bold',
    color: '#2e3056',
    textTransform: 'capitalize',
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 20,
    color: '#2e3056',
  },
});

export default PokeCard;
