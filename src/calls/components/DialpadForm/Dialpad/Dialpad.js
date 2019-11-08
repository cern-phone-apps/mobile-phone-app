import React from 'react';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import PropTypes from 'prop-types';

import styles from './DialpadStyles';

const Dialpad = ({ updatePhoneNumber, disabled, height = 250 }) => {
  const pad = [
    {
      key: '123',
      columns: [
        { text: 1, subText: '' },
        { text: 2, subText: 'ABC' },
        { text: 3, subText: 'DEF' }
      ]
    },
    {
      key: '456',
      columns: [
        { text: 4, subText: 'GHI' },
        { text: 5, subText: 'JKL' },
        { text: 6, subText: 'MNO' }
      ]
    },
    {
      key: '789',
      columns: [
        { text: 7, subText: 'PQRS' },
        { text: 8, subText: 'TUV' },
        { text: 9, subText: 'VWXYZ' }
      ]
    },
    {
      key: '*0#',
      columns: [
        { text: '*', subText: '' },
        {
          text: 0,
          subText: '+',
          onLongPress: () => updatePhoneNumber('+')
        },
        { text: '#', subText: '' }
      ]
    }
  ];

  return (
    <View style={{ height: height }}>
      <Grid>
        {pad.map(row => (
          <Row key={row.key}>
            {row.columns.map(column => (
              <Col key={column.text}>
                <Button
                  activeOpacity={disabled ? 1 : 0.7}
                  onPress={() => !disabled && updatePhoneNumber(column.text)}
                  onLongPress={column.onLongPress}
                  buttonStyle={{
                    backgroundColor: 'transparent',
                    padding: 0,
                    margin: 0,
                    width: '100%',
                    border: null
                  }}
                  title={
                    <React.Fragment>
                      <Text
                        style={[
                          styles.mainText,
                          disabled ? styles.disabled : null
                        ]}
                      >
                        {column.text}
                      </Text>
                      {'\n'}
                      <Text
                        style={[
                          styles.subText,
                          disabled ? styles.disabled : null
                        ]}
                      >
                        {column.subText}
                      </Text>
                    </React.Fragment>
                  }
                />
              </Col>
            ))}
          </Row>
        ))}
      </Grid>
    </View>
  );
};

Dialpad.propTypes = {
  updatePhoneNumber: PropTypes.func.isRequired,
  disabled: PropTypes.bool
};

Dialpad.defaultProps = {
  disabled: false
};

export default Dialpad;
