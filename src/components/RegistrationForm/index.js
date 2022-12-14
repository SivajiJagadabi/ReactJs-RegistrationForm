// Write your JS code here
import {Component} from 'react'
import './index.css'

class RegistrationForm extends Component {
  state = {
    firstName: '',
    secondName: '',
    showFirstNameErr: false,
    showSecondNameErr: false,
    isFormSubmitted: false,
  }

  submitAnotherResponse = () => {
    this.setState(prevState => ({
      isFormSubmitted: !prevState.isFormSubmitted,
      firstName: '',
      secondName: '',
    }))
  }

  validFirstName = () => {
    const {firstName} = this.state

    return firstName !== ''
  }

  validSecondName = () => {
    const {secondName} = this.state

    return secondName !== ''
  }

  onBlurSecondName = () => {
    const isValidSecondName = this.validSecondName()

    this.setState({showSecondNameErr: !isValidSecondName})
  }

  onBlurFirstName = () => {
    const isValidFirstName = this.validFirstName()

    this.setState({showFirstNameErr: !isValidFirstName})
  }

  onChangeFirstName = event => {
    this.setState({firstName: event.target.value})
  }

  onChangeSecondName = event => {
    this.setState({secondName: event.target.value})
  }

  renderSecondName = () => {
    const {secondName, showSecondNameErr} = this.state
    const inputBoxErrHighlight = showSecondNameErr ? 'error-box' : ''
    return (
      <>
        <label htmlFor="secondName" className="input-label">
          LAST NAME
        </label>
        <input
          type="text"
          id="secondName"
          placeholder="Last name"
          value={secondName}
          className={`last-input-field ${inputBoxErrHighlight}`}
          onChange={this.onChangeSecondName}
          onBlur={this.onBlurSecondName}
        />
      </>
    )
  }

  renderFirstName = () => {
    const {firstName, showFirstNameErr} = this.state
    const inputBoxErrHighlight = showFirstNameErr ? 'error-box' : ''
    return (
      <>
        <label htmlFor="firstName" className="input-label">
          FIRST NAME
        </label>
        <input
          type="text"
          id="firstName"
          placeholder="First name"
          className={`first-input-field ${inputBoxErrHighlight}`}
          value={firstName}
          onChange={this.onChangeFirstName}
          onBlur={this.onBlurFirstName}
        />
      </>
    )
  }

  submitForm = event => {
    event.preventDefault()
    const isValidFirstName = this.validFirstName()
    const isValidSecondName = this.validSecondName()

    if (isValidFirstName && isValidSecondName) {
      this.setState({isFormSubmitted: true})
    } else {
      this.setState({
        showFirstNameErr: !isValidFirstName,
        showSecondNameErr: !isValidSecondName,
        isFormSubmitted: false,
      })
    }
  }

  renderSubmitSuccess = () => (
    <>
      <img
        src="https://assets.ccbp.in/frontend/react-js/success-icon-img.png"
        alt="success"
      />
      <p>Submitted Successfully"</p>
      <button
        type="button"
        className="submit-another-response-btn "
        onClick={this.submitAnotherResponse}
      >
        Submit Another Response
      </button>
    </>
  )

  renderRegistrationForm = () => {
    const {showFirstNameErr, showSecondNameErr} = this.state
    return (
      <form className="form-container" onSubmit={this.submitForm}>
        <div className="input-container">{this.renderFirstName()}</div>
        {showFirstNameErr && <p className="error-message">Required*</p>}
        <div className="input-container">{this.renderSecondName()}</div>
        {showSecondNameErr && <p className="error-message">Required*</p>}
        <button type="submit" className="submit-btn">
          Submit
        </button>
      </form>
    )
  }

  render() {
    const {isFormSubmitted} = this.state
    return (
      <div className="app-container">
        <h1 className="heading">Registration</h1>
        <div className="container">
          {isFormSubmitted
            ? this.renderSubmitSuccess()
            : this.renderRegistrationForm()}
        </div>
      </div>
    )
  }
}

export default RegistrationForm
