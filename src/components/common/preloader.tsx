import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';

type Props = {
    fontSize: number
}

export function Preloader(props: Props) {
    return (
        <div>
            <LoadingOutlined style={{ fontSize: props.fontSize }} spin />;
        </div>
    )
}