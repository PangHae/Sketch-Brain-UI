export type LayerItem = {
	name: string;
	fileName: string;
};

export interface LayerParameter {
	type: string;
	visible?: boolean;
	default_value: number | string | boolean;
} // 기존 파일에 존재하는 value

export interface LayerParameterNameAdded extends LayerParameter {
	parameterName: string;
}

export type EntriedLayerParameter = [string, LayerParameter | unknown];

export type ParsedLayerParameter = { [key: string]: LayerParameter };

export type ParsedLayerParameterList = { [key: string]: ParsedLayerParameter };

export type ErrorMessage = {
	message: string;
	messageType: string;
};

export type SendLayerObj = {
	[key: string]: string | { [key: string]: string | number | boolean }[];
};

export type ResultRes = {
	id: number;
	uuid: string;
	user: string;
	data_name: string;
	model_name: string;
	result: string;
	created_at: string;
	key?: string;
};

export type GetRunnable = {
	experimentId: string;
	runnable: string;
};
