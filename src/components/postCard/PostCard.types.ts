export interface PostCardProps {
  id: string;
  title: string;
  category: string;
  content: string;
  created_at: Date;
  created_by: string;
  created_by_ref: {
    name: string;
  };
  sectionTitle: string;
}
