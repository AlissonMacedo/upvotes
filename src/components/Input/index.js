import React, { useRef, useEffect, useImperativeHandle, forwardRef, useState, useCallback } from 'react';
import { Text, TextInput, StyleSheet, View } from 'react-native';
import { useField } from '@unform/core';

import { MaterialCommunityIcons, } from '@expo/vector-icons';
import { Container } from './styles'

function Input({ name, ico, placeholder, ...rest }, ref) {
  const inputElementRef = useRef(null)

  const { fieldName, registerField, defaultValue = '', error } = useField(name);
  const inputValueRef = useRef({ value: defaultValue });

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!inputValueRef.current.value)
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputValueRef.current,
      path: 'value',
      setValue(ref, value) {
        inputValueRef.current.value = value;
        inputElementRef.current.setNativeProps({ text: value })
      },
      clearValue() {
        inputValueRef.current.value = '';
        inputElementRef.current.clear();
      },
    });
  }, [fieldName, registerField]);

  useImperativeHandle(ref, () => ({
    focus() {
      inputElementRef.current.focus()
    }
  }))

  return (
    <>
      <Container isFocused={isFocused} >
        {ico && <MaterialCommunityIcons name={ico} size={24} color={isFocused || isFilled ? '#7159c1' : '#666360'} />}

        <TextInput
          ref={inputElementRef}
          style={styles.Input}
          keyboardAppearance="dark"
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          placeholderTextColor="#666360"
          placeholder={placeholder}
          defaultValue={defaultValue}
          onChangeText={(value) => { inputValueRef.current.value = value }}

          {...rest}
        />
      </Container>
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

export default forwardRef(Input);