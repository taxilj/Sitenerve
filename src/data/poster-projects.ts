export type PosterProject = {
  title: string;
  category: "Poster Design" | "Social Media Creative" | "Campaign Creative";
  image: string;
  alt: string;
  clientLabel: "Client Creative Project" | "Poster Design Project";
  description: string;
  year?: string;
  externalLink?: {
    href: string;
    label: string;
  };
};

// Add only owner-provided artwork here after its source and display approval are confirmed.
// The workspace currently contains no identifiable poster or social-creative assets.
export const posterProjects: PosterProject[] = [];
