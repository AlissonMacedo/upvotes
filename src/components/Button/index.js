import React from 'react';
import { ActivityIndicator, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { Container } from './styles';

export default function Button({ children, color, loading, ...rest }) {
  return (
    <Container {...rest} color={color}>
      {loading ? (
        <ActivityIndicator size="small" color="#fff" />
      ) : (
          <Text style={styles.TextButtonLoginTitle}>{children}</Text>
        )}
    </Container>
  );
}

Button.propTypes = {
  children: PropTypes.string.isRequired,
  color: PropTypes.string,
  loading: PropTypes.bool,
};

Button.defaultProps = {
  color: undefined,
  loading: false,
};


const styles = StyleSheet.create({
  TextButtonLoginTitle: {
    color: '#fff',
    fontSize: 25,
    fontWeight: 'bold'
  },
});