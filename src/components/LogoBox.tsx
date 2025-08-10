import { Link } from 'react-router-dom'

//image
import logo from '@/assets/images/logo2.png'
// import logoSm from '@/assets/images/logo2.png'
// import logoDark from '@/assets/images/logo-dark.png'

const LogoBox = () => {
	return (
		<>
			<Link to="/" className="logo-box my-3 flex !justify-start">
				<div className="logo-light p-2">
					<img src={logo} className="w-[90px]" alt="Light logo" />
					{/* <img src={logoSm} className="logo-sm h-[22px]" alt="Small logo" /> */}
					{/* <h2 className='text-white text-2xl uppercase font-bold'>The Right <span className='text-[#08c51a]'>Meal</span></h2> */}
				</div>

				<div className="logo-dark p-2">
					{/* <img src={logoDark} className="w-[100px]" alt="Dark logo" /> */}
					{/* <img src={logoSm} className="logo-sm h-[22px]" alt="Small logo" /> */}
					{/* <h2 className='text-white text-2xl uppercase font-bold'>The Right <span className='text-[#08c51a]'>Meal</span></h2> */}
				</div>
			</Link>
		</>
	)
}

export default LogoBox
