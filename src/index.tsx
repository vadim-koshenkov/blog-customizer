import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { ArticleStateType, defaultArticleState } from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

import { useState, useCallback } from "react";

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [pageSettings, setPageSettings] = useState<ArticleStateType>(defaultArticleState);

	const handlePageSettings = (newSettings: ArticleStateType) => {
		setPageSettings(newSettings);
	}

	const toggleSidebar = (option?: boolean) => {
		option ? setIsOpen(option) : setIsOpen(!isOpen)
	}

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': pageSettings.fontFamilyOption.value,
					'--font-size': pageSettings.fontSizeOption.value,
					'--font-color': pageSettings.fontColor.value,
					'--container-width': pageSettings.contentWidth.value,
					'--bg-color': pageSettings.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm 
				formState={isOpen} 
				toggleFunction={toggleSidebar}
				setSettingsFunction={handlePageSettings}
			/>
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);