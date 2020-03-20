import { Component } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
//import { color_primary } from '../constants/CustomTheme';
import "../components/Header.less";

class Header extends Component {
  static propTypes = {
    title: PropTypes.string
  }
  static defaultProps = {
    title: ''
  }
  constructor(props) {
    super(props);
    const { title } = props;
    this.state = { title };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.title !== prevState.title) {
      return {
        title: nextProps.title
      };
    }
    return null;
  }

  render() {
    const { title } = this.state;
    return (
      <div className='header-container'>
        <style src='../components/Header.less'></style>
        <Link href='/'>
          <div className='logo-container'>
            <img className='logo' alt='logo' src={'/static/logo.png'} />
            <span className='sys-name'>Next-Antd-Scaffold</span>
          </div>
        </Link>
        <h1>{title}</h1>
      </div>
    );
  }
}

export default Header;
