import {Header, Panel} from '@enact/moonstone/Panels';
import kind from '@enact/core/kind';
import React from 'react';
import PropTypes from 'prop-types';
import ReactJWPlayer from 'react-jw-player';

const DetailBase = kind({
    name: 'Detail',

    propTypes: {
        name: PropTypes.string,
    },


    render: ({name, links, ...rest}) => (
        <Panel {...rest}>
            <Header title={name} />
            <ReactJWPlayer
                playerId='jw-player'
                // licenseKey='9p9+6yFethst8ePGF6tnl/5wUGPqvwKIQzZlo00IaHA='
                playerScript='https://content.jwplatform.com/libraries/ZNX3JbCh.js'
                // file='http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
                file={links}
            />,
        </Panel>
    )
});

export default DetailBase;
export {DetailBase as Detail, DetailBase};