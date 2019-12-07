import React from 'react';
import { View, Text } from 'react-native';
import { Button, Toast } from '@ant-design/react-native';
import PropTypes from 'prop-types'
import { cancelTransport } from '../../../utils/api/orderManage'

const CancelBtn = (props) => {
  const { navigation } = props
  const {id} = props
  const cancel = () => {
    console.log( cancelTransport(id))
    cancelTransport(id).then(data => {
      Toast.success('取消清运成功')
      navigation.pop()
    })
  }
  return (
    <View style={{marginTop: 30, marginBottom: 30}}>
      <Button onPress={cancel} style={{width: '80%', marginLeft: '10%', borderColor: 'red'}} >
        <Text style={{color: 'red'}}>
          取消清运
        </Text>
      </Button>
    </View>
  )
}
CancelBtn.propTypes = {
  id: PropTypes.string
}
export default CancelBtn
