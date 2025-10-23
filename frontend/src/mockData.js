export const mockProducts = [
  {
    id: '1',
    name: 'Emp. Jean Jacques Dessalines',
    description: 'Jean-Jacques Dessalines was a leader of the Haitian Revolution and the first ruler of an independent Haiti under the 1805 constitution. He proclaimed himself Emperor Jacques I in 1804.',
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?w=500&h=500&fit=crop',
    status: 'in_stock',
    category: 'historical',
    featured: true,
    year: '1804',
    material: 'Bronze with colorized enamel',
    weight: '31.1g',
    diameter: '40mm',
    mintage: '1804 pieces'
  },
  {
    id: '2',
    name: 'Catherine Flon',
    description: 'Catherine Flon was a Haitian seamstress who is famous for sewing the first Haitian flag in 1803. She played a crucial role in Haitian independence.',
    price: 279.99,
    image: 'https://images.unsplash.com/photo-1610375461246-83df859d849d?w=500&h=500&fit=crop',
    status: 'in_stock',
    category: 'historical',
    featured: true,
    year: '1803',
    material: 'Bronze with colorized enamel',
    weight: '31.1g',
    diameter: '40mm',
    mintage: '1803 pieces'
  },
  {
    id: '3',
    name: 'Sanite Belair',
    description: 'Suzanne Bélair, known as Sanite Belair, was a Haitian freedom fighter and revolutionary who fought alongside her husband in the Haitian Revolution.',
    price: 289.99,
    image: 'https://images.unsplash.com/photo-1633167606207-d840b5070fc2?w=500&h=500&fit=crop',
    status: 'in_stock',
    category: 'historical',
    featured: true,
    year: '1802',
    material: 'Gold-plated brass',
    weight: '31.1g',
    diameter: '40mm',
    mintage: '1802 pieces'
  },
  {
    id: '4',
    name: 'Marie-Jeanne Lamartinière',
    description: 'Marie-Jeanne Lamartinière was a Haitian revolutionary who fought in the Battle of Crête-à-Pierrot in 1802, one of the most important battles of the Haitian Revolution.',
    price: 269.99,
    image: 'https://images.unsplash.com/photo-1625566008876-c19dce5cd11a?w=500&h=500&fit=crop',
    status: 'limited_stock',
    category: 'historical',
    featured: false,
    year: '1802',
    material: 'Bronze with colorized enamel',
    weight: '31.1g',
    diameter: '40mm',
    mintage: '1802 pieces'
  },
  {
    id: '5',
    name: 'Alexandre Pétion',
    description: 'Alexandre Pétion was the first President of the Republic of Haiti from 1807 until his death in 1818. He is considered one of the founding fathers of Haiti.',
    price: 319.99,
    image: 'https://images.unsplash.com/photo-1610375461369-d613b564f116?w=500&h=500&fit=crop',
    status: 'coming_soon',
    category: 'presidential',
    featured: false,
    year: '1818',
    material: 'Gold-plated brass',
    weight: '31.1g',
    diameter: '40mm',
    mintage: '1818 pieces'
  },
  {
    id: '6',
    name: 'Henri Christophe',
    description: 'Henri Christophe was a key leader in the Haitian Revolution and became King of Haiti in the northern part of the country from 1811 to 1820.',
    price: 309.99,
    image: 'https://images.unsplash.com/photo-1565372195458-9de0b320ef04?w=500&h=500&fit=crop',
    status: 'in_stock',
    category: 'royal',
    featured: false,
    year: '1811',
    material: 'Silver-plated brass',
    weight: '31.1g',
    diameter: '40mm',
    mintage: '1811 pieces'
  }
];

export const mockComments = {
  '1': [
    {
      id: 'c1',
      userId: 'user1',
      username: 'CoinCollector123',
      comment: 'Beautiful commemorative piece! The detail on this coin is exceptional.',
      timestamp: '2025-01-15T10:30:00Z',
      likes: 5
    },
    {
      id: 'c2',
      userId: 'user2',
      username: 'HistoryBuff',
      comment: 'Just received mine today. The quality exceeded my expectations!',
      timestamp: '2025-01-14T15:20:00Z',
      likes: 3
    }
  ],
  '2': [
    {
      id: 'c3',
      userId: 'user3',
      username: 'NumismatistPro',
      comment: 'A wonderful tribute to Catherine Flon. The colorization is stunning.',
      timestamp: '2025-01-13T09:15:00Z',
      likes: 7
    }
  ]
};

export const mockUser = {
  id: 'user1',
  username: 'JohnDoe',
  email: 'john@example.com',
  name: 'John Doe'
};