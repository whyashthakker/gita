export interface Verse {
    sanskrit: string;
    english: string;
  }
  
  export interface Chapter {
    verses: {
      [key: string]: Verse;
    };
  }
  
  export interface GitaData {
    bhagavad_gita: {
      chapters: {
        [key: string]: Chapter;
      };
    };
  }
  