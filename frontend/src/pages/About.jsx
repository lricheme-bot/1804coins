import React from 'react';
import { Card, CardContent } from '../components/ui/card';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold text-gray-900 mb-8 text-center">About Us</h1>

        <div className="space-y-8">
          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
              <p className="text-gray-700 leading-relaxed text-lg">
                At 1804 Coins, we are dedicated to preserving and celebrating Haiti's rich revolutionary history 
                through beautifully crafted challenge coins. Each piece in our collection tells the story of 
                the brave men and women who fought for Haiti's independence and shaped the nation's destiny.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Why 1804?</h2>
              <p className="text-gray-700 leading-relaxed text-lg">
                The year 1804 marks Haiti's declaration of independence, making it the first independent nation 
                of Latin America and the Caribbean, and the first Black-led republic in the world. This historic 
                achievement represents the triumph of human spirit over oppression and continues to inspire 
                people around the globe.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Commitment to Quality</h2>
              <p className="text-gray-700 leading-relaxed text-lg">
                Every coin in our collection is meticulously designed and crafted using premium materials. 
                We work with skilled artisans to ensure each piece captures the essence of the historical 
                figures and events it represents. Our limited mintage ensures that each coin remains a 
                valuable collectible for generations to come.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Honoring Heroes</h2>
              <p className="text-gray-700 leading-relaxed text-lg">
                Our collection features challenge coins celebrating revolutionary leaders like Jean-Jacques 
                Dessalines, Henri Christophe, and Alexandre Pétion, as well as unsung heroes such as Catherine 
                Flon, Sanite Belair, and Marie-Jeanne Lamartinière. Through these coins, we ensure their 
                legacies live on in metal and memory.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default About;