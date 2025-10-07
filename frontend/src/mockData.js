// Mock data for 1804 Coins

export const products = [
  {
    id: '1',
    name: 'Emp. Jean Jacques Dessalines',
    subtitle: 'Commemorative Coin',
    price: 25.00,
    status: 'limited',
    image: 'https://images.squarespace-cdn.com/content/v1/67d6ef5142cdf803b50d47be/e08c4e83-f75c-4fff-b87e-d7bb73ae04ac/JJ+Dessalines+May+13%2C+2025%2C+07_44_25+PM.png',
    description: 'Jean-Jacques Dessalines (1758-1806) was a leader of the Haitian Revolution and the first ruler of an independent Haiti. Born into slavery, he rose to become one of the most important military leaders in the fight against French colonial rule. After Haiti gained independence in 1804, he declared himself Emperor Jacques I. He is remembered as a founding father of Haiti and a symbol of resistance against oppression.',
    category: 'revolutionary-leaders',
    inStock: true,
    featured: true
  },
  {
    id: '2',
    name: 'Catherine Flon',
    subtitle: 'Commemorative Coin',
    price: 25.00,
    status: 'coming-soon',
    image: 'https://images.squarespace-cdn.com/content/v1/67d6ef5142cdf803b50d47be/5d3d4d20-30c3-4e65-8dad-aef98816c295/Catherine+Flon+Sewing+Haiti%27s+Flag+%281%29.png',
    description: 'Catherine Flon is celebrated as the seamstress who sewed the first Haitian flag in 1803. At the Congress of Arcahaie, revolutionary leaders decided to create a new flag symbolizing unity. Flon took the French tricolor, removed the white band, and sewed together the blue and red—representing the union of Black and mixed-race Haitians in their fight for freedom.',
    category: 'revolutionary-heroes',
    inStock: false,
    featured: true
  },
  {
    id: '3',
    name: 'Sanité Bélair',
    subtitle: 'Commemorative Coin',
    price: 25.00,
    status: 'in-stock',
    image: 'https://images.squarespace-cdn.com/content/v1/67d6ef5142cdf803b50d47be/1a19b65d-3391-49ee-aaa0-0e9a9097b825/Lieutenant+Sanit%C3%A9+B%C3%A9lair+Commemorative+Coin.png',
    description: 'Freedom fighter. Revolutionary. Martyr. Sanité Bélair was a fearless lieutenant in Haiti\'s War of Independence and one of the few women to lead troops into battle. Fighting alongside her husband, Charles Bélair, she defied colonial rule with unmatched courage. Captured by the French, she refused a blindfold and faced execution with dignity and defiance — becoming an enduring symbol of Haitian resistance and womanhood. She died for liberty. She lives in legacy.',
    category: 'revolutionary-heroes',
    inStock: true,
    featured: true
  },
  {
    id: '4',
    name: 'Alexandre Pétion',
    subtitle: 'Commemorative Coin',
    price: 25.00,
    status: 'coming-soon',
    image: 'https://images.squarespace-cdn.com/content/v1/67d6ef5142cdf803b50d47be/633d9a69-71a4-406a-b7e9-6371e54ac34f/ChatGPT+Image+May+14%2C+2025%2C+11_00_34+AM.png',
    description: 'Alexandre Pétion (1770-1818) was a significant figure in the Haitian Revolution and the first President of the Republic of Haiti. Born in Port-au-Prince to a wealthy French father and a free mulatto mother, Pétion was educated in France and became a skilled artilleryman. He returned to Saint-Domingue and joined the Haitian Revolution, initially siding with the gens de couleur (free people of color). He played a key role in the later stages of the revolution, eventually aligning with Jean-Jacques Dessalines against the French.',
    category: 'revolutionary-leaders',
    inStock: false,
    featured: true
  },
  {
    id: '5',
    name: 'La Citadelle Laferrière',
    subtitle: 'Commemorative Medal',
    price: 25.00,
    status: 'pre-order',
    image: 'https://images.squarespace-cdn.com/content/v1/67d6ef5142cdf803b50d47be/d9e26467-3bcd-444f-8ab2-b5ff2328fe98/Commemorative+Coin+of+Citadelle+Laferri%C3%A8re.png',
    description: 'The Citadelle Laferriere stands as a powerful symbol of Haitian freedom, resilience, and Black sovereignty — the largest fortress in the Americas and a UNESCO World Heritage Site. Built by Henri Christophe between 1805 and 1820, this massive mountaintop fortress was designed to defend the newly independent Haiti from potential French invasions.',
    category: 'landmarks',
    inStock: false,
    featured: false
  },
  {
    id: '6',
    name: 'Roi Henri Christophe 1re',
    subtitle: 'Commemorative Coin',
    price: 25.00,
    status: 'pre-order',
    image: 'https://images.squarespace-cdn.com/content/v1/67d6ef5142cdf803b50d47be/ddd0dd58-e259-44d3-82e0-01ffb435606d/King+Henri+Christophe+Bronze+Medallion.png',
    description: 'King Henri Christophe was a key leader in the Haitian Revolution and later became the only monarch of the Kingdom of Haiti. Born in 1767, possibly in Grenada, he rose through the ranks during Haiti\'s fight for independence from France. After the assassination of Jean-Jacques Dessalines, Christophe established a separate government in northern Haiti and declared himself King Henry I in 1811.',
    category: 'revolutionary-leaders',
    inStock: false,
    featured: false
  }
];

export const timelineEvents = [
  {
    year: '1791',
    title: 'Revolution Begins',
    description: 'The Haitian Revolution begins with a massive slave uprising in the northern part of Saint-Domingue.'
  },
  {
    year: '1803',
    title: 'Flag Creation',
    description: 'Catherine Flon sews the first Haitian flag at the Congress of Arcahaie, symbolizing unity.'
  },
  {
    year: '1804',
    title: 'Independence Declared',
    description: 'Haiti becomes the first Black republic and the first independent nation in Latin America.'
  },
  {
    year: '1805',
    title: 'Citadelle Construction',
    description: 'Construction begins on the Citadelle Laferrière, the largest fortress in the Americas.'
  },
  {
    year: '1811',
    title: 'Kingdom Established',
    description: 'Henri Christophe declares himself King Henry I of the Kingdom of Haiti in the North.'
  }
];

export const categories = [
  { id: 'all', name: 'All Products', icon: 'Grid' },
  { id: 'revolutionary-leaders', name: 'Revolutionary Leaders', icon: 'Crown' },
  { id: 'revolutionary-heroes', name: 'Revolutionary Heroes', icon: 'Shield' },
  { id: 'landmarks', name: 'Historic Landmarks', icon: 'Castle' }
];
