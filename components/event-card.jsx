import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function EventCard({ event }){
  const {
    name,
    description,
    event_category,
    event_location,
    start_date,
    duration_in_minutes,
    price,
    enabled_for_enrollment
  } = event;

  return (
    <View style={styles.card}>
      <Text style={styles.title}>{name}</Text>
      <Text style={styles.description}>{description}</Text>

      <View style={styles.detailRow}>
        <Text style={styles.label}>Category:</Text>
        <Text>{event_category.name}</Text>
      </View>

      <View style={styles.detailRow}>
        <Text style={styles.label}>Location:</Text>
        <Text>{`${event_location.name}, ${event_location.full_address}`}</Text>
      </View>

      <View style={styles.detailRow}>
        <Text style={styles.label}>Max Capacity:</Text>
        <Text>{event_location.max_capacity}</Text>
      </View>

      <View style={styles.detailRow}>
        <Text style={styles.label}>Province:</Text>
        <Text>{event_location.location.province.name}</Text>
      </View>

      <View style={styles.detailRow}>
        <Text style={styles.label}>Price:</Text>
        <Text>${price}</Text>
      </View>

      <View style={styles.detailRow}>
        <Text style={styles.label}>Start Date:</Text>
        <Text>{new Date(start_date).toLocaleDateString()}</Text>
      </View>

      <View style={styles.detailRow}>
        <Text style={styles.label}>Duration:</Text>
        <Text>{`${duration_in_minutes} minutes`}</Text>
      </View>

      <View style={styles.detailRow}>
        <Text style={styles.label}>Enrollment Status:</Text>
        <Text>{enabled_for_enrollment === "1" ? "Enabled" : "Disabled"}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 16,
    marginVertical: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  label: {
    fontWeight: 'bold',
  }
});