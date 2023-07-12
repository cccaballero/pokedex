import React, {useEffect} from 'react';
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons/faArrowLeft';
import {useDispatch, useSelector} from 'react-redux';
import {getPokemon, reset} from './pokemonSlice';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import PokeCard from '../../components/PokeCard';
import {RootState} from '../../redux/store';
import Description from '../../components/description/Description';

const Pokemon = ({route, navigation}) => {
  const {name, number, apiEndpoint} = route.params;
  const pokemon = useSelector((state: RootState) => state.pokemon);
  const isError = useSelector((state: RootState) => state.pokemon.isError);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPokemon(apiEndpoint));
    return () => {
      dispatch(reset());
    };
  }, [apiEndpoint, dispatch]);

  useEffect(() => {
    // handle error obtaining pokemon data
    if (isError) {
      Alert.alert('Error', 'An error has occurred obtaining Pokemon data.', [
        {
          text: 'OK',
          onPress: () => {
            navigation.goBack();
          },
        },
      ]);
    }
  }, [isError]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerWrapper}>
          <View style={styles.headerBackButton}>
            <TouchableHighlight
              onPress={() => {
                navigation.goBack();
              }}
              underlayColor="white">
              <FontAwesomeIcon icon={faArrowLeft} size={32} />
            </TouchableHighlight>
          </View>
          <View style={styles.headerTitleWrapper}>
            <Text style={styles.headerTitle}>{name}</Text>
            <Text style={styles.headerSubtitle}>
              {number.toString().padStart(3, '0')}
            </Text>
          </View>
        </View>
      </View>
      {pokemon.isLoading ? (
        <SkeletonPlaceholder borderRadius={4}>
          <View style={styles.skeletonCenteredColumn}>
            <View style={styles.skeletonPokeCard} />
            <View style={styles.skeletonCenteredRow}>
              <View style={styles.skeletonMiniature} />
              <View style={styles.skeletonMiniature} />
            </View>
          </View>
          <View style={styles.skeletonData} />
          <View style={styles.skeletonData} />
        </SkeletonPlaceholder>
      ) : (
        <ScrollView>
          <View style={styles.pokeCardWrapper}>
            <PokeCard id={pokemon.id} />
          </View>
          <View style={styles.miniaturesWrapper}>
            <View style={styles.miniature}>
              <Image
                style={styles.miniatureImage}
                source={{
                  uri: pokemon.frontImageUrl,
                }}
              />
            </View>
            <View style={styles.miniature}>
              <Image
                style={styles.miniatureImage}
                source={{
                  uri: pokemon.backImageUrl,
                }}
              />
            </View>
          </View>
          <View>
            <View style={styles.dataRow}>
              <View style={styles.dataLabelWrapper}>
                <Text style={styles.dataLabel}>Height:</Text>
              </View>
              <View>
                <Text style={styles.dataValue}>{pokemon.height}</Text>
              </View>
            </View>
            <View style={styles.dataRow}>
              <View style={styles.dataLabelWrapper}>
                <Text style={styles.dataLabel}>Weight:</Text>
              </View>
              <View>
                <Text style={styles.dataValue}>{pokemon.weight}</Text>
              </View>
            </View>
          </View>
          <View style={styles.descriptionWrapper}>
            <Description
              specieUrl={pokemon.specieUrl}
              textStyle={styles.description}
            />
          </View>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 100,
  },
  headerWrapper: {
    flex: 1,
    flexDirection: 'row',
  },
  headerBackButton: {
    position: 'absolute',
    height: 100,
    justifyContent: 'center',
    paddingLeft: 20,
  },
  headerTitleWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  headerTitle: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2e3056',
    textTransform: 'capitalize',
  },
  headerSubtitle: {
    textAlign: 'center',
    color: '#2e3056',
  },
  skeletonCenteredColumn: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  skeletonPokeCard: {
    width: '100%',
    height: 400,
    borderRadius: 25,
    marginHorizontal: 20,
  },
  skeletonCenteredRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  skeletonMiniature: {
    width: 100,
    height: 100,
    borderRadius: 25,
  },
  skeletonData: {
    width: 300,
    height: 25,
    borderRadius: 5,
    marginTop: 10,
  },
  pokeCardWrapper: {
    marginHorizontal: 20,
  },
  miniaturesWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  miniature: {
    width: 100,
    height: 100,
    margin: 4,
    backgroundColor: '#c4e3d4',
    borderRadius: 25,
  },
  miniatureImage: {
    width: 100,
    height: 100,
  },
  dataRow: {
    flexDirection: 'row',
  },
  dataLabelWrapper: {
    width: 90,
  },
  dataLabel: {
    textAlign: 'right',
    marginBottom: 10,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#5d5e7c',
  },
  dataValueWrapper: {
    flex: 2,
  },
  dataValue: {
    textAlign: 'left',
    marginLeft: 10,
    marginBottom: 10,
    fontSize: 20,
    color: '#5d5e7c',
  },
  descriptionWrapper: {
    marginHorizontal: 20,
  },
  description: {
    fontSize: 20,
    color: '#5d5e7c',
  },
});

export default Pokemon;
