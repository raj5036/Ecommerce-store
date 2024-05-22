import './Header.css'

import MonkLogo from '../../assets/svgs/monkLogo.svg'

const Header = () => {
	return (
		<div className='headerContainer'>
			<img src={MonkLogo} alt='MonkLogo' className='monkLogo'/>
			<h2 className='headerText'>Monk Upsell & Cross-Sell</h2>
		</div>
	)
}

export default Header