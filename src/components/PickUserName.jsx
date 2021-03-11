import { Typography } from "antd";
import './styles/PickUserName';

const { Title } = Typography

const PickUserName = ({ onChange, isLoading, userNameError }) => {
    return (
        <div class="pickusername-container">
            <Title level={2}>Pick your username</Title>
            <input
                className="text-xmrgray-darker p-2 rounded focus:border-none"
                onChange={onChange}
                disabled={isLoading}
            ></input>
            <p class="error-style-1">{userNameError}</p>
            <p class="error-style-2">
                This name cannot be changed once chosen
            </p>
        </div>
    );
}

export default PickUserName
