'use client';

import HeroSection from '@/features/landing/hero-section/HeroSection';
import ProductSection from '@/features/landing/product-section/ProductSection';
import FeaturesSection from '@/features/landing/features-section/FeaturesSection';
import WorkflowSection from '@/features/landing/workflow-section/WorkflowSection';
import NewsletterSection from '@/features/landing/newsletter-section/NewsletterSection';
import SubscribeSection from '@/features/landing/subscribe-section/SubscribeSection';

export default function Page() {
    return (
        <div>
            {/* Hero Section */}
            <HeroSection />

            {/* Social Proof */}
            {/*<ProofSection />*/}

            {/* Products Section */}
            <ProductSection />

            {/* Features Section */}
            <FeaturesSection />

            {/* Workflow Section */}
            <WorkflowSection />

            {/* Pricing Section */}
            {/*<PricingSection />*/}

            {/* Testimonials Section */}
            {/*<TestimonialsSection />*/}

            {/* Newsletter CTA */}
            <NewsletterSection />

            {/* Final CTA */}
            <SubscribeSection />
        </div>
    );
}
