import kind from '@enact/core/kind';
import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import css from './Kitten.less';
import Spottable from '@enact/spotlight/Spottable';

let channel = [];

const KittenBase = kind({
    name: "Kitten",

    styles: {
        css,
        className: 'kitten'
    },

    propTypes:{
        children: PropTypes.string,
        index: PropTypes.number,
        onSelect: PropTypes.func,
        size: PropTypes.number
    },

    defaultProps:{
        size: 300
    },

    handlers: {
        onSelect: (ev, {index, onSelect}) => {
            if (onSelect) {
                onSelect({index});
            }
        }
    },

    computed:{
        url: ({index})=>{
            axios.request({
                url: 'http://app.nettv.com.np/api/v3/users/channel-categories?with=channels',
                method: 'get',
                headers: {Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmaXJlYmFzZSI6ImNzc2RtTlNGNXlxWW86QVBBOTFiRlgwOU9vVlFHRjAyZ1NFTUhsZU9WWUVNZXpVVFpXSUd3OHp6NnA2b0hnMG54c1k0OWNpZDlNTSIsInN1YiI6NjQ0NTYzLCJpc3MiOiJodHRwczovL2FwcC5uZXR0di5jb20ubnAvYXBpL3YzL2xvZ2luIiwiaWF0IjoxNTQ4MzA4NTA3LCJleHAiOjE3MzE2MzA4NTA3LCJuYmYiOjE1NDgzMDg1MDcsImp0aSI6IlVESXpjbzQ0ekxJQzg3QXAifQ.QRqOU2e-l6s92qTCkRp2SdXVJJ3HEdEANOtqaUvrhAE'}
            })
            .then(res => {
                channel = res.data;
            });
            setTimeout(function () {
                document.getElementsByTagName('img')[index].setAttribute("src", channel[0].channels[index].channel_logo);
                document.getElementsByTagName('p')[index].innerHTML = channel[0].channels[index].channel_name;
            }, 500);
            // return `//loremflickr.com/${size}/${size}/dog?random=${index}`;
        }
    },

    render: ({children, onSelect, url, ...rest}) => {
        delete rest.index;
        delete rest.size;
        return (

                <div {...rest} onClick={onSelect}>
                    <img src={url} />
                    <p>{children}</p>
                </div>


        );
    }

});

const Kitten = Spottable(KittenBase);

export default Kitten;
export {Kitten, KittenBase};