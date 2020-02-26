import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import PropTypes from 'prop-types'
import AppIcon from '../images/simba-logo.png'
import { Link } from 'react-router-dom'

// MUI stuff
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

// redux stuff
import { connect } from 'react-redux'
import { loginUser } from '../redux/actions/userActions'

const styles ={
  form: {
    textAlign: 'center'
  },
  appIcon: {
    width: '50%',
    margin: '10px auto 10px auto'
  },
  pageTile: {
    margin: '10px auto 10px auto'
  },
  textField: {
    margin: '10px auto 10px auto'
  },
  button: {
    position: 'relative',
    margin: '20px'
  },
  progress: {
    position: 'absolute',
  },
  customError: {
    color: 'red',
    fontSize: '0.8rem',
    marginTop: 10
  }
}

class login extends Component {
  constructor(){
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password
    }
    this.props.loginUser(userData, this.props.history)
  }
  
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
    const { classes, UI: { loading, errors } } = this.props
    return (
      <Grid container className={classes.form}>
        <Grid item sm/>
        <Grid item sm>
          <img src={AppIcon} alt="Monkey" className={classes.appIcon}/>
          <Typography variant="h3" className={classes.pageTile}>
            Login
          </Typography>
          <form noValidate onSubmit={this.handleSubmit} >
            <TextField id="email" name="email" type="email" label="Email" helperText={errors.email} error={errors.email ? true : false} className={classes.textField} 
              value={this.state.email} onChange={this.handleChange} fullWidth/>
            <TextField id="password" name="password" type="password" label="Password" helperText={errors.password} 
              error={errors.password ? true : false} className={classes.textField} 
              value={this.state.password} onChange={this.handleChange} fullWidth/>
            {errors.general && (
              <Typography variant="body2" className={classes.customError}>
                {errors.general}
              </Typography>
            )}
            <Button type="submit" variant="contained" color="primary" className={classes.button} disabled={loading}>
              Login
              {loading && (
                <CircularProgress size={30} className={classes.progress}/>
              )}
            </Button>
            <br/>
            <small>dont have an account ? sign up <Link to="/signup">here</Link></small>
          </form>
        </Grid>
        <Grid item sm/>
      </Grid>
    )
  }
}

login.propTypes = {
  classes: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI
})

const mapActionsToProps = {
  loginUser
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(login));
