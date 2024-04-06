export interface Review {
    id: number;
    reviewType: 'Performance' | 'Satisfaction' | 'Design';
    description: string;
    rating: number;
}
  