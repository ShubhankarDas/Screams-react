import React from 'react'
import { Route, Redirect } from 'react-router-dom'

import PropTypes from 'prop-types'

// redux
import { connect } from 'react-redux'

const AuthRoute = ({component: Component, authenticated, ...rest}) => (
  <Route
    {...rest}
    render={(props) => authenticated ? <Redirect to='/'/> : <Component {...props}/> }
  />
)

const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated,
  user: state.user
})

AuthRoute.propTypes = {
  user: PropTypes.object.isRequired
}

export default connect(mapStateToProps)(AuthRoute)
