
import { useState } from 'react';
import { SearchParams, SearchResult, ResearchPaper, Author } from '@/types';
import { toast } from 'sonner';

// This is a mock function to simulate API call to PubMed
// In a real implementation, this would be replaced with actual API calls
const simulatePubMedSearch = async (params: SearchParams): Promise<SearchResult> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Mock data
  const mockAuthors: Author[] = [
    {
      name: 'Jane Smith',
      affiliation: 'Pfizer Research Labs',
      isNonAcademic: true,
      email: 'jane.smith@pfizer.com',
      isCorresponding: true
    },
    {
      name: 'John Doe',
      affiliation: 'Harvard Medical School',
      isNonAcademic: false,
      email: 'john.doe@harvard.edu',
      isCorresponding: false
    },
    {
      name: 'Sarah Johnson',
      affiliation: 'Merck Pharmaceuticals',
      isNonAcademic: true,
      email: 'sarah.j@merck.com',
      isCorresponding: false
    }
  ];

  const mockPapers: ResearchPaper[] = [
    {
      id: '12345678',
      title: 'Novel Therapeutic Approaches for Treatment of Autoimmune Disorders',
      publicationDate: '2023-04-15',
      authors: [mockAuthors[0], mockAuthors[1]],
      abstract: 'This study explores novel therapeutic approaches for the treatment of autoimmune disorders, focusing on targeted immunomodulation.',
      journal: 'Journal of Immunology',
      keywords: ['autoimmune', 'immunomodulation', 'therapeutic approaches'],
      doi: '10.1234/imm.2023.12345'
    },
    {
      id: '23456789',
      title: 'Efficacy of New Generation Antiviral Compounds Against SARS-CoV-2 Variants',
      publicationDate: '2023-02-28',
      authors: [mockAuthors[2], mockAuthors[1], mockAuthors[0]],
      abstract: 'We evaluated the efficacy of new generation antiviral compounds against emerging SARS-CoV-2 variants in both in vitro and in vivo models.',
      journal: 'Nature Biotechnology',
      keywords: ['COVID-19', 'antivirals', 'drug discovery'],
      doi: '10.1038/nbt.2023.5678'
    },
    {
      id: '34567890',
      title: 'Pharmacokinetics and Safety Profile of Novel JAK Inhibitors',
      publicationDate: '2023-01-10',
      authors: [mockAuthors[0], mockAuthors[2]],
      abstract: 'This paper details the pharmacokinetics and safety profile of novel JAK inhibitors developed for treatment of inflammatory conditions.',
      journal: 'Clinical Pharmacology & Therapeutics',
      keywords: ['JAK inhibitors', 'pharmacokinetics', 'safety profile'],
      doi: '10.1002/cpt.2023.7890'
    }
  ];

  // Generate more mock data based on page
  const resultsPerPage = params.limit || 10;
  const startIdx = (params.page - 1) * resultsPerPage;
  const additionalPapers: ResearchPaper[] = [];
  
  for (let i = 0; i < resultsPerPage; i++) {
    const idx = startIdx + i;
    if (idx >= 3 && idx < 30) { // We'll cap at 30 total results
      additionalPapers.push({
        id: `extended-${idx}`,
        title: `Research Paper Related to ${params.query} - Study ${idx + 1}`,
        publicationDate: `2023-${(idx % 12) + 1}-${(idx % 28) + 1}`.replace(/\b(\d)\b/g, '0$1'),
        authors: [
          mockAuthors[idx % 3], 
          mockAuthors[(idx + 1) % 3]
        ],
        journal: ['Nature', 'Science', 'Cell', 'NEJM', 'JAMA'][idx % 5],
        keywords: ['research', params.query.toLowerCase(), 'medicine'].filter(Boolean),
      });
    }
  }

  const filteredPapers = [...mockPapers, ...additionalPapers]
    .filter(paper => {
      if (!params.query) return true;
      
      const query = params.query.toLowerCase();
      return (
        paper.title.toLowerCase().includes(query) || 
        paper.authors.some(author => 
          author.name.toLowerCase().includes(query) || 
          author.affiliation.toLowerCase().includes(query)
        ) ||
        (paper.abstract && paper.abstract.toLowerCase().includes(query)) ||
        (paper.keywords && paper.keywords.some(kw => kw.toLowerCase().includes(query)))
      );
    })
    .slice(startIdx, startIdx + resultsPerPage);

  // Simulate total count
  const total = params.query ? 
    Math.min(30, Math.ceil(params.query.length * 3.5)) : 
    30;

  return {
    papers: filteredPapers,
    total: total,
    page: params.page,
    isLoading: false,
    hasMore: (startIdx + resultsPerPage) < total
  };
};

export function useSearch() {
  const [searchParams, setSearchParams] = useState<SearchParams>({
    query: '',
    page: 1,
    limit: 10,
  });
  
  const [results, setResults] = useState<SearchResult>({
    papers: [],
    total: 0,
    page: 1,
    isLoading: false,
    hasMore: false,
  });

  const search = async (params?: Partial<SearchParams>) => {
    const updatedParams = { ...searchParams, ...params };
    
    // Reset page to 1 if query changes
    if (params?.query !== undefined && params.query !== searchParams.query) {
      updatedParams.page = 1;
    }
    
    setSearchParams(updatedParams);
    setResults(prev => ({ ...prev, isLoading: true }));
    
    try {
      const result = await simulatePubMedSearch(updatedParams);
      setResults(result);
    } catch (error) {
      console.error('Search error:', error);
      toast.error('Failed to fetch research papers', {
        description: 'Please try again or check your query syntax.'
      });
      setResults(prev => ({ ...prev, isLoading: false }));
    }
  };

  const loadMore = () => {
    if (results.hasMore && !results.isLoading) {
      search({ page: searchParams.page + 1 });
    }
  };

  const exportToCsv = () => {
    if (!results.papers.length) {
      toast.error('No data to export');
      return;
    }

    try {
      // Create CSV header
      const headers = [
        'PubmedID',
        'Title',
        'Publication Date',
        'Non-academic Author(s)',
        'Company Affiliation(s)',
        'Corresponding Author Email'
      ];

      // Create CSV rows
      const rows = results.papers.map(paper => {
        const nonAcademicAuthors = paper.authors
          .filter(author => author.isNonAcademic)
          .map(author => author.name)
          .join('; ');
        
        const companyAffiliations = paper.authors
          .filter(author => author.isNonAcademic)
          .map(author => author.affiliation)
          .join('; ');
        
        const correspondingEmail = paper.authors
          .find(author => author.isCorresponding)?.email || '';

        return [
          paper.id,
          paper.title,
          paper.publicationDate,
          nonAcademicAuthors,
          companyAffiliations,
          correspondingEmail
        ];
      });

      // Combine headers and rows
      const csvContent = [
        headers.join(','),
        ...rows.map(row => row.join(','))
      ].join('\n');

      // Create blob and download link
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', `research-papers-${new Date().toISOString().slice(0, 10)}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast.success('Export successful', {
        description: 'CSV file has been generated and downloaded.'
      });
    } catch (error) {
      console.error('Export error:', error);
      toast.error('Failed to export data', {
        description: 'An error occurred while generating the CSV file.'
      });
    }
  };

  return {
    searchParams,
    results,
    search,
    loadMore,
    exportToCsv
  };
}
