import React, { useRef, useEffect } from 'react';
import { Text, TextInput, StyleSheet, View } from 'react-native';
import { useField } from '@unform/core';

import { MaterialCommunityIcons, } from '@expo/vector-icons';

function Input({ name, ico, placeholder, ...rest }) {
  const inputRef = useRef(null);
  const { fieldName, registerField, defaultValue = '', error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: '_lastNativeText',
      getValue(ref) {
        return ref._lastNativeText || '';
      },
      setValue(ref, value) {
        ref.setNativeProps({ text: value });
        ref._lastNativeText = value;
      },
      clearValue(ref) {
        ref.setNativeProps({ text: '' });
        ref._lastNativeText = '';
      }
    })
  }, [fieldName, registerField]);

  return (
    <>
      <View style={styles.InputView}>
        {ico && <MaterialCommunityIcons name={ico} size={24} color="white" />}

        <TextInput
          style={styles.Input}
          placeholder={placeholder}
          ref={inputRef}
          defaultValue={defaultValue}
          {...rest}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  input: {
    marginBottom: 15,
    paddingHorizontal: 12,
    paddingVertical: 16,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#ddd',
    fontSize: 15,
    color: '#444',
  },
  InputView: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 300,
    height: 50,
    borderBottomColor: '#7159c1',
    borderBottomWidth: 2,
    margin: 5,
    paddingHorizontal: 10,
    marginTop: 15
  },
  Input: {
    fontSize: 20,
    color: '#fff',
    marginLeft: 10
  },
});

export default Input;