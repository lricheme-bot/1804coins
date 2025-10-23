export const mockProducts = [
  {
    id: '1',
    name: 'Emp. Jean Jacques Dessalines',
    description: 'Challenge coin honoring Jean-Jacques Dessalines, a leader of the Haitian Revolution and the first ruler of an independent Haiti under the 1805 constitution. He proclaimed himself Emperor Jacques I in 1804. This commemorative challenge coin celebrates his pivotal role in Haiti\'s independence.',
    price: 25.00,
    image: 'https://images.unsplash.com/photo-1624987229653-5cc7b7d1b57e?w=500&h=500&fit=crop',
    status: 'in_stock',
    category: 'historical',
    featured: true,
    year: '1804',
    material: 'Zinc alloy with colorized enamel',
    weight: '28g',
    diameter: '39mm',
    mintage: 'Limited Edition'
  },
  {
    id: '2',
    name: 'Catherine Flon',
    description: 'Challenge coin celebrating Catherine Flon, the Haitian seamstress who sewed the first Haitian flag in 1803. This commemorative coin honors her crucial contribution to Haitian independence and national identity.',
    price: 25.00,
    image: 'https://images.unsplash.com/photo-1634128221889-82ed6efebfc3?w=500&h=500&fit=crop',
    status: 'in_stock',
    category: 'historical',
    featured: true,
    year: '1803',
    material: 'Zinc alloy with colorized enamel',
    weight: '28g',
    diameter: '39mm',
    mintage: 'Limited Edition'
  },
  {
    id: '3',
    name: 'Sanite Belair',
    description: 'Challenge coin honoring Suzanne Bélair (Sanite Belair), a fearless Haitian freedom fighter and revolutionary who fought courageously alongside her husband in the Haitian Revolution. This commemorative coin celebrates her bravery and sacrifice.',
    price: 25.00,
    image: 'https://images.unsplash.com/photo-1621504450181-5d356f61d307?w=500&h=500&fit=crop',
    status: 'in_stock',
    category: 'historical',
    featured: true,
    year: '1802',
    material: 'Zinc alloy with colorized enamel',
    weight: '28g',
    diameter: '39mm',
    mintage: 'Limited Edition'
  },
  {
    id: '4',
    name: 'Marie-Jeanne Lamartinière',
    description: 'Challenge coin celebrating Marie-Jeanne Lamartinière, a Haitian revolutionary hero who fought valiantly in the Battle of Crête-à-Pierrot in 1802, one of the most important battles of the Haitian Revolution. This commemorative coin honors her extraordinary courage.',
    price: 25.00,
    image: 'https://images.unsplash.com/photo-1623498607422-9fec7ce62e1c?w=500&h=500&fit=crop',
    status: 'limited_stock',
    category: 'historical',
    featured: false,
    year: '1802',
    material: 'Zinc alloy with colorized enamel',
    weight: '28g',
    diameter: '39mm',
    mintage: 'Limited Edition'
  },
  {
    id: '5',
    name: 'Alexandre Pétion',
    description: 'Challenge coin honoring Alexandre Pétion, the first President of the Republic of Haiti from 1807 until his death in 1818. He is considered one of the founding fathers of Haiti. This commemorative coin celebrates his leadership and vision for an independent Haiti.',
    price: 25.00,
    image: 'https://images.unsplash.com/photo-1592806088932-05058af0ad8d?w=500&h=500&fit=crop',
    status: 'coming_soon',
    category: 'presidential',
    featured: false,
    year: '1818',
    material: 'Zinc alloy with colorized enamel',
    weight: '28g',
    diameter: '39mm',
    mintage: 'Limited Edition'
  },
  {
    id: '6',
    name: 'Henri Christophe',
    description: 'Challenge coin celebrating Henri Christophe, a key leader in the Haitian Revolution who became King of Haiti in the northern part of the country from 1811 to 1820. This commemorative coin honors his contributions to Haitian independence and nation-building.',
    price: 25.00,
    image: 'https://images.unsplash.com/photo-1605792657660-596af9009e82?w=500&h=500&fit=crop',
    status: 'in_stock',
    category: 'royal',
    featured: false,
    year: '1811',
    material: 'Zinc alloy with colorized enamel',
    weight: '28g',
    diameter: '39mm',
    mintage: 'Limited Edition'
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