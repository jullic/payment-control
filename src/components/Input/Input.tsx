import React, { FC } from 'react';
import classNames from 'classnames';
import { IInputProps } from './Input.props';
import styles from './Input.module.css';

export const Input: FC<IInputProps> = ({ className, ...props }) => {
	return <input className={classNames(styles.root, className)} {...props} />;
};
