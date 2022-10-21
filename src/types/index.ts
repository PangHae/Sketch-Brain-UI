export type LayerItem = {
	name: string;
	fileName: string;
};

export type LayerParameter = {
	type: string;
	visible: boolean;
	default_value: number | string | boolean;
};

export type EntriedLayerParameter = [string, LayerParameter | unknown];

export type ParsedLayerParameter = { [key: string]: LayerParameter } | undefined;
