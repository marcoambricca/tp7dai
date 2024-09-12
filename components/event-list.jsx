import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import EventCard from './event-card.jsx';

export default function EventList({ events }){
  const renderItem = ({ item }) => <EventCard event={item} />;

  return (
    <View style={styles.container}>
      <FlatList
        data={events}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f5f5f5'
  },
});