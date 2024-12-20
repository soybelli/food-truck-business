import React from 'react';
import { ArrowRight, DollarSign, Rocket, ChefHat } from 'lucide-react';
import { trackClick } from '../utils/analytics';

export function BusinessOpportunity() {
  const handleClick = () => {
    trackClick(
      'Start Your Journey Today',
      'business_opportunity_cta',
      'https://ulysses.reeftech.app/?utm_source=vesselsops&utm_medium=announcement'
    );
  };

  return (
    <section className="py-20 bg-gradient-to-br from-pink-400 via-pink-500 to-fuchsia-600">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-xl mb-6 shadow-xl">
            <ChefHat className="w-8 h-8 text-white" />
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 text-shadow">
            Want to Start a Food Truck Business?
          </h2>
          <p className="text-lg text-white/90 mb-8 font-medium">
            Not sure where to begin? We're here to guide you!
          </p>

          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-8 mb-8 shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center group">
                <div className="bg-white/10 p-4 rounded-xl mb-3 group-hover:scale-110 transition-transform duration-200">
                  <DollarSign className="w-8 h-8 text-white" />
                </div>
                <span className="text-white font-medium">Low Initial Investment</span>
              </div>
              <div className="flex flex-col items-center group">
                <div className="bg-white/10 p-4 rounded-xl mb-3 group-hover:scale-110 transition-transform duration-200">
                  <Rocket className="w-8 h-8 text-white" />
                </div>
                <span className="text-white font-medium">Quick Launch Guide</span>
              </div>
              <div className="flex flex-col items-center group">
                <div className="bg-white/10 p-4 rounded-xl mb-3 group-hover:scale-110 transition-transform duration-200">
                  <ChefHat className="w-8 h-8 text-white" />
                </div>
                <span className="text-white font-medium">Expert Support</span>
              </div>
            </div>
          </div>

          <a
            href="https://ulysses.reeftech.app/?utm_source=vesselsops&utm_medium=announcement"
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleClick}
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-pink-600 rounded-full text-lg font-semibold hover:bg-pink-50 transition-all duration-200 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
          >
            Start Your Journey Today
            <ArrowRight className="w-5 h-5" />
          </a>
          
          <p className="mt-6 text-base text-white/80 font-medium">
            Learn how to launch your food business with just $10,000
          </p>
        </div>
      </div>
    </section>
  );
}