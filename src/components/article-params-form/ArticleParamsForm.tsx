import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Text } from 'src/ui/text'
import { Select } from 'src/ui/select'
import { RadioGroup } from 'src/ui/radio-group';
import { fontFamilyOptions, fontSizeOptions, fontColors, backgroundColors, contentWidthArr, defaultArticleState, OptionType, ArticleStateType } from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';

import { useState, useRef, useEffect } from "react";
import { Separator } from 'src/ui/separator';

type ArticleParamsFormProps = {
	formState: boolean;
	toggleFunction: (option?: boolean) => void;
	setSettingsFunction: (settings: ArticleStateType) => void;
}

export const ArticleParamsForm = (props: ArticleParamsFormProps) => {
	const [formSettings, setFormSettings] = useState<ArticleStateType>(defaultArticleState);
	const sidebarRef = useRef<HTMLElement>(null);

	useEffect(() => {
		document.addEventListener('mousedown', clickOutside);

		return () => {
			document.removeEventListener('mousedown', clickOutside);
		};
	}, [props.formState, props.toggleFunction]);

	const handleFormChange = (selected: OptionType, optionName: keyof ArticleStateType) => {
		setFormSettings(prev => ({
			...prev,
			[optionName]: selected
		}));
	};

	const clickOutside = (e: MouseEvent) => {
			if (props.formState && sidebarRef.current && !sidebarRef.current.contains(e.target as Node)) {
				props.toggleFunction(false);
			}
		};
	
	const resetFormSettings = () => {
		setFormSettings(defaultArticleState);
		props.setSettingsFunction(defaultArticleState);
		props.toggleFunction(false);
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		props.setSettingsFunction(formSettings);
		props.toggleFunction(false);
	};

	return (
		<>
			<ArrowButton 
				isOpen={props.formState} 
				onClick={() => props.toggleFunction()} 
			/>
			<aside 
				ref={sidebarRef} 
				className={clsx(styles.container, { 
					[styles.container_open]: props.formState 
				})}
			>
				<form className={styles.form} onSubmit={handleSubmit}>
					<Text 
					as={'h2'} 
					size={31} 
					weight={800} 
					uppercase
				>
					Задайте параметры
				</Text>
					<Select 
						selected={formSettings.fontFamilyOption} 
						onChange={(selected) => handleFormChange(selected, 'fontFamilyOption')} 
						options={fontFamilyOptions} 
						title='шрифт'
					/>
					<RadioGroup 
						selected={formSettings.fontSizeOption} 
						name='font-size' 
						onChange={(selected) => handleFormChange(selected, 'fontSizeOption')} 
						options={fontSizeOptions} 
						title='размер шрифта'
					/>
					<Select 
						selected={formSettings.fontColor} 
						onChange={(selected) => handleFormChange(selected, 'fontColor')} 
						options={fontColors} 
						title='цвет шрифта'
					/>
					<Separator/>
					<Select 
						selected={formSettings.backgroundColor} 
						onChange={(selected) => handleFormChange(selected, 'backgroundColor')} 
						options={backgroundColors} 
						title='цвет фона'
					/>
					<Select 
						selected={formSettings.contentWidth} 
						onChange={(selected) => handleFormChange(selected, 'contentWidth')} 
						options={contentWidthArr} 
						title='ширина контента'
					/>
					<div className={styles.bottomContainer}>
						<Button 
							title='Сбросить' 
							htmlType='button' 
							type='clear'
							onClick={resetFormSettings}
						/>
						<Button 
							title='Применить' 
							htmlType='submit' 
							type='apply'
						/>
					</div>
				</form>
			</aside>
		</>
	);
};