export interface BundlesState {
	[key: string]:
		| {
				loading: boolean;
				code: string;
				err: string;
		  }
		| undefined;
}
