import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

const MultiSelect = ({ selectedTeams, setSelectedTeams }) => {
  const teams = [
    { label: 'Neupane', value: 'Neupane' },
    { label: 'Kanu', value: 'Kanu' },
    { label: 'Bashyal', value: 'Bashyal' },
    { label: 'Lamsal', value: 'Lamsal' },
    { label: 'Raskin', value: 'Raskin' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Team</Text>
      <DropDownPicker
        items={teams}
        defaultValue={selectedTeams}
        placeholder="Select Teams"
        multiple={true}
        multipleText="%d items have been selected"
        min={0}
        max={5}
        containerStyle={{ height: 40 }}
        style={styles.dropdown}
        itemStyle={{
          justifyContent: 'flex-start'
        }}
        dropDownStyle={{ backgroundColor: '#fafafa' }}
        onChangeItem={(items) => setSelectedTeams(items)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  dropdown: {
    height: 40,
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 5,
    backgroundColor: '#fafafa',
    paddingHorizontal: 10,
  },
});

export default MultiSelect;
