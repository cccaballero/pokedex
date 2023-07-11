import React, {useEffect} from 'react';
import {ActivityIndicator, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {getPokemons} from './homeSlice';
import {useDispatch, useSelector} from 'react-redux';
import PokeCard from '../../components/PokeCard';
import {FlatGrid} from 'react-native-super-grid';
import {getIdFromUrl} from '../../utils/pokemon';
import {RootState} from '../../redux/store';

const Home = ({navigation}: {navigation: any}) => {
  const PAGE_LIMIT = 40;
  const item_list = useSelector((state: RootState) => state.home.pokemonItems.items);
  const isLoading = useSelector((state: RootState) => state.home.isLoading);
  const next = useSelector((state: RootState) => state.home.pokemonItems.next);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPokemons({}));
  }, []);

  const loadItems = () => {
    if (next) {
      dispatch(
        getPokemons({
          next: next,
          limit: PAGE_LIMIT,
        }),
      );
    }
  };

  const onPokemonTap = (name: string, number: number, apiEndpoint: string) => {
    navigation.navigate('Pokemon', {name, number, apiEndpoint});
  };

  const renderHeader = () => {
    return (
      <View style={{marginBottom: 25}}>
        <Text style={{fontWeight: 'bold', fontSize: 50, color: '#2e3057'}}>
          Pokédex
        </Text>
      </View>
    );
  };

  const renderLoader = () => {
    return isLoading ? (
      <View>
        <ActivityIndicator size="large" color="red" />
      </View>
    ) : null;
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatGrid
        itemDimension={120}
        data={item_list}
        renderItem={rowData => (
          <PokeCard
            id={parseInt(getIdFromUrl(rowData.item.url), 10)}
            name={rowData.item.name}
            number={parseInt(getIdFromUrl(rowData.item.url), 10)}
            apiEndpoint={rowData.item.url}
            onPokemonTap={onPokemonTap}
          />
        )}
        onEndReached={(info)=> {
          // required to avoid duplicate requests
          if (isLoading === false) {
            loadItems();
          }
        }}
        onEndReachedThreshold={0.5}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={renderLoader}
        spacing={15}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingLeft: 10,
    paddingRight: 10,
  },
});

export default Home;
