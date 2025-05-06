
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Separator } from "@/components/ui/separator";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <main className="container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Privacy Policy</h1>
          
          <div className="text-muted-foreground mb-8">
            <p className="mb-2">Last updated: May 1, 2025</p>
          </div>
          
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
              <p className="text-muted-foreground mb-4">
                Alphaflow, Inc. ("Alphaflow", "we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our AI workflow automation platform.
              </p>
              <p className="text-muted-foreground">
                Please read this Privacy Policy carefully. If you do not agree with the terms of this Privacy Policy, please do not access the platform. We reserve the right to make changes to this Privacy Policy at any time and for any reason. Any changes or modifications will be effective immediately upon posting the updated Privacy Policy, and you waive the right to receive specific notice of each such change.
              </p>
            </div>
            
            <Separator />
            
            <div>
              <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
              
              <h3 className="text-lg font-semibold mb-2">Personal Information</h3>
              <p className="text-muted-foreground mb-4">
                We may collect personal information that you voluntarily provide to us when you register for an account, express interest in obtaining information about us or our products and services, participate in activities on the platform, or otherwise contact us. This information may include:
              </p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground mb-4">
                <li>Name and contact details (such as email address, phone number)</li>
                <li>Login credentials</li>
                <li>Billing information and payment details</li>
                <li>Professional information (such as job title, company)</li>
                <li>Preferences and communication settings</li>
                <li>Any other information you choose to provide</li>
              </ul>
              
              <h3 className="text-lg font-semibold mb-2">Usage Information</h3>
              <p className="text-muted-foreground mb-4">
                We automatically collect certain information when you visit, use, or navigate our platform. This information does not reveal your specific identity but may include:
              </p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground mb-4">
                <li>Device and connection information (such as IP address, browser type, operating system)</li>
                <li>Usage patterns and preferences</li>
                <li>Referring URLs and exit pages</li>
                <li>Date and time stamps of platform access</li>
                <li>Clickstream data and interaction with elements on the platform</li>
              </ul>
              
              <h3 className="text-lg font-semibold mb-2">User Content and Workflow Data</h3>
              <p className="text-muted-foreground mb-4">
                We collect information that you provide when using our platform, including:
              </p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li>AI workflows and automation processes you create</li>
                <li>Configuration settings and preferences</li>
                <li>Data processed through our platform as part of your workflows</li>
                <li>Integrations with third-party services and APIs</li>
              </ul>
            </div>
            
            <Separator />
            
            <div>
              <h2 className="text-2xl font-semibold mb-4">How We Use Your Information</h2>
              <p className="text-muted-foreground mb-4">
                We may use the information we collect for various purposes, including:
              </p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li>Providing, operating, and maintaining our platform</li>
                <li>Improving, personalizing, and expanding our platform</li>
                <li>Understanding and analyzing how you use our platform</li>
                <li>Developing new products, services, features, and functionality</li>
                <li>Communicating with you about updates, security alerts, and support</li>
                <li>Providing customer service and responding to requests</li>
                <li>Processing transactions and sending related information</li>
                <li>Preventing fraudulent transactions, monitoring against theft, and protecting against criminal activity</li>
                <li>For other purposes such as data analysis, identifying usage trends, and enhancing our platform</li>
              </ul>
            </div>
            
            <Separator />
            
            <div>
              <h2 className="text-2xl font-semibold mb-4">How We Share Your Information</h2>
              <p className="text-muted-foreground mb-4">
                We may share your information with third parties in the following situations:
              </p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li><span className="font-medium">Business Partners:</span> We may share your information with business partners to offer you certain products, services, or promotions.</li>
                <li><span className="font-medium">Service Providers:</span> We may share your information with third-party vendors, consultants, and other service providers who perform services on our behalf.</li>
                <li><span className="font-medium">Legal Obligations:</span> We may disclose your information where required by law or if we believe that disclosure is necessary to comply with a legal process, protect our rights, or protect the safety of others.</li>
                <li><span className="font-medium">Business Transfers:</span> We may share or transfer your information in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business.</li>
                <li><span className="font-medium">With Your Consent:</span> We may share your information with your consent or at your direction.</li>
              </ul>
            </div>
            
            <Separator />
            
            <div>
              <h2 className="text-2xl font-semibold mb-4">Data Security</h2>
              <p className="text-muted-foreground mb-4">
                We implement appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, no electronic transmission or storage of information can be guaranteed to be 100% secure. Despite our safeguards and efforts to secure your information, no electronic transmission over the Internet or information storage technology can be guaranteed to be completely secure, so we cannot promise or guarantee that hackers, cybercriminals, or other unauthorized third parties will not be able to defeat our security and improperly collect, access, steal, or modify your information.
              </p>
            </div>
            
            <Separator />
            
            <div>
              <h2 className="text-2xl font-semibold mb-4">Data Retention</h2>
              <p className="text-muted-foreground mb-4">
                We will retain your personal information only for as long as is necessary for the purposes set out in this Privacy Policy. We will retain and use your information to the extent necessary to comply with our legal obligations, resolve disputes, and enforce our policies.
              </p>
            </div>
            
            <Separator />
            
            <div>
              <h2 className="text-2xl font-semibold mb-4">Your Privacy Rights</h2>
              <p className="text-muted-foreground mb-4">
                Depending on your location, you may have certain rights regarding your personal information, including:
              </p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground mb-4">
                <li>The right to access personal information we hold about you</li>
                <li>The right to request that we correct any personal information we hold about you</li>
                <li>The right to request that we delete any personal information we hold about you</li>
                <li>The right to opt-out of marketing communications</li>
                <li>The right to data portability</li>
                <li>The right to object to processing</li>
              </ul>
              <p className="text-muted-foreground">
                To exercise any of these rights, please contact us at privacy@alphaflow.ai.
              </p>
            </div>
            
            <Separator />
            
            <div>
              <h2 className="text-2xl font-semibold mb-4">Children's Privacy</h2>
              <p className="text-muted-foreground mb-4">
                Our platform is not intended for use by children under the age of 13. We do not knowingly collect personally identifiable information from children under 13. If you are a parent or guardian and believe that your child has provided us with personal information, please contact us so that we can delete the information.
              </p>
            </div>
            
            <Separator />
            
            <div>
              <h2 className="text-2xl font-semibold mb-4">International Data Transfers</h2>
              <p className="text-muted-foreground mb-4">
                We are based in the United States and the information we collect is governed by U.S. law. If you are accessing the platform from outside the United States, please be aware that information collected through the platform may be transferred to, processed, stored, and used in the U.S. and other jurisdictions. Your use of the platform or provision of any information therefore constitutes your consent to the transfer, processing, usage, sharing, and storage of your information outside of your country of residence, where data protection laws may be different.
              </p>
            </div>
            
            <Separator />
            
            <div>
              <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
              <p className="text-muted-foreground mb-4">
                If you have questions about this Privacy Policy or our privacy practices, please contact us at:
              </p>
              <div className="text-muted-foreground">
                <p>Alphaflow, Inc.</p>
                <p>123 Innovation Drive</p>
                <p>San Francisco, CA 94107</p>
                <p>Email: privacy@alphaflow.ai</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Privacy;
