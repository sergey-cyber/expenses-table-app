import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import styles from "./preloader.module.scss";

type Props = {
    fontSize: number
}

export function Preloader(props: Props) {
    return (
        <div className={styles.container}>
            <LoadingOutlined style={{ fontSize: props.fontSize }} spin />;
        </div>
    )
}