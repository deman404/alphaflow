
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Separator } from "@/components/ui/separator";

const Terms = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <main className="container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Terms of Service</h1>
          
          <div className="text-muted-foreground mb-8">
            <p className="mb-2">Last updated: May 1, 2025</p>
          </div>
          
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
              <p className="text-muted-foreground mb-4">
                Welcome to Alphaflow, a platform owned and operated by Alphaflow, Inc. ("Alphaflow", "we", "our", or "us").
              </p>
              <p className="text-muted-foreground mb-4">
                These Terms of Service ("Terms") govern your access to and use of the Alphaflow website and platform, including any content, functionality, and services offered on or through our website (collectively, the "Service").
              </p>
              <p className="text-muted-foreground">
                By accessing or using the Service, you agree to be bound by these Terms. If you do not agree to these Terms, do not access or use the Service.
              </p>
            </div>
            
            <Separator />
            
            <div>
              <h2 className="text-2xl font-semibold mb-4">2. Definitions</h2>
              <ul className="list-disc list-inside space-y-3 text-muted-foreground">
                <li><span className="font-medium">"Account"</span> means a unique account created for you to access our Service.</li>
                <li><span className="font-medium">"Content"</span> means any information, data, text, software, graphics, messages, or other materials that are uploaded, posted, or otherwise transmitted through the Service.</li>
                <li><span className="font-medium">"User"</span> means any individual or entity that accesses or uses the Service.</li>
                <li><span className="font-medium">"Workflow"</span> means a series of automated steps or processes created using our Service.</li>
                <li><span className="font-medium">"AI Agent"</span> means an artificial intelligence component that performs specific tasks within a Workflow.</li>
              </ul>
            </div>
            
            <Separator />
            
            <div>
              <h2 className="text-2xl font-semibold mb-4">3. Account Registration</h2>
              <p className="text-muted-foreground mb-4">
                To use certain features of the Service, you must register for an Account. When you register, you agree to provide accurate, current, and complete information about yourself as prompted by our registration form.
              </p>
              <p className="text-muted-foreground mb-4">
                You are responsible for maintaining the confidentiality of your Account credentials and for all activities that occur under your Account. You agree to immediately notify us of any unauthorized use of your Account or any other breach of security.
              </p>
              <p className="text-muted-foreground">
                We reserve the right to suspend or terminate your Account, refuse service, or reject or remove Content at our discretion.
              </p>
            </div>
            
            <Separator />
            
            <div>
              <h2 className="text-2xl font-semibold mb-4">4. Subscription and Payment</h2>
              <p className="text-muted-foreground mb-4">
                Some aspects of the Service are provided on a subscription basis. By signing up for a subscription, you agree to pay all fees associated with the subscription plan you select.
              </p>
              <p className="text-muted-foreground mb-4">
                Subscription fees are billed in advance on a monthly or annual basis, depending on the subscription plan you select. Unless otherwise specified, subscriptions automatically renew at the end of each billing period.
              </p>
              <p className="text-muted-foreground mb-4">
                You may cancel your subscription at any time through your account settings or by contacting us. If you cancel, you will continue to have access to the Service until the end of your current billing period, but you will not receive a refund for any fees already paid.
              </p>
              <p className="text-muted-foreground">
                We reserve the right to change our subscription plans or adjust pricing for our Service at any time. Any changes to pricing will be communicated to you in advance.
              </p>
            </div>
            
            <Separator />
            
            <div>
              <h2 className="text-2xl font-semibold mb-4">5. Acceptable Use</h2>
              <p className="text-muted-foreground mb-4">
                You agree to use the Service only for lawful purposes and in accordance with these Terms. You agree not to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Use the Service in any way that violates any applicable law or regulation.</li>
                <li>Use the Service to transmit any material that is unlawful, harmful, threatening, abusive, harassing, defamatory, vulgar, obscene, invasive of another's privacy, or otherwise objectionable.</li>
                <li>Use the Service to impersonate any person or entity or falsely state or otherwise misrepresent your affiliation with a person or entity.</li>
                <li>Interfere with or disrupt the Service or servers or networks connected to the Service.</li>
                <li>Attempt to gain unauthorized access to any portion of the Service or any other accounts, computer systems, or networks connected to the Service.</li>
                <li>Use the Service to collect, harvest, or store personal data about others without their express consent.</li>
                <li>Use the Service for any purpose that is harmful to others or that is prohibited by these Terms.</li>
              </ul>
            </div>
            
            <Separator />
            
            <div>
              <h2 className="text-2xl font-semibold mb-4">6. Intellectual Property Rights</h2>
              <p className="text-muted-foreground mb-4">
                The Service and its original content, features, and functionality are and will remain the exclusive property of Alphaflow and its licensors. The Service is protected by copyright, trademark, and other intellectual property laws.
              </p>
              <p className="text-muted-foreground mb-4">
                You retain all rights to any Content you submit, post, or display on or through the Service. By submitting, posting, or displaying Content on or through the Service, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, adapt, publish, translate, create derivative works from, distribute, and display such Content in connection with the Service.
              </p>
              <p className="text-muted-foreground">
                You represent and warrant that you have all necessary rights to grant us this license and that your Content does not violate any third-party rights or applicable laws.
              </p>
            </div>
            
            <Separator />
            
            <div>
              <h2 className="text-2xl font-semibold mb-4">7. Data Processing and Privacy</h2>
              <p className="text-muted-foreground mb-4">
                Our collection and use of personal information in connection with the Service is described in our Privacy Policy, which is incorporated into these Terms by reference.
              </p>
              <p className="text-muted-foreground">
                You agree that we may use any data or information processed through our Service for improving our machine learning models and enhancing the Service, provided that any such use complies with our Privacy Policy.
              </p>
            </div>
            
            <Separator />
            
            <div>
              <h2 className="text-2xl font-semibold mb-4">8. Third-Party Services and Links</h2>
              <p className="text-muted-foreground mb-4">
                The Service may contain links to third-party websites or services that are not owned or controlled by Alphaflow.
              </p>
              <p className="text-muted-foreground mb-4">
                Alphaflow has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third-party websites or services. You further acknowledge and agree that Alphaflow shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with use of or reliance on any such content, goods, or services available on or through any such websites or services.
              </p>
              <p className="text-muted-foreground">
                We strongly advise you to read the terms and conditions and privacy policies of any third-party websites or services that you visit.
              </p>
            </div>
            
            <Separator />
            
            <div>
              <h2 className="text-2xl font-semibold mb-4">9. Limitation of Liability</h2>
              <p className="text-muted-foreground mb-4">
                To the maximum extent permitted by applicable law, in no event shall Alphaflow, its affiliates, directors, employees, or agents be liable for any indirect, punitive, incidental, special, consequential, or exemplary damages, including without limitation damages for loss of profits, goodwill, use, data, or other intangible losses, arising out of or relating to the use of, or inability to use, the Service.
              </p>
              <p className="text-muted-foreground">
                To the maximum extent permitted by applicable law, Alphaflow assumes no liability or responsibility for any:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Errors, mistakes, or inaccuracies of Content.</li>
                <li>Personal injury or property damage, of any nature whatsoever, resulting from your access to or use of the Service.</li>
                <li>Unauthorized access to or use of our servers and/or any personal information stored therein.</li>
                <li>Interruption or cessation of transmission to or from the Service.</li>
                <li>Bugs, viruses, trojan horses, or the like that may be transmitted to or through the Service by any third party.</li>
              </ul>
            </div>
            
            <Separator />
            
            <div>
              <h2 className="text-2xl font-semibold mb-4">10. Changes to Terms</h2>
              <p className="text-muted-foreground mb-4">
                We may revise these Terms from time to time. The most current version will always be posted on our website. By continuing to access or use the Service after those revisions become effective, you agree to be bound by the revised Terms.
              </p>
            </div>
            
            <Separator />
            
            <div>
              <h2 className="text-2xl font-semibold mb-4">11. Governing Law</h2>
              <p className="text-muted-foreground mb-4">
                These Terms shall be governed by and construed in accordance with the laws of the State of California, United States, without regard to its conflict of law provisions.
              </p>
              <p className="text-muted-foreground">
                Any dispute arising from or relating to these Terms or the Service shall be resolved exclusively in the state or federal courts located in San Francisco County, California.
              </p>
            </div>
            
            <Separator />
            
            <div>
              <h2 className="text-2xl font-semibold mb-4">12. Contact Us</h2>
              <p className="text-muted-foreground mb-4">
                If you have any questions about these Terms, please contact us at:
              </p>
              <div className="text-muted-foreground">
                <p>Alphaflow, Inc.</p>
                <p>123 Innovation Drive</p>
                <p>San Francisco, CA 94107</p>
                <p>Email: legal@alphaflow.ai</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Terms;
