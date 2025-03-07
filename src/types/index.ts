
export interface Author {
  name: string;
  affiliation: string;
  isNonAcademic: boolean;
  email?: string;
  isCorresponding: boolean;
}

export interface ResearchPaper {
  id: string;
  title: string;
  publicationDate: string;
  authors: Author[];
  abstract?: string;
  journal?: string;
  keywords?: string[];
  doi?: string;
}

export interface SearchResult {
  papers: ResearchPaper[];
  total: number;
  page: number;
  isLoading: boolean;
  hasMore: boolean;
}

export interface SearchParams {
  query: string;
  page: number;
  limit: number;
  filters?: {
    dateRange?: [string, string];
    companyFilter?: string[];
    journalFilter?: string[];
  };
}
