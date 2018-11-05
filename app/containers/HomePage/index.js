/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import H2 from 'components/H2';
import catAndGirl from '../../images/catAndGirl.png';
import Img from '../../components/Img';
import CenteredSection from './CenteredSection';
import Section from './Section';
import messages from './messages';
import reducer from './reducer';
import saga from './saga';

/* eslint-disable react/prefer-stateless-function */
export class HomePage extends React.PureComponent {
  /**
   * when initial state username is not null, submit the form to load repos
   */
  componentDidMount() {
    if (this.props.username && this.props.username.trim().length > 0) {
      this.props.onSubmitForm();
    }
  }

  render() {
    const { loading, error } = this.props;

    return (
      <article>
        <Helmet>
          <title>Beer Home Page</title>
          <meta name="description" content="Beer Finder Homepage" />
        </Helmet>
        <div>
          <CenteredSection>
            <img
              style={{ width: '50vw', paddingTop: '25vh' }}
              src={catAndGirl}
              alt="react-boilerplate - Logo"
            />
          </CenteredSection>
        </div>
      </article>
    );
  }
}

// HomePage.propTypes = {
//   loading: PropTypes.bool,
//   error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
// };
//
// export function mapDispatchToProps(dispatch) {
//   return {
//     onChangeUsername: evt => dispatch(changeUsername(evt.target.value)),
//     onSubmitForm: evt => {
//       if (evt !== undefined && evt.preventDefault) evt.preventDefault();
//       dispatch(loadRepos());
//     },
//   };
// }
//
// const mapStateToProps = createStructuredSelector({
//   repos: makeSelectRepos(),
//   username: makeSelectUsername(),
//   loading: makeSelectLoading(),
//   error: makeSelectError(),
// });
//
// const withConnect = connect(
//   mapStateToProps,
//   mapDispatchToProps,
// );
//
// const withReducer = injectReducer({ key: 'home', reducer });
// const withSaga = injectSaga({ key: 'home', saga });
//
// export default compose(
//   withReducer,
//   withSaga,
//   withConnect,
// )(HomePage);
export default HomePage;
