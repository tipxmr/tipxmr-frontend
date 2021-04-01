import { Tag } from "antd"
import PropTypes from 'prop-types'

const SyncStatus = ({ synced }) => {
    return (
        <Tag color={synced ? "blue" : "magenta"} className="padding-around">
            {synced
                ? "Your wallet is up to date"
                : "Your wallet still needs to catch up"}
        </Tag>
    );
};

SyncStatus.propTypes = {
    synced: PropTypes.bool
}

export default SyncStatus
