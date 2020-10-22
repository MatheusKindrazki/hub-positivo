export interface ExampleProps {
  name?: string;
}

export interface ExamplesApi {
  id: string;
  name: string;
  email: string;
}

export interface ExamplesApiResponse {
  data?: ExamplesApi[];
  pages: number;
}

export interface ExamplesReducer {
  data: ExamplesApi[];
  loading: boolean;
  pages: number;
}
