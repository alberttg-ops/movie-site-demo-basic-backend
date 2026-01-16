export type Movie = {
  id: number;
  title: string;
  poster_path?: string | null;
  release_date?: string;
  vote_average?: number;
};


export type DiscoverParams = {
  genres?: number[];
  minRating?: number;
  fromDate?: string;
  page?: number;
  limit?: number;
};



export type Keyword = {
  id: number;
  name: string;
}; 

export type MovieVideo = {
  id: string;
  name: string;
  key: string;
  site: string;
  type: string;
  size: number | null;
  official: boolean | null;
  published_at: string | null;
  iso_639_1: string | null;
  iso_3166_1: string | null;
};

export type CastMember = {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
};


export type MovieUpdateInput = {
  title?: string;
  poster_path?: string | null;
  release_date?: string;
  vote_average?: number;
};
