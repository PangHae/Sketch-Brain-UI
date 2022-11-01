export type LayerItem = {
	name: string;
	fileName: string;
};

export interface LayerParameter {
	type: string;
	visible?: boolean;
	default_value: number | string | boolean | null;
} // 기존 파일에 존재하는 value

export interface LayerParameterNameAdded extends LayerParameter {
	parameterName: string;
}

export type EntriedLayerParameter = [string, LayerParameter | unknown];

export type ParsedLayerParameter = { [key: string]: LayerParameter } | undefined;

export type ParsedLayerParameterList = { [key: string]: ParsedLayerParameter };
