import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// material-ui
import { ButtonBase } from '@mui/material';


// ==============================|| MAIN LOGO ||============================== //

const LogoSection = () => {
    const dispatch = useDispatch();
    return (
        <ButtonBase>
           <div>logo</div>
        </ButtonBase>
    );
};

export default LogoSection;
