import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';
import { Card, CardContent } from '../components/ui/card';

const FAQs = () => {
  const faqs = [
    {
      question: 'What are commemorative coins?',
      answer: 'Commemorative coins are specially minted coins that honor a person, place, event, or historical period. Our coins celebrate Haiti\'s revolutionary heroes and significant historical moments.'
    },
    {
      question: 'Are these coins legal tender?',
      answer: 'No, these are commemorative collectible coins and are not intended as legal tender. They are designed for collectors and those who appreciate historical significance.'
    },
    {
      question: 'What materials are the coins made from?',
      answer: 'Our coins are crafted from various high-quality materials including bronze, brass with gold or silver plating, and feature colorized enamel details for enhanced visual appeal.'
    },
    {
      question: 'How limited are the mintage numbers?',
      answer: 'Each coin design has a specific mintage number tied to historical significance. For example, our 1804 Dessalines coin is limited to 1,804 pieces. Once sold out, they will not be reproduced.'
    },
    {
      question: 'Do you ship internationally?',
      answer: 'Yes, we ship worldwide. Shipping costs and delivery times vary by location. International orders may be subject to customs fees determined by the destination country.'
    },
    {
      question: 'How should I care for my commemorative coins?',
      answer: 'Store coins in a cool, dry place away from direct sunlight. Handle them by the edges to avoid fingerprints. We recommend using coin capsules or protective cases to preserve their condition.'
    },
    {
      question: 'Can I return a coin if I\'m not satisfied?',
      answer: 'Yes, we offer a 30-day return policy for unused coins in their original packaging. The coin must be in the same condition as received. Return shipping costs are the responsibility of the buyer unless the item is defective.'
    },
    {
      question: 'How long does shipping take?',
      answer: 'Domestic orders typically arrive within 5-7 business days. International shipping can take 10-21 business days depending on the destination and customs processing.'
    },
    {
      question: 'Are the coins authenticated?',
      answer: 'Yes, each coin comes with a certificate of authenticity that includes the coin\'s specifications, mintage number, and unique serial number.'
    },
    {
      question: 'Will these coins increase in value?',
      answer: 'While we cannot guarantee future value, limited mintage commemorative coins often appreciate over time, especially those celebrating significant historical events. Value depends on various factors including condition, rarity, and collector demand.'
    },
    {
      question: 'Can I pre-order upcoming coin releases?',
      answer: 'Yes! Coins marked as "Coming Soon" are available for pre-order. You will be charged when the coin is ready to ship. Pre-order customers receive priority fulfillment.'
    },
    {
      question: 'Do you offer bulk or wholesale pricing?',
      answer: 'Yes, we offer special pricing for bulk orders and institutional buyers. Please contact us directly at wholesale@1804coins.com for more information.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold text-gray-900 mb-4 text-center">Frequently Asked Questions</h1>
        <p className="text-gray-600 text-center mb-12 text-lg">Find answers to common questions about our commemorative coins</p>

        <Card>
          <CardContent className="p-6">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left font-semibold text-gray-900">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>

        <div className="mt-12 bg-gray-900 text-white rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-3">Still have questions?</h2>
          <p className="mb-6">Can't find the answer you're looking for? Our customer support team is here to help.</p>
          <a href="/contact">
            <button className="bg-white text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Contact Support
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default FAQs;