export class Movie {
  public reviews: { username: string; rating: number; content: string }[] = [];
  public cast: {gender: string; name: string; profile_path: string; character: string;}[] = [];
  public averageRating: number = 0;
  public certification: string | null = null;
  public trailer: any; 
  public providers: {
    logo_path: string;
    provider_id: string;
    provider_name: string;
  }[] = [];

  constructor (
    public id: string,
    public name: string,
    public imgURL: string,
    public genre: string[],
    public overview: string,
    public tagline: string,
    public releaseDate: string,
    public status: string,
    public homepage: string, 
    public budget: string,
    public revenue: string,
    public runtime: string, 
    public profit: string,
    public production_companies: string[],
    public spoken_languages: string[],
  ) { }
}