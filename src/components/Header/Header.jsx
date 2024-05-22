import './Header.css'

import MonkLogo from '../../assets/svgs/monkLogo.svg'

const Header = () => {
	return (
		<div className='headerContainer'>
			<img src={MonkLogo} alt='MonkLogo' className='monkLogo'/>
			<p className='headerText'>Monk Upsell & Cross-Sell</p>
		</div>
	)
}

export default Header