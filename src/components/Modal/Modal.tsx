import React, { FC, useEffect } from 'react';
import classNames from 'classnames';
import { IModalProps } from './Modal.props';
import styles from './Modal.module.css';

export const Modal: FC<IModalProps> = ({ className, children, ...props }) => {
	useEffect(() => {
		document.body.style.maxHeight = '100vh';
		document.body.style.overflow = 'hidden';
		return () => {
			document.body.style.maxHeight = '';
			document.body.style.overflow = '';
		};
	}, []);
	return (
		<div className={classNames(styles.root, className)} {...props}>
			{children}
		</div>
	);
};
