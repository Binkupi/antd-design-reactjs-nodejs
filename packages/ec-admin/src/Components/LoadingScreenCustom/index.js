import React from 'react';
import { Spin } from 'antd';

const LoadingScreen = ({isLoading}) => {
  return (
    isLoading?
    <div style={styles.centered} >
      <Spin tip="Loading..." style={{ZIndex:200}}>
      </Spin>,
    </div>
    :null
  )
}

const styles = {
  centered: { 
    position: 'absolute', 
    top: '0', 
    left: '0', 
    height: '100%', 
    width: '100%', 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    //backgroundColor: 'rgb(0,0,0)',/* Fallback color */
    backgroundColor: 'rgba(0,0,0,0.2)', /* Black w/ opacity */
  }
}

export default LoadingScreen;