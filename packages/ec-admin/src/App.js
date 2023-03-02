import React, { useEffect } from 'react';
import { connect } from "react-redux";
import Routes from './Routes';
import * as actions from './Containers/LoginPage/actions';

const App = ({ jwt, me }) => {
  useEffect(() => {
    me();
  }, [jwt, me]);

  return <Routes />;
};

const mapStateToProps = (state) => {
  return {
    jwt: state.auth.jwt,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    me: () => {
      dispatch(actions.me());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
