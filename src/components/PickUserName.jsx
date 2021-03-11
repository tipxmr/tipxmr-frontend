import { Typography } from "antd";
import './styles/PickUserName.css';

const { Title } = Typography

const PickUserName = ({ onChange, isLoading, userNameError }) => {
    return (
        <div className="pickusername-container">
            <Title level={2}>Pick your username</Title>
            <input
                className="text-xmrgray-darker p-2 rounded focus:border-none"
                onChange={onChange}
                disabled={isLoading}
            ></input>
            <p className="error-style-1">{userNameError}</p>
            <p className="error-style-2">
                This name cannot be changed once chosen
            </p>
        </div>
    );
}

export default PickUserName
