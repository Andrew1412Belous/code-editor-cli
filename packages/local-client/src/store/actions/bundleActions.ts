export interface BundleStartAction {
	type: string;
	payload: {
		cellId: string;
	};
}

export interface BundleCompleteAction {
	type: string;
	payload: {
		cellId: string;
		bundle: {
			code: string;
			err: string;
		};
	};
}
